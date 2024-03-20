package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.City;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.repository.CityRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CityService {
    @Autowired
    private CityRepository cityRepository;

    public Iterable<City> getAll() {
        return cityRepository.findAll();
    }

    public City findById(Long id) {
        Optional<City> city = cityRepository.findById(id);
        if (city.isPresent()) {
            return city.get();
        } else {
            throw new ResourceNotFoundException("City with provided id not found!");
        }
    }

    public City findByName(String name) {
        City city = cityRepository.findByName(name);
        return city;
    }
    public City create(City city){
        return cityRepository.save(city);
    }

    public City save(City city) {
        return cityRepository.save(city);
    }

    public void remove(Long id) throws JsonProcessingException {
        if (!cityRepository.existsById(id)) {
            throw new ResourceNotFoundException("City with id= " + id+ " does not exist");
        }
        cityRepository.deleteById(id);

    }
}
