package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.City;
import com.atlantbh.cinebh.model.Venue;
import com.atlantbh.cinebh.request.PaginationParams;
import com.atlantbh.cinebh.request.VenueFilterParams;
import com.atlantbh.cinebh.request.VenueRequest;
import com.atlantbh.cinebh.service.AmazonService;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@RequestMapping("/api/venues")
public class VenueController {

    @Autowired
    private VenueService venueService;

    @Autowired
    private CityService cityService;

    ObjectMapper objectMapper;

    private AmazonService amazonClient;

    @GetMapping("/all")
    public ResponseEntity<Iterable<Venue>> getAll() {
        return ResponseEntity.ok(venueService.getAll());
    }

    @GetMapping
    public ResponseEntity<Page<Venue>> getVenues(PaginationParams paginationParams) {
        return ResponseEntity.ok(venueService.getVenues(paginationParams.getPage(), paginationParams.getSize()));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Venue>> getVenuesForFilter(VenueFilterParams filterParams, PaginationParams paginationParams) {
        return ResponseEntity.ok(venueService.getVenuesByFilter(filterParams, paginationParams));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(@PathVariable("id") Long id) {
        Venue venue = venueService.findById(id);
        return ResponseEntity.ok().body(venue);
    }

    @GetMapping("/city/{id}")
    public ResponseEntity<Iterable<Venue>> getVenuesByCity(@PathVariable("id") Long id) {
        City city = cityService.findById(id);
        return ResponseEntity.ok(venueService.getVenuesByCity(city));
    }

    @PostMapping
    public ResponseEntity<String> createVenue(@RequestPart(value = "photo", required = false) MultipartFile photo, @Validated @RequestPart(value = "venue", required = false) VenueRequest venueRequest) {
        City city = cityService.findById(venueRequest.getCity());
        String photoUrl = amazonClient.uploadFile(photo);
        Venue venue = new Venue(venueRequest.getName(),photoUrl, venueRequest.getStreet(), venueRequest.getNumber(), venueRequest.getTelephone(), city);
        venueService.save(venue);
        return new ResponseEntity<>("Venue successfully added!", HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> updateVenue(@PathVariable Long id, @RequestPart(value = "photo", required = false) MultipartFile photo, @Validated @RequestPart(value = "venue", required = false) VenueRequest venueRequest) {
        Venue updateVenue = venueService.findById(id);
        updateVenue.setName(venueRequest.getName());
        updateVenue.setStreet(venueRequest.getStreet());
        updateVenue.setStreetNumber(venueRequest.getNumber());
        updateVenue.setTelephone(venueRequest.getTelephone());
        City newCity = cityService.findById(venueRequest.getCity());
        updateVenue.setCity(newCity);
        if(photo!=null) {
            amazonClient.deleteFileFromS3Bucket(updateVenue.getPhoto());
            updateVenue.setPhoto(amazonClient.uploadFile(photo));
        }
        venueService.save(updateVenue);
        return new ResponseEntity<>("Venue with id = " + id + " successfully updated!", HttpStatus.OK);
    }

    private Venue applyPatchToVenue(JsonPatch patch, Venue targetVenue) throws JsonPatchException, JsonProcessingException {
        JsonNode patched = patch.apply(objectMapper.convertValue(targetVenue, JsonNode.class));
        return objectMapper.treeToValue(patched, Venue.class);
    }

    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<String> updateVenue(@PathVariable Long id, @RequestBody JsonPatch patch) {
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
        Venue venue = venueService.findById(id);
        String photoUrl = venue.getPhoto();
        amazonClient.deleteFileFromS3Bucket(photoUrl);
        venueService.remove(id);
        return new ResponseEntity<>("Venue successfully deleted!", HttpStatus.OK);
    }
}
