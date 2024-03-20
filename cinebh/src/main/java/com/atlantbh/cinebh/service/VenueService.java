package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Venue;
import com.atlantbh.cinebh.repository.VenueRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class VenueService {
    @Autowired
    private VenueRepository venueRepository;

    public Iterable<Venue> getAll() {
        return venueRepository.findAll();
    }

    public Venue findById(Long id) {
        Optional<Venue> venue = venueRepository.findById(id);
        if (venue.isPresent()) {
            return venue.get();
        } else {
            throw new ResourceNotFoundException("Venue with provided id not found!");
        }
    }
    public Venue createVenue(Venue venue){
        return venueRepository.save(venue);
    }

    public Venue save(Venue venue) {
        return venueRepository.save(venue);
    }

    public void remove(Long id) throws JsonProcessingException {
        if (!venueRepository.existsById(id)) {
            throw new ResourceNotFoundException("Venue with id= " + id+ " does not exist");
        }
        venueRepository.deleteById(id);

    }
}
