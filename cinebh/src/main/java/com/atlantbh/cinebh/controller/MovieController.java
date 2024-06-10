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
import com.atlantbh.cinebh.request.StatusParams;
import com.atlantbh.cinebh.request.UpdateStatusRequest;
import com.atlantbh.cinebh.request.PhotoRequest;
import com.atlantbh.cinebh.request.ActorRequest;
import com.atlantbh.cinebh.request.CurrentlyMoviesFilterParams;
import com.atlantbh.cinebh.request.UpcomingMoviesFilterParams;
import com.atlantbh.cinebh.request.ProjectionRequest;
import com.atlantbh.cinebh.request.WriterRequest;
import com.atlantbh.cinebh.request.MovieRequest;
import com.atlantbh.cinebh.response.DetailsResponse;
import com.atlantbh.cinebh.response.MovieResponse;
import com.atlantbh.cinebh.response.NumberOfElementsResponse;
import com.atlantbh.cinebh.service.MovieService;
import com.atlantbh.cinebh.service.PhotoService;
import com.atlantbh.cinebh.service.ActorService;
import com.atlantbh.cinebh.service.WriterService;
import com.atlantbh.cinebh.service.ProjectionService;
import com.atlantbh.cinebh.service.AmazonService;
import com.atlantbh.cinebh.service.VenueService;
import com.atlantbh.cinebh.service.MovieActorService;
import com.atlantbh.cinebh.service.CSVService;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
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

    private AmazonService amazonClient;

    @Autowired
    private CSVService csvService;

    @GetMapping
    public ResponseEntity<Iterable<Movie>> getAll() {
        return ResponseEntity.ok(movieService.getAll());
    }

    @GetMapping("/count-elements")
    public ResponseEntity<NumberOfElementsResponse> getNumberOfElements() {
        return ResponseEntity.ok(movieService.getNumberOfElements());
    }

    @GetMapping("/search-by-status")
    public ResponseEntity<Iterable<Movie>> getByStatus(StatusParams statusParams, PaginationParams paginationParams) {
        return ResponseEntity.ok(movieService.getByStatus(statusParams, paginationParams.getPage(), paginationParams.getSize()));
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

    @GetMapping("/all-upcoming")
    public ResponseEntity<Iterable<Movie>> getAllUpcoming(PaginationParams paginationParams) {
        return ResponseEntity.ok(movieService.getAllUpcoming(paginationParams.getPage(), paginationParams.getSize()));
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
    public ResponseEntity<MovieResponse> createMovie(@Validated @RequestBody MovieRequest movieRequest) {
        Movie movie = new Movie(movieRequest.getName(),
                movieRequest.getStep(),
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
        if (genresSet != null) {
            Set<Genre> genres = genresSet.stream()
                    .map(genreId -> genreRepository.findById(genreId)
                            .orElseThrow(() -> new RuntimeException("Error: Genre not found for ID " + genreId)))
                    .collect(Collectors.toSet());
            movie.setGenres(genres);
        }

        Movie createdMovie = movieService.save(movie);
        return ResponseEntity.ok(new MovieResponse(createdMovie.getMovieId()));
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> updateMovie(@PathVariable long id, @Validated @RequestBody MovieRequest movieDetails) {
        Movie updateMovie = movieService.findById(id);
        updateMovie.setName(movieDetails.getName());
        updateMovie.setLanguage(movieDetails.getLanguage());
        updateMovie.setProjectionStart(movieDetails.getProjectionStart());
        updateMovie.setProjectionEnd(movieDetails.getProjectionEnd());
        updateMovie.setDirector(movieDetails.getDirector());
        updateMovie.setSynopsis(movieDetails.getSynopsis());
        updateMovie.setRating(movieDetails.getRating());
        updateMovie.setDuration(movieDetails.getDuration());
        updateMovie.setTrailer(movieDetails.getTrailer());
        updateMovie.setStatus(movieDetails.getStatus());
        updateMovie.setStep(movieDetails.getStep());
        Set<Long> genresSet = movieDetails.getGenres();
        Set<Genre> genres = genresSet.stream()
                .map(genreId -> genreRepository.findById(genreId)
                        .orElseThrow(() -> new RuntimeException("Error: Genre not found for ID " + genreId)))
                .collect(Collectors.toSet());
        updateMovie.setGenres(genres);
        movieService.save(updateMovie);
        return new ResponseEntity<>("Movie with id = " + id + " successfully updated!", HttpStatus.OK);
    }

    @PostMapping(path = "/{id}/add-files")
    public ResponseEntity<String> addPhotos(@PathVariable long id, @RequestPart(value = "files", required = false) MultipartFile[] files, @RequestPart(value = "photos", required = false) PhotoRequest[] photoRequests) {
        try {
            Movie movie = movieService.findById(id);
            if (movie == null) {
                return new ResponseEntity<>("Movie not found", HttpStatus.NOT_FOUND);
            }

            Set<Photo> newPhotos = new HashSet<>();

            int index = 0;
            if (files != null) {
                for (MultipartFile file : files) {
                    String fileUrl = amazonClient.uploadFile(file);
                    newPhotos.add(photoService.createPhoto(new Photo(fileUrl, photoRequests[index].getCover(), movie)));
                    index++;
                }
            }

            if (photoRequests != null) {
                for (int i = index; i < photoRequests.length; i++) {
                    Photo p = photoService.findById(photoRequests[i].getId());
                    p.setCover(photoRequests[i].getCover());
                    photoService.save(p);
                    newPhotos.add(p);
                }
            }
            movie.setPhotos(newPhotos);
            movieService.save(movie);

            return new ResponseEntity<>("Successfully added photos for movie with id=" + id + "!", HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while adding photos", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/{id}/photos")
    public ResponseEntity<String> deletePhotos(@PathVariable long id, @RequestBody List<Long> deletePhotos) {
        try {
            Movie movie = movieService.findById(id);
            if (movie == null) {
                return new ResponseEntity<>("Movie not found", HttpStatus.NOT_FOUND);
            }

            Set<Photo> photos = movie.getPhotos();
            Set<Photo> photosToDelete = deletePhotos.stream()
                    .map(photoService::findById)
                    .collect(Collectors.toSet());

            for (Photo photo : photosToDelete) {
                if (photo == null) {
                    return new ResponseEntity<>("Photo not found", HttpStatus.NOT_FOUND);
                }
                amazonClient.deleteFileFromS3Bucket(photo.getLink());
                photos.remove(photo);
                photoService.deletePhoto(photo);
            }

            movie.setPhotos(photos);
            movieService.save(movie);

            return new ResponseEntity<>("Successfully deleted photos for movie with id=" + id + "!", HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while deleting photos", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/{id}/projection")
    public ResponseEntity<String> addProjections(@PathVariable long id, @Validated @RequestBody ProjectionRequest[] projectionRequests) {
        Movie movie = movieService.findById(id);
        deleteProjectionsForMovie(movie);

        Set<Projection> newProjections = Arrays.stream(projectionRequests)
                .flatMap(projectionRequest -> {
                    Venue venue = venueService.findById(projectionRequest.getVenue());
                    return projectionService.createProjectionsForMovie(movie, projectionRequest.getTime(), venue).stream();
                })
                .collect(Collectors.toSet());
        movie.setProjections(newProjections);
        movieService.save(movie);
        return new ResponseEntity<>("Successfully added projections for movie with id=" + id + "!", HttpStatus.OK);
    }

    private void deleteProjectionsForMovie(Movie movie) {
        movie.setProjections(new HashSet<>());
        movieService.save(movie);
        projectionService.deleteProjectionsByMovie(movie);
    }

    @DeleteMapping(path = "/{id}/projection")
    public ResponseEntity<String> deleteProjections(@PathVariable long id) {
        Movie movie = movieService.findById(id);
        deleteProjectionsForMovie(movie);
        return new ResponseEntity<>("Successfully deleted projections for movie with id=" + id + "!", HttpStatus.OK);
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

    @PostMapping(path = "/{id}/add-details")
    public ResponseEntity<DetailsResponse> addDetails(@PathVariable long id,
                                                      @RequestParam(value = "actorsFile", required = false) MultipartFile actorsFile,
                                                      @RequestParam(value = "writersFile", required = false) MultipartFile writersFile) {
        try {
            Movie movie = movieService.findById(id);
            if (movie == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

            Set<MovieActor> actors = new HashSet<>();
            Set<Writer> writers = new HashSet<>();

            if (actorsFile != null && !actorsFile.isEmpty() && actorsFile.getOriginalFilename().endsWith(".csv")) {
                actors = readActorsFromCSV(actorsFile, movie);
            }
            if (writersFile != null && !writersFile.isEmpty() && writersFile.getOriginalFilename().endsWith(".csv")) {
                writers = readWritersFromCSV(writersFile);
            }
            if (!actors.isEmpty()) {
                movie.setMovieActors(actors);
            }
            if (!writers.isEmpty()) {
                movie.setWriters(writers);
            }

            movieService.save(movie);

            DetailsResponse response = new DetailsResponse(actors, writers);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Set<MovieActor> readActorsFromCSV(MultipartFile file, Movie movie) throws Exception {
        Set<MovieActor> actors = new HashSet<>();
        List<String[]> rows = csvService.readCsv(file);

        for (String[] fields : rows) {
            if (fields.length < 3) continue;
            String firstName = fields[0].trim();
            String lastName = fields[1].trim();
            String role = fields[2].trim();

            Actor newActor = actorService.findByName(firstName, lastName);
            if (newActor == null) {
                newActor = actorService.save(new Actor(firstName, lastName));
            }
            MovieActor movieActor = new MovieActor(movie, newActor, role);
            actors.add(movieActorService.save(movieActor));
        }
        return actors;
    }

    private Set<Writer> readWritersFromCSV(MultipartFile file) throws Exception {
        Set<Writer> writers = new HashSet<>();
        List<String[]> rows = csvService.readCsv(file);

        for (String[] fields : rows) {
            if (fields.length < 2) continue;
            String firstName = fields[0].trim();
            String lastName = fields[1].trim();

            Writer writer = writerService.findByName(firstName, lastName);
            if (writer == null) {
                writer = writerService.save(new Writer(firstName, lastName));
            }
            writers.add(writer);
        }
        return writers;
    }

    @DeleteMapping(path = "/{id}/delete-actors")
    public ResponseEntity<String> deleteActors(@PathVariable long id) {
        try {
            Movie movie = movieService.findById(id);
            if (movie == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Set<MovieActor> movieActors = movie.getMovieActors();
            movie.getMovieActors().clear();
            movieService.save(movie);

            for (MovieActor ma : movieActors) {
                movieActorService.remove(ma.getMovieActorId());
            }

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/{id}/delete-writers")
    public ResponseEntity<String> deleteWriters(@PathVariable long id) {
        try {
            Movie movie = movieService.findById(id);
            if (movie == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            movie.getWriters().clear();
            movieService.save(movie);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @PutMapping("/update-status")
    public ResponseEntity<String> updateStatus(@Validated @RequestBody UpdateStatusRequest updateStatusRequest) {
        Set<Long> movieIds = updateStatusRequest.getMovieIds();
        String newStatus = updateStatusRequest.getStatus();
        movieService.batchUpdateStatus(movieIds, newStatus);
        return new ResponseEntity<>("Movies successfully updated!", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable long id) throws JsonProcessingException {
        movieService.remove(id);
        return new ResponseEntity<>("Movie successfully deleted!", HttpStatus.OK);
    }
}
