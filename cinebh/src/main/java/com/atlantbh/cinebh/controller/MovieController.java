package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Actor;
import com.atlantbh.cinebh.model.Genre;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Photo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import com.atlantbh.cinebh.repository.ActorRepository;
import com.atlantbh.cinebh.repository.GenreRepository;
import com.atlantbh.cinebh.repository.PhotoRepository;
import com.atlantbh.cinebh.request.MovieRequest;
import com.atlantbh.cinebh.service.MovieService;
import com.atlantbh.cinebh.service.PhotoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    private ActorRepository actorRepository;

    private GenreRepository genreRepository;

    private PhotoService photoService;

    ObjectMapper objectMapper = new ObjectMapper();


    @GetMapping("/")
    public ResponseEntity<Iterable<Movie>> getAll() {
        return ResponseEntity.ok(movieService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable("id") Long id) {
        Movie newMovie = movieService.findById(id);
        return ResponseEntity.ok().body(newMovie);
    }

    @PostMapping("/")
    public ResponseEntity<String> createMovie(@Validated @RequestBody MovieRequest movieRequest) {
        Movie movie = new Movie(movieRequest.getName(),
                movieRequest.getYear(),
                movieRequest.getLanguage(),
                movieRequest.getProjectionStart(),
                movieRequest.getProjectionEnd(),
                movieRequest.getDirector(),
                movieRequest.getSynopsis(),
                movieRequest.getRating(),
                movieRequest.getDuration(),
                movieRequest.getTrailer()
        );
        Set<Long> actorsSet = movieRequest.getActors();
        Set<Long> genresSet = movieRequest.getGenres();
        Set<String> photosSet = movieRequest.getPhotos();

        Set<Actor> actors = new HashSet<>();

        if(actorsSet != null)
            actorsSet.forEach(actor -> {
            Actor novi = actorRepository.findById(actor)
                    .orElseThrow(() -> new RuntimeException("Error: Actor not found."));
            actors.add(novi);
        });
        movie.setActors(actors);

        Set<Genre> genres = new HashSet<>();
        genresSet.forEach(genre -> {
            Genre novi = genreRepository.findById(genre)
                    .orElseThrow(() -> new RuntimeException("Error: Genre not found."));
            genres.add(novi);
        });
        movie.setGenres(genres);

        Movie newMovie = movieService.createMovie(movie);

        Set<Photo> photos = new HashSet<>();
        photosSet.forEach(photo -> {
            Photo nova = new Photo(photo, Boolean.FALSE, newMovie);
            Photo created = photoService.createPhoto(nova);
            photos.add(created);
        });
        movie.setPhotos(photos);

        return new ResponseEntity<>("Movie successfully added!", HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> updateMovie(@PathVariable long id,@Validated @RequestBody MovieRequest movieDetails) {
        Movie updateMovie = movieService.findById(id);
        updateMovie.setName(movieDetails.getName());
        updateMovie.setYear(movieDetails.getYear());
        updateMovie.setLanguage(movieDetails.getLanguage());
        updateMovie.setProjectionStart(movieDetails.getProjectionStart());
        updateMovie.setProjectionEnd(movieDetails.getProjectionEnd());
        updateMovie.setDirector(movieDetails.getDirector());
        updateMovie.setSynopsis(movieDetails.getSynopsis());
        updateMovie.setRating(movieDetails.getRating());
        updateMovie.setDuration(movieDetails.getDuration());
        updateMovie.setTrailer(movieDetails.getTrailer());

        Set<Long> actorsSet = movieDetails.getActors();
        Set<Long> genresSet = movieDetails.getGenres();
        Set<String> photosSet = movieDetails.getPhotos();

        Set<Actor> actors = new HashSet<>();
        if(actorsSet != null)
        actorsSet.forEach(actor -> {
            Actor novi = actorRepository.findById(actor)
                    .orElseThrow(() -> new RuntimeException("Error: Actor not found."));
            actors.add(novi);
        });
        updateMovie.setActors(actors);

        Set<Genre> genres = new HashSet<>();
        genresSet.forEach(genre -> {
            Genre novi = genreRepository.findById(genre)
                    .orElseThrow(() -> new RuntimeException("Error: Genre not found."));
            genres.add(novi);
        });
        updateMovie.setGenres(genres);

        Set<Photo> photos = new HashSet<>();
        photosSet.forEach(photo -> {
            Photo nova = new Photo(photo, Boolean.FALSE, updateMovie);
            Photo created = photoService.createPhoto(nova);
            photos.add(created);
        });

        Set<Photo> oldPhotos = photoService.getPhotosByMovie(updateMovie);
        updateMovie.setPhotos(photos);

        movieService.save(updateMovie);

        return  new ResponseEntity<>("Movie with id = " + id +" successfully updated!", HttpStatus.OK);
    }

    private Movie applyPatchToMovie(
            JsonPatch patch, Movie targetMovie) throws JsonPatchException, JsonProcessingException {
        JsonNode patched = patch.apply(objectMapper.convertValue(targetMovie, JsonNode.class));
        return objectMapper.treeToValue(patched, Movie.class);
    }

    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity updateMovie(@PathVariable Long id, @RequestBody JsonPatch patch) {
        try {
            Movie movie = movieService.findById(id);
            Movie moviePatched = applyPatchToMovie(patch, movie);
            movieService.save(moviePatched);
            return new ResponseEntity<>("Movie with id = " + id + " successfully updated!", HttpStatus.OK);
        } catch (JsonPatchException | JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable long id) throws JsonProcessingException {
        movieService.remove(id);
        return new ResponseEntity<>("Movie successfully deleted!", HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<String> deletePostMovie(@PathVariable long id) throws JsonProcessingException {
        movieService.remove(id);
        return new ResponseEntity<>("Movie successfully deleted!", HttpStatus.OK);
    }

}
