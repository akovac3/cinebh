package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Actor;
import com.atlantbh.cinebh.repository.ActorRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class ActorService {

    private ActorRepository actorRepository;

    public Iterable<Actor> getAll() {
        return actorRepository.findAll();
    }

    public Actor findById(Long id) {
        Optional<Actor> actor = actorRepository.findById(id);
        if (actor.isPresent()) {
            return actor.get();
        } else {
            throw new ResourceNotFoundException("Actor with provided id not found!");
        }
    }

    public Actor create(Actor actor) {
        return actorRepository.save(actor);
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
