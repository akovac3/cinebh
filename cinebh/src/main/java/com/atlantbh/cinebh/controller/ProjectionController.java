package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Projection;
import com.atlantbh.cinebh.model.Venue;
import com.atlantbh.cinebh.service.MovieService;
import com.atlantbh.cinebh.service.VenueService;
import com.atlantbh.cinebh.service.ProjectionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.sql.Date;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/projections")
public class ProjectionController {
    @Autowired
    private ProjectionService projectionService;

    @Autowired
    private MovieService movieService;

    @Autowired
    private VenueService venueService;

    @GetMapping("/times")
    ResponseEntity<List<String>> getProjectionTimes(){
        return ResponseEntity.ok(projectionService.getTimes());
    }

    @GetMapping
    ResponseEntity<List<Projection>> getMovieProjectionsForVenue(@RequestParam Long movie, @RequestParam Long venue, @RequestParam String date){
        Movie movieObj = movieService.findById(movie);
        Venue venueObj = venueService.findById(venue);
        Date dateObj = Date.valueOf(date);
        return ResponseEntity.ok(projectionService.getProjectionsForMovie(movieObj, venueObj));
    }

    @GetMapping("/movie/{id}")
    ResponseEntity<List<Projection>> getMovieProjections(@PathVariable long id){
        Movie movie = movieService.findById(id);
        return ResponseEntity.ok(projectionService.getProjectionsForMovie(movie, null));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteProjection(@PathVariable long id) {
        return ResponseEntity.ok(projectionService.deleteProjection(id));
    }
}
