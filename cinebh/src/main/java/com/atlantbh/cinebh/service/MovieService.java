package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.City;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Venue;
import com.atlantbh.cinebh.repository.CityRepository;
import com.atlantbh.cinebh.repository.MovieRepository;
import com.atlantbh.cinebh.repository.VenueRepository;
import com.atlantbh.cinebh.request.CurrentlyMoviesFilterParams;
import com.atlantbh.cinebh.request.PaginationParams;
import com.atlantbh.cinebh.specification.MovieSpecification;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.Optional;

import static com.atlantbh.cinebh.specification.MovieSpecification.*;

@Service
@AllArgsConstructor
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private VenueRepository venueRepository;

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
        return movieRepository.findCurrentlyShowing(PageRequest.of(pageNumber, size));
    }

    public Page<Movie> getUpcoming(Integer pageNumber, Integer size) {
        return movieRepository.findUpcoming(PageRequest.of(pageNumber, size));
    }

    public Page<Movie> getCurrentlyShowingMovies(CurrentlyMoviesFilterParams currentlyMoviesFilterParams, PaginationParams paginationParams) {
        Optional<City> city = cityRepository.findById(currentlyMoviesFilterParams.getCity());
        Optional<Venue> venue = venueRepository.findById(currentlyMoviesFilterParams.getVenue());
        if(currentlyMoviesFilterParams.getCity()!=null) city = cityRepository.findById(currentlyMoviesFilterParams.getCity());
        Specification<Movie> filters = Specification.where(StringUtils.isBlank(currentlyMoviesFilterParams.getNameLike()) ? null : nameLike(currentlyMoviesFilterParams.getNameLike()))
                .and(CollectionUtils.isEmpty(currentlyMoviesFilterParams.getTimes()) ? null : inProjectionTimes(currentlyMoviesFilterParams.getTimes()))
                .and(CollectionUtils.isEmpty(currentlyMoviesFilterParams.getGenres()) ? null : hasGenreIn(currentlyMoviesFilterParams.getGenres()))
                .and(venue.map(MovieSpecification::hasProjectionInCinemas).orElse(null))
                .and(city.map(MovieSpecification::hasProjectionInCities).orElse(null))
                .and(projectionStartLessThenDate((currentlyMoviesFilterParams.getStartDate()))).and(projectionEndGreaterThenDate(currentlyMoviesFilterParams.getStartDate()));
        return movieRepository.findAll(filters, PageRequest.of(paginationParams.getPage(), paginationParams.getSize()));
    }
}
