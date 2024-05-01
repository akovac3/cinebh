package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Actor;
import com.atlantbh.cinebh.model.MovieActor;
import com.atlantbh.cinebh.model.Photo;
import com.atlantbh.cinebh.model.Writer;
import com.atlantbh.cinebh.model.Genre;
import com.atlantbh.cinebh.repository.GenreRepository;
import com.atlantbh.cinebh.request.PaginationParams;
import com.atlantbh.cinebh.request.PhotoRequest;
import com.atlantbh.cinebh.request.ActorRequest;
import com.atlantbh.cinebh.request.CurrentlyMoviesFilterParams;
import com.atlantbh.cinebh.request.UpcomingMoviesFilterParams;
import com.atlantbh.cinebh.request.ProjectionRequest;
import com.atlantbh.cinebh.request.WriterRequest;
import com.atlantbh.cinebh.request.MovieRequest;
import com.atlantbh.cinebh.service.ActorService;
import com.atlantbh.cinebh.service.MovieService;
import com.atlantbh.cinebh.service.MovieActorService;
import com.atlantbh.cinebh.service.PhotoService;
import com.atlantbh.cinebh.service.WriterService;
import com.atlantbh.cinebh.service.VenueService;
import com.atlantbh.cinebh.service.ProjectionService;
import com.atlantbh.cinebh.model.Projection;
import com.atlantbh.cinebh.model.Venue;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private VenueService venueService;

    private GenreRepository genreRepository;

    private PhotoService photoService;

    private MovieActorService movieActorService;

    private ActorService actorService;

    private WriterService writerService;

    private ProjectionService projectionService;

    ObjectMapper objectMapper;

    @GetMapping
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

    @GetMapping("/search-currently")
    public ResponseEntity<Page<Movie>> getCurrentlyMovies(CurrentlyMoviesFilterParams filterParams, PaginationParams paginationParams) {
        return ResponseEntity.ok(movieService.getCurrentlyShowingForFilter(filterParams, paginationParams));
    }

    @GetMapping("/search-upcoming")
    public ResponseEntity<Page<Movie>> getUpcomingMovies(UpcomingMoviesFilterParams filterParams, PaginationParams paginationParams) {
        return ResponseEntity.ok(movieService.getUpcomingForFilter(filterParams, paginationParams));
    }

    @GetMapping("/similar")
    public ResponseEntity<Page<Movie>> findSimilarMovies(@RequestParam Long movie, PaginationParams paginationParams) {
        Movie movieObj = movieService.findById(movie);
        return ResponseEntity.ok(movieService.findAllSimilarMoviesByGenre(movieObj, paginationParams));
    }

    @PostMapping
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
        Set<Genre> genres = genresSet.stream()
                .map(genreId -> genreRepository.findById(genreId)
                        .orElseThrow(() -> new RuntimeException("Error: Genre not found for ID " + genreId)))
                .collect(Collectors.toSet());
        movie.setGenres(genres);
        movieService.save(movie);
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
        Set<Genre> genres = genresSet.stream()
                .map(genreId -> genreRepository.findById(genreId)
                        .orElseThrow(() -> new RuntimeException("Error: Genre not found for ID " + genreId)))
                .collect(Collectors.toSet());
        updateMovie.setGenres(genres);
        movieService.save(updateMovie);
        return new ResponseEntity<>("Movie with id = " + id + " successfully updated!", HttpStatus.OK);
    }

    @PostMapping(path = "/{id}/photos")
    public ResponseEntity<String> addPhotos(@PathVariable long id, @Validated @RequestBody PhotoRequest[] photoRequests) {
        Movie movie = movieService.findById(id);
        Set<Photo> photos = Arrays.stream(photoRequests).
                map(photoRequest -> photoService.createPhoto(new Photo(photoRequest.getLink(), photoRequest.getCover(), movie))).collect(Collectors.toSet());
        movie.setPhotos(photos);
        movieService.save(movie);
        return new ResponseEntity<>("Successfully added photos for movie with id=" + id + "!", HttpStatus.OK);
    }

    @PostMapping(path = "/{id}/projection")
    public ResponseEntity<String> addProjections(@PathVariable long id, @Validated @RequestBody ProjectionRequest[] projectionRequests) {
        Movie movie = movieService.findById(id);
        Set<Projection> projections = movie.getProjections();
        projections.addAll(Arrays.stream(projectionRequests)
                .map(projectionRequest -> {
                    Venue venue = venueService.findById(projectionRequest.getVenueId());
                    return projectionService.save(new Projection(projectionRequest.getTime(), movie, venue));
                }).collect(Collectors.toSet()));
        movie.setProjections(projections);
        movieService.save(movie);
        return new ResponseEntity<>("Successfully added projections for movie with id=" + id + "!", HttpStatus.OK);
    }

    @PostMapping(path = "/{id}/writers")
    public ResponseEntity<String> addWriters(@PathVariable long id, @Validated @RequestBody WriterRequest[] writerRequests) {
        Movie movie = movieService.findById(id);
        Set<Writer> writers = Arrays.stream(writerRequests)
                .map(writerRequest -> {
                    Writer writer = writerService.findByName(writerRequest.getFirstName(), writerRequest.getLastName());
                    if (writer == null) {
                        writer = writerService.save(new Writer(writerRequest.getFirstName(), writerRequest.getLastName()));
                    }
                    return writer;
                })
                .collect(Collectors.toSet());
        movie.setWriters(writers);
        movieService.save(movie);
        return new ResponseEntity<>("Successfully added writers for movie with id=" + id + "!", HttpStatus.OK);
    }

    @PostMapping(path = "/{id}/actors")
    public ResponseEntity<String> addActors(@PathVariable long id, @Validated @RequestBody ActorRequest[] actorRequests) {
        Movie movie = movieService.findById(id);
        Set<MovieActor> actors = Arrays.stream(actorRequests).map(
                        actorRequest -> {
                            Actor newActor = actorService.findByName(actorRequest.getFirstName(), actorRequest.getLastName());
                            if (newActor == null) {
                                newActor = actorService.save(new Actor(actorRequest.getFirstName(), actorRequest.getLastName()));
                            }
                            return movieActorService.save(new MovieActor(movie, newActor, actorRequest.getRole()));
                        })
                .collect(Collectors.toSet());
        movie.setMovieActors(actors);
        movieService.save(movie);
        return new ResponseEntity<>("Successfully added actors for movie with id=" + id + "!", HttpStatus.OK);
    }

    private Movie applyPatchToMovie(JsonPatch patch, Movie targetMovie) throws JsonPatchException, JsonProcessingException {
        JsonNode patched = patch.apply(objectMapper.convertValue(targetMovie, JsonNode.class));
        return objectMapper.treeToValue(patched, Movie.class);
    }

    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<String> updateMovie(@PathVariable Long id, @RequestBody JsonPatch patch) {
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
}
