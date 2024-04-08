package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.repository.MovieRepository;
import com.atlantbh.cinebh.request.CurrentlyMoviesFilterParams;
import com.atlantbh.cinebh.request.UpcomingMoviesFilterParams;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.atlantbh.cinebh.specification.MovieSpecification.*;
@Service
@AllArgsConstructor
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

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

    public Set<Movie> getMovies(CurrentlyMoviesFilterParams currentlyMoviesFilterParams) {
        Specification<Movie> filters = Specification.where(StringUtils.isBlank(currentlyMoviesFilterParams.getNameLike()) ? null : nameLike(currentlyMoviesFilterParams.getNameLike()))
                .and(CollectionUtils.isEmpty(currentlyMoviesFilterParams.getTimes()) ? null : inProjectionTimes(currentlyMoviesFilterParams.getTimes()))
                .and(CollectionUtils.isEmpty(currentlyMoviesFilterParams.getGenres()) ? null : hasGenreIn(currentlyMoviesFilterParams.getGenres()))
                .and(CollectionUtils.isEmpty(currentlyMoviesFilterParams.getCinemas()) ? null : hasProjectionInCinemas(currentlyMoviesFilterParams.getCinemas()))
                .and(CollectionUtils.isEmpty(currentlyMoviesFilterParams.getCities()) ? null : hasProjectionInCities(currentlyMoviesFilterParams.getCities()))
                .and(projectionStartLessThenDate((currentlyMoviesFilterParams.getStartDate()))).and(projectionEndGreaterThenDate(currentlyMoviesFilterParams.getStartDate()));

        return new HashSet<>(movieRepository.findAll(filters));
    }

    public Set<Movie> getCurrentlyShowingMovies(CurrentlyMoviesFilterParams currentlyMoviesFilterParams) {
        Specification<Movie> filters = Specification.where(StringUtils.isBlank(currentlyMoviesFilterParams.getNameLike()) ? null : nameLike(currentlyMoviesFilterParams.getNameLike()))
                .and(CollectionUtils.isEmpty(currentlyMoviesFilterParams.getTimes()) ? null : inProjectionTimes(currentlyMoviesFilterParams.getTimes()))
                .and(CollectionUtils.isEmpty(currentlyMoviesFilterParams.getGenres()) ? null : hasGenreIn(currentlyMoviesFilterParams.getGenres()))
                .and(CollectionUtils.isEmpty(currentlyMoviesFilterParams.getCinemas()) ? null : hasProjectionInCinemas(currentlyMoviesFilterParams.getCinemas()))
                .and(CollectionUtils.isEmpty(currentlyMoviesFilterParams.getCities()) ? null : hasProjectionInCities(currentlyMoviesFilterParams.getCities()))
                .and(projectionStartLessThenDate((currentlyMoviesFilterParams.getStartDate()))).and(projectionEndGreaterThenDate(currentlyMoviesFilterParams.getStartDate()));

        return new HashSet<>(movieRepository.findAll(filters));
    }

    public Set<Movie> getUpcoming(UpcomingMoviesFilterParams upcomingMoviesFilterParams) {
        Specification<Movie> filters = Specification.where(StringUtils.isBlank(upcomingMoviesFilterParams.getNameLike()) ? null : nameLike(upcomingMoviesFilterParams.getNameLike()))
                .and(CollectionUtils.isEmpty(upcomingMoviesFilterParams.getGenres()) ? null : hasGenreIn(upcomingMoviesFilterParams.getGenres()))
                .and(CollectionUtils.isEmpty(upcomingMoviesFilterParams.getCinemas()) ? null : hasProjectionInCinemas(upcomingMoviesFilterParams.getCinemas()))
                .and(CollectionUtils.isEmpty(upcomingMoviesFilterParams.getCities()) ? null : hasProjectionInCities(upcomingMoviesFilterParams.getCities()))
                .and(projectionStartGreaterThenDate(upcomingMoviesFilterParams.getStartDate()))
                .and(projectionStartLessThenDate(upcomingMoviesFilterParams.getEndDate()));

        return new HashSet<>(movieRepository.findAll(filters));
    }
}
