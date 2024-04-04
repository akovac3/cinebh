package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Actor;
import com.atlantbh.cinebh.repository.ActorRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ActorService {
    @Autowired
    private ActorRepository actorRepository;

    public Iterable<Actor> getAll() {
        return actorRepository.findAll();
    }

    public Actor findById(Long id) {
        return actorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Actor with provided id not found!"));
    }

    public Actor save(Actor movie) {
        return actorRepository.save(movie);
    }

    public void remove(Long id) throws JsonProcessingException {
        if (!actorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Actor with id= " + id + " does not exist");
        }
        actorRepository.deleteById(id);
    }

    public Actor findByName(String firstName, String lastName) {
        return actorRepository.findByFirstNameAndLastName(firstName, lastName);
    }
}
