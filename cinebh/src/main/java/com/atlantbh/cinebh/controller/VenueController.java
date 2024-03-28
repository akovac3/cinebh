package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.City;
import com.atlantbh.cinebh.model.Venue;
import com.atlantbh.cinebh.request.PaginationParams;
import com.atlantbh.cinebh.request.VenueRequest;
import com.atlantbh.cinebh.service.CityService;
import com.atlantbh.cinebh.service.VenueService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;

@RestController
@AllArgsConstructor
@RequestMapping("/api/venues")
@CrossOrigin(origins = "http://localhost:5173/")
public class VenueController {

    @Autowired
    private VenueService venueService;

    @Autowired
    private CityService cityService;

    ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/all")
    public ResponseEntity<Iterable<Venue>> getAll() {
        return ResponseEntity.ok(venueService.getAll());
    }

    @GetMapping("/")
    public ResponseEntity<Page<Venue>> getVenues(PaginationParams paginationParams) {
        return ResponseEntity.ok(venueService.getVenues(paginationParams.getPage(), paginationParams.getSize()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(@PathVariable("id") Long id) {
        Venue venue = venueService.findById(id);
        return ResponseEntity.ok().body(venue);
    }

    @PostMapping("/")
    public ResponseEntity<String> createVenue(@Validated @RequestBody VenueRequest venueRequest) {
        City city = cityService.findByName(venueRequest.getCityName());
        Venue venue = new Venue(venueRequest.getName(), venueRequest.getPhoto(), venueRequest.getAddress(), venueRequest.getTelephone(), city);
        venueService.createVenue(venue);
        return new ResponseEntity<>("Venue successfully added!", HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> updateVenue(@PathVariable Long id, @Validated @RequestBody VenueRequest venueRequest) {
        Venue updateVenue = venueService.findById(id);
        updateVenue.setName(venueRequest.getName());
        updateVenue.setAddress(venueRequest.getAddress());
        updateVenue.setTelephone(venueRequest.getTelephone());
        City newCity = cityService.findByName(venueRequest.getCityName());
        updateVenue.setCity(newCity);
        venueService.save(updateVenue);
        return new ResponseEntity<>("Venue with id = " + id + " successfully updated!", HttpStatus.OK);
    }

    private Venue applyPatchToVenue(JsonPatch patch, Venue targetVenue) throws JsonPatchException, JsonProcessingException {
        JsonNode patched = patch.apply(objectMapper.convertValue(targetVenue, JsonNode.class));
        return objectMapper.treeToValue(patched, Venue.class);
    }

    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity updateVenue(@PathVariable Long id, @RequestBody JsonPatch patch) {
        try {
            Venue venue = venueService.findById(id);
            Venue venuePatched = applyPatchToVenue(patch, venue);
            venueService.save(venuePatched);
            return new ResponseEntity<>("Venue with id = " + id + " successfully updated!", HttpStatus.OK);
        } catch (JsonPatchException | JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVenue(@PathVariable long id) throws JsonProcessingException {
        venueService.remove(id);
        return new ResponseEntity<>("Venue successfully deleted!", HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<String> deletePostMovie(@PathVariable long id) throws JsonProcessingException {
        venueService.remove(id);
        return new ResponseEntity<>("Venue successfully deleted!", HttpStatus.OK);
    }
}