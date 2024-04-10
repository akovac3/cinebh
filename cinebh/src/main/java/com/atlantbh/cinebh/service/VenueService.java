package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.City;
import com.atlantbh.cinebh.model.Venue;
import com.atlantbh.cinebh.repository.VenueRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class VenueService {
    @Autowired
    private VenueRepository venueRepository;

    public Iterable<Venue> getAll() {
        return venueRepository.findAll();
    }

    public Iterable<Venue> getVenuesByCity(City city) {
        return venueRepository.findAllByCity(city);
    }

    public Venue findById(Long id) {
        return venueRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Venue with provided id not found!"));
    }

    public Venue save(Venue venue) {
        return venueRepository.save(venue);
    }

    public void remove(Long id) throws JsonProcessingException {
        if (!venueRepository.existsById(id)) {
            throw new ResourceNotFoundException("Venue with id= " + id + " does not exist");
        }
        venueRepository.deleteById(id);
    }

    public Page<Venue> getVenues(int pageNumber, int size) {
        return venueRepository.findAll(PageRequest.of(pageNumber, size));
    }
}
