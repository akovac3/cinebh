package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.City;
import com.atlantbh.cinebh.model.Venue;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.Console;

@RestController
@AllArgsConstructor
@RequestMapping("/api/venues")
public class VenueController {

    @Autowired
    private VenueService venueService;

    @Autowired
    private CityService cityService;

    ObjectMapper objectMapper = new ObjectMapper();


    @GetMapping("/")
    public ResponseEntity<Iterable<Venue>> getAll() {
        return ResponseEntity.ok(venueService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(@PathVariable("id") Long id) {
        Venue venue = venueService.findById(id);
        return ResponseEntity.ok().body(venue);
    }

    @PostMapping("/")
    public ResponseEntity<String> createVenue(@Validated @RequestBody VenueRequest venueRequest) {
        City city = cityService.findByName(venueRequest.getCityName());

        System.out.println(city.getName());
        Venue venue = new Venue(venueRequest.getName(), venueRequest.getAddress(), venueRequest.getTelephone(), city);
        venueService.createVenue(venue);

        return new ResponseEntity<>("Venue successfully added!", HttpStatus.CREATED);

    }

    @PostMapping("/{id}")
    public ResponseEntity<String> updateVenue(@PathVariable Long id,@Validated @RequestBody VenueRequest venueRequest) {
        Venue updateVenue = venueService.findById(id);
        updateVenue.setName(venueRequest.getName());
        updateVenue.setAddress(venueRequest.getAddress());
        updateVenue.setTelephone(venueRequest.getTelephone());

        City newCity = cityService.findByName(venueRequest.getCityName());

        updateVenue.setCity(newCity);

        venueService.save(updateVenue);
        return  new ResponseEntity<>("Venue with id = " + id +" successfully updated!", HttpStatus.OK);

    }

    private Venue applyPatchToVenue(
            JsonPatch patch, Venue targetVenue) throws JsonPatchException, JsonProcessingException {
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
