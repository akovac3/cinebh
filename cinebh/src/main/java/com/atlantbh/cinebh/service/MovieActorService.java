package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.MovieActor;
import com.atlantbh.cinebh.repository.MovieActorRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MovieActorService {

    @Autowired
    private MovieActorRepository movieActorRepository;

    public Iterable<MovieActor> getAll() {
        return movieActorRepository.findAll();
    }

    public MovieActor findById(Long id) {
        Optional<MovieActor> movieActor = movieActorRepository.findById(id);
        if (movieActor.isPresent()) {
            return movieActor.get();
        } else {
            throw new ResourceNotFoundException("MovieActor with provided id not found!");
        }
    }

    public MovieActor save(MovieActor movieActor) {
        return movieActorRepository.save(movieActor);
    }

    public void remove(Long id) throws JsonProcessingException {
        if (!movieActorRepository.existsById(id)) {
            throw new ResourceNotFoundException("MovieActor with id= " + id + " does not exist");
        }
        movieActorRepository.deleteById(id);
    }
}
