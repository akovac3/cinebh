package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.repository.MovieRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public Iterable<Movie> getAll() {
        return movieRepository.findAll();
    }

    public Movie findById(Long id) {
        Optional<Movie> movie = movieRepository.findById(id);
        if (movie.isPresent()) {
            return movie.get();
        } else {
            throw new ResourceNotFoundException("Movie with provided id not found!");
        }
    }
    public Movie createMovie(Movie movie){
        return movieRepository.save(movie);
    }

    public Movie save(Movie movie) {
        return movieRepository.save(movie);
    }

    public void remove(Long id) throws JsonProcessingException {
        if (!movieRepository.existsById(id)) {
            throw new ResourceNotFoundException("Movie with id= " + id+ " does not exist");
        }
        movieRepository.deleteById(id);

    }

    public Page<Movie> getCurrentlyShowing(int pageNumber) {
        return movieRepository.findCurrentlyShowing(Date.valueOf(LocalDate.now()), PageRequest.of(pageNumber, 4));
    }

    public Iterable<Movie> getUpcoming() {
        return movieRepository.findUpcoming(Date.valueOf(LocalDate.now()));
    }


}
