package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.City;
import com.atlantbh.cinebh.model.Venue;
import com.atlantbh.cinebh.repository.CityRepository;
import com.atlantbh.cinebh.repository.VenueRepository;
import com.atlantbh.cinebh.request.PaginationParams;
import com.atlantbh.cinebh.request.VenueFilterParams;
import com.atlantbh.cinebh.specification.VenueSpecification;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.atlantbh.cinebh.specification.VenueSpecification.nameLike;

@Service
@AllArgsConstructor
public class VenueService {
    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private CityRepository cityRepository;

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
        return venueRepository.findAll(PageRequest.of(pageNumber-1, size));
    }

    public Page<Venue> getVenuesByFilter(VenueFilterParams filterParams, PaginationParams paginationParams) {
        Optional<City> city = cityRepository.findById(filterParams.getCity());
        Specification<Venue> filters = Specification.where(StringUtils.isBlank(filterParams.getContains()) ? null : nameLike(filterParams.getContains()))
                .and(city.map(VenueSpecification::hasProjectionInCity).orElse(null));
        return venueRepository.findAll(filters, PageRequest.of(paginationParams.getPage() - 1, paginationParams.getSize()));
    }
}
