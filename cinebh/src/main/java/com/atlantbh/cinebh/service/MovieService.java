package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Genre;
import com.atlantbh.cinebh.model.City;
import com.atlantbh.cinebh.model.Venue;
import com.atlantbh.cinebh.model.Status;
import com.atlantbh.cinebh.model.Photo;
import com.atlantbh.cinebh.repository.CityRepository;
import com.atlantbh.cinebh.repository.GenreRepository;
import com.atlantbh.cinebh.repository.MovieRepository;
import com.atlantbh.cinebh.repository.VenueRepository;
import com.atlantbh.cinebh.request.CurrentlyMoviesFilterParams;
import com.atlantbh.cinebh.request.PaginationParams;
import com.atlantbh.cinebh.request.StatusParams;
import com.atlantbh.cinebh.request.UpcomingMoviesFilterParams;
import com.atlantbh.cinebh.response.NumberOfElementsResponse;
import com.atlantbh.cinebh.specification.MovieSpecification;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.atlantbh.cinebh.specification.MovieSpecification.nameLike;
import static com.atlantbh.cinebh.specification.MovieSpecification.hasProjectionTime;
import static com.atlantbh.cinebh.specification.MovieSpecification.projectionStartLessThenDate;
import static com.atlantbh.cinebh.specification.MovieSpecification.projectionEndGreaterThenDate;
import static com.atlantbh.cinebh.specification.MovieSpecification.projectionBetweenDates;
import static com.atlantbh.cinebh.specification.MovieSpecification.hasSimilarGenres;
import static com.atlantbh.cinebh.specification.MovieSpecification.hasStatus;

@Service
@AllArgsConstructor
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private PhotoService photoService;

    @Autowired
    private AmazonService amazonService;

    public Iterable<Movie> getAll() {
        return movieRepository.findAll();
    }

    public Movie findById(Long id) {
        return movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Movie with provided id not found!"));
    }

    public Movie save(Movie movie) {
        return movieRepository.save(movie);
    }

    public void remove(Long id) throws JsonProcessingException {
        if (!movieRepository.existsById(id)) {
            throw new ResourceNotFoundException("Movie with id= " + id + " does not exist");
        }
        movieRepository.deleteById(id);
    }

    public Page<Movie> getCurrentlyShowing(Integer pageNumber, Integer size) {
        return movieRepository.findCurrentlyShowing(PageRequest.of(pageNumber-1, size));
    }

    public Page<Movie> getUpcoming(Integer pageNumber, Integer size) {
        return movieRepository.findUpcoming(PageRequest.of(pageNumber-1, size));
    }

    public Page<Movie> findAllSimilarMoviesByGenre(Movie movie, PaginationParams paginationParams){
        Set<Genre> genreList = movie.getGenres();
        Specification<Movie> filters = Specification.where(hasSimilarGenres(movie.getMovieId(), genreList))
                .and(projectionEndGreaterThenDate(null))
                .and(hasStatus(Status.PUBLISHED));
        return movieRepository.findAll(filters, PageRequest.of(paginationParams.getPage()-1, paginationParams.getSize()));
    }

    public Page<Movie> getCurrentlyShowingForFilter(CurrentlyMoviesFilterParams currentlyMoviesFilterParams, PaginationParams paginationParams) {
        Optional<City> city = cityRepository.findById(currentlyMoviesFilterParams.getCity());
        Optional<Venue> venue = venueRepository.findById(currentlyMoviesFilterParams.getVenue());
        Optional<Genre> genre = genreRepository.findById(currentlyMoviesFilterParams.getGenre());
        Specification<Movie> filters = Specification.where(StringUtils.isBlank(currentlyMoviesFilterParams.getContains()) ? null : nameLike(currentlyMoviesFilterParams.getContains()))
                .and(StringUtils.isBlank(currentlyMoviesFilterParams.getTime()) ? null : hasProjectionTime(currentlyMoviesFilterParams.getTime()))
                .and(genre.map(MovieSpecification::hasGenre).orElse(null))
                .and(city.map(MovieSpecification::hasProjectionInCity).orElse(null))
                .and(venue.map(MovieSpecification::hasProjectionInVenue).orElse(null))
                .and(projectionStartLessThenDate(currentlyMoviesFilterParams.getStartDate()))
                .and(projectionEndGreaterThenDate(currentlyMoviesFilterParams.getStartDate()))
                .and(hasStatus(Status.PUBLISHED));
        return movieRepository.findAll(filters, PageRequest.of(paginationParams.getPage() - 1, paginationParams.getSize()));
    }

    public Page<Movie> getUpcomingForFilter(UpcomingMoviesFilterParams upcomingMoviesFilterParams, PaginationParams paginationParams) {
        Optional<City> city = cityRepository.findById(upcomingMoviesFilterParams.getCity());
        Optional<Venue> venue = venueRepository.findById(upcomingMoviesFilterParams.getVenue());
        Optional<Genre> genre = genreRepository.findById(upcomingMoviesFilterParams.getGenre());
        Specification<Movie> filters = Specification.where(StringUtils.isBlank(upcomingMoviesFilterParams.getContains()) ? null : nameLike(upcomingMoviesFilterParams.getContains()))
                .and(genre.map(MovieSpecification::hasGenre).orElse(null))
                .and(city.map(MovieSpecification::hasProjectionInCity).orElse(null))
                .and(venue.map(MovieSpecification::hasProjectionInVenue).orElse(null))
                .and(projectionBetweenDates(upcomingMoviesFilterParams.getStartDate(), upcomingMoviesFilterParams.getEndDate()))
                .and(hasStatus(Status.PUBLISHED));
        return movieRepository.findAll(filters, PageRequest.of(paginationParams.getPage() - 1, paginationParams.getSize()));
    }

    public Page<Movie> getByStatus(StatusParams statusParams, Integer pageNumber, Integer size) {
        Status status = Status.valueOf(statusParams.getStatus());
        return movieRepository.findByStatus(status, PageRequest.of(pageNumber-1, size));
    }

    public NumberOfElementsResponse getNumberOfElements() {
        int drafts = (int) movieRepository.countDrafts();
        int currently = (int) movieRepository.countCurrentlyShowing();
        int upcoming = (int) movieRepository.countUpcoming();
        int archived = (int) movieRepository.countArchived();
        return new NumberOfElementsResponse(drafts, currently, upcoming, archived);
    }

    public Page<Movie> getAllUpcoming(Integer page, Integer size) {
        return movieRepository.findAllUpcoming(PageRequest.of(page-1, size));
    }

    @Transactional
    public void batchUpdateStatus(Set<Long> movieIds, String newStatus) {
        for (Long id : movieIds) {
            Movie movie = movieRepository.findById(id).orElseThrow(() -> new RuntimeException("Movie not found for ID " + id));
            movie.setStatus(Status.valueOf(newStatus));
            movieRepository.save(movie);
        }
    }

    public void deletePhotos(long movieId, List<Long> photoIds) {
        Movie movie = findById(movieId);
        Set<Photo> photos = movie.getPhotos();

        for (Long photoId : photoIds) {
            Photo photo = photoService.findById(photoId);
            if (photo != null && photos.contains(photo)) {
                amazonService.deleteFileFromS3Bucket(photo.getLink());
                photos.remove(photo);
                photoService.deletePhoto(photo);
            }
        }

        movie.setPhotos(photos);
        save(movie);
    }
}
