package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Photo;
import com.atlantbh.cinebh.repository.ActorRepository;
import com.atlantbh.cinebh.repository.GenreRepository;
import com.atlantbh.cinebh.request.MovieRequest;
import com.atlantbh.cinebh.request.PhotoRequest;
import com.atlantbh.cinebh.service.MovieService;
import com.atlantbh.cinebh.service.PhotoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("/api/photos")
@CrossOrigin(origins = "*")
public class PhotoController {
    @Autowired
    private MovieService movieService;

    @Autowired
    private PhotoService photoService;

    @GetMapping("/")
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


    /*@PostMapping("/")
    public ResponseEntity<String> createPhoto(@Validated @RequestBody PhotoRequest photoRequest){
        Movie movie = movieService.findById(photoRequest.getMovieId());
        Photo newPhoto = new Photo(photoRequest.getLink(), photoRequest.getCover(), movie);
        photoService.createPhoto(newPhoto);

        return new ResponseEntity<>("Photo successfully added!", HttpStatus.CREATED);
    }*/

    @PostMapping("/{id}")
    public ResponseEntity<String> updatePhoto(@PathVariable long id,@Validated @RequestBody PhotoRequest photoRequest) {
        Photo updatePhoto = photoService.findById(id);
        updatePhoto.setCover(photoRequest.getCover());
        updatePhoto.setLink(photoRequest.getLink());

        photoService.save(updatePhoto);

        return  new ResponseEntity<>("Photo with id = " + id +" successfully updated!", HttpStatus.OK);
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
        return new ResponseEntity<>("Movie successfully deleted!", HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<String> deletePostMovie(@PathVariable long id) throws JsonProcessingException {
        movieService.remove(id);
        return new ResponseEntity<>("Movie successfully deleted!", HttpStatus.OK);
    }

}
