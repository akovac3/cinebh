package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.repository.MovieRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

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

    public Set<Movie> getMovies(String nameLikeFilter, List<String> times, List<Long> genres, List<Long> cinemas, List<Long> cities) {
        Specification<Movie> filters = Specification.where(StringUtils.isBlank(nameLikeFilter) ? null : nameLike(nameLikeFilter))
                .and(CollectionUtils.isEmpty(times) ? null : inProjectionTimes(times))
                .and(CollectionUtils.isEmpty(genres) ? null : hasGenreIn(genres))
                .and(CollectionUtils.isEmpty(cinemas) ? null : hasProjectionInCinemas(cinemas))
                .and(CollectionUtils.isEmpty(cities) ? null : hasProjectionInCities(cities));

        return new HashSet<>(movieRepository.findAll(filters));
    }
}
