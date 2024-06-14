package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Photo;
import com.atlantbh.cinebh.service.MovieService;
import com.atlantbh.cinebh.service.PhotoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("/api/photos")
public class PhotoController {
    @Autowired
    private MovieService movieService;

    @Autowired
    private PhotoService photoService;

    @GetMapping
    public ResponseEntity<Iterable<Photo>> getAll() {
        return ResponseEntity.ok(photoService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Photo> getPhotoById(@PathVariable("id") Long id) {
        Photo newPhoto = photoService.findById(id);
        return ResponseEntity.ok().body(newPhoto);
    }

    @GetMapping("/movie/{id}")
    public ResponseEntity<Iterable<Photo>> getPhotoByMovieId(@PathVariable("id") Long id) {
        Movie movie = movieService.findById(id);
        Set<Photo> newPhotos = photoService.getPhotosByMovie(movie);
        return ResponseEntity.ok(newPhotos);
    }

    @GetMapping("/cover/movie/{id}")
    public ResponseEntity<Photo> getCoverByMovieId(@PathVariable("id") Long id) {
        Movie movie = movieService.findById(id);
        Photo cover = photoService.getMovieCover(movie);
        return ResponseEntity.ok(cover);
    }

    @GetMapping("/covers")
    public ResponseEntity<Iterable<Photo>> getAllCovers() {
        Set<Photo> covers = photoService.getCovers();
        return ResponseEntity.ok(covers);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePhoto(@PathVariable long id) throws JsonProcessingException {
        photoService.remove(id);
        return new ResponseEntity<>("Photo successfully deleted!", HttpStatus.OK);
    }
}
