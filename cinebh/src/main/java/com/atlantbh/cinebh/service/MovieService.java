package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.repository.MovieRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
