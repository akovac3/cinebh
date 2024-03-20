package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.model.Actor;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.request.ActorRequest;
import com.atlantbh.cinebh.request.MovieRequest;
import com.atlantbh.cinebh.service.ActorService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/actors")
public class ActorController {
    @Autowired
    private ActorService actorService;

    @GetMapping("/")
    public ResponseEntity<Iterable<Actor>> getAll() {
        return ResponseEntity.ok(actorService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Actor> getActorById(@PathVariable("id") Long id) {
        Actor newActor = actorService.findById(id);
        return ResponseEntity.ok().body(newActor);
    }

    @PostMapping("/")
    public ResponseEntity<String> createActor(@Validated @RequestBody ActorRequest actorRequest) {
        Actor actor = new Actor(actorRequest.getFirstName(), actorRequest.getLastName());

        actorService.create(actor);
        return new ResponseEntity<>("Actor successfully added!", HttpStatus.CREATED);
    }
}
