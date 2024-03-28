package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Actor;
import com.atlantbh.cinebh.model.MovieActor;
import com.atlantbh.cinebh.model.Photo;
import com.atlantbh.cinebh.model.Writer;
import com.atlantbh.cinebh.model.Genre;
import com.atlantbh.cinebh.repository.GenreRepository;
import com.atlantbh.cinebh.request.MovieRequest;
import com.atlantbh.cinebh.request.PaginationParams;
import com.atlantbh.cinebh.request.WriterRequest;
import com.atlantbh.cinebh.request.ActorRequest;
import com.atlantbh.cinebh.request.PhotoRequest;
import com.atlantbh.cinebh.service.ActorService;
import com.atlantbh.cinebh.service.MovieService;
import com.atlantbh.cinebh.service.MovieActorService;
import com.atlantbh.cinebh.service.PhotoService;
import com.atlantbh.cinebh.service.WriterService;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.HashSet;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173/")
public class MovieController {

    @Autowired
    private MovieService movieService;

    private GenreRepository genreRepository;

    private PhotoService photoService;

    private MovieActorService movieActorService;

    private ActorService actorService;

    private WriterService writerService;

    ObjectMapper objectMapper;

    @GetMapping("/")
    public ResponseEntity<Iterable<Movie>> getAll() {
        return ResponseEntity.ok(movieService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable("id") Long id) {
        Movie newMovie = movieService.findById(id);
        return ResponseEntity.ok().body(newMovie);
    }

    @GetMapping("/currently")
    public ResponseEntity<Iterable<Movie>> getCurrently(PaginationParams paginationParams) {
        return ResponseEntity.ok(movieService.getCurrentlyShowing(paginationParams.getPage(), paginationParams.getSize()));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<Iterable<Movie>> getUpcoming(PaginationParams paginationParams) {
        return ResponseEntity.ok(movieService.getUpcoming(paginationParams.getPage(), paginationParams.getSize()));
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
                movieRequest.getTrailer(),
                movieRequest.getStatus()
        );
        Set<Long> genresSet = movieRequest.getGenres();
        Set<Genre> genres = new HashSet<>();
        genresSet.forEach(genre -> {
            Genre novi = genreRepository.findById(genre)
                    .orElseThrow(() -> new RuntimeException("Error: Genre not found."));
            genres.add(novi);
        });
        movie.setGenres(genres);
        movieService.createMovie(movie);
        return new ResponseEntity<>("Movie successfully added!", HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> updateMovie(@PathVariable long id, @Validated @RequestBody MovieRequest movieDetails) {
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
        updateMovie.setStatus(movieDetails.getStatus());
        Set<Long> genresSet = movieDetails.getGenres();
        Set<Genre> genres = new HashSet<>();
        genresSet.forEach(genre -> {
            Genre novi = genreRepository.findById(genre)
                    .orElseThrow(() -> new RuntimeException("Error: Genre not found."));
            genres.add(novi);
        });
        updateMovie.setGenres(genres);
        movieService.save(updateMovie);
        return new ResponseEntity<>("Movie with id = " + id + " successfully updated!", HttpStatus.OK);
    }

    @PostMapping(path = "/photos/{id}")
    public ResponseEntity<String> addPhotos(@PathVariable long id, @Validated @RequestBody PhotoRequest[] photoRequests) {
        Movie movie = movieService.findById(id);
        Set<Photo> photos = new HashSet<>();
        for (PhotoRequest photoRequest : photoRequests) {
            Photo newPhoto = photoService.createPhoto(new Photo(photoRequest.getLink(), photoRequest.getCover(), movie));
            photos.add(newPhoto);
        }
        movie.setPhotos(photos);
        movieService.save(movie);
        return new ResponseEntity<>("Successfully added photos for movie with id=" + id + "!", HttpStatus.OK);
    }

    @PostMapping(path = "/writers/{id}")
    public ResponseEntity<String> addWriters(@PathVariable long id, @Validated @RequestBody WriterRequest[] writerRequests) {
        Movie movie = movieService.findById(id);
        Set<Writer> writers = new HashSet<>();
        for (WriterRequest writerRequest : writerRequests) {
            Writer writer = writerService.findByName(writerRequest.getFirstName(), writerRequest.getLastName());
            if (writer == null)
                writer = writerService.save(new Writer(writerRequest.getFirstName(), writerRequest.getLastName()));
            writers.add(writer);
        }
        movie.setWriters(writers);
        movieService.save(movie);
        return new ResponseEntity<>("Successfully added writers for movie with id=" + id + "!", HttpStatus.OK);
    }


    @PostMapping(path = "/actors/{id}")
    public ResponseEntity<String> addActors(@PathVariable long id, @Validated @RequestBody ActorRequest[] actorRequests) {
        Movie movie = movieService.findById(id);
        Set<MovieActor> actors = new HashSet<>();
        for (ActorRequest actor : actorRequests) {
            Actor newActor = actorService.findByName(actor.getFirstName(), actor.getLastName());
            if (newActor == null) {
                newActor = actorService.create(new Actor(actor.getFirstName(), actor.getLastName()));
            }
            MovieActor movieActor = movieActorService.save(new MovieActor(movie, newActor, actor.getRole()));
            actors.add(movieActor);
        }
        movie.setMovieActors(actors);
        movieService.save(movie);
        return new ResponseEntity<>("Successfully added actors for movie with id=" + id + "!", HttpStatus.OK);
    }

    private Movie applyPatchToMovie(JsonPatch patch, Movie targetMovie) throws JsonPatchException, JsonProcessingException {
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
