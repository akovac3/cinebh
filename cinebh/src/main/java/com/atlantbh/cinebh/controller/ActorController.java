package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.model.Actor;
import com.atlantbh.cinebh.request.ActorRequest;
import com.atlantbh.cinebh.service.ActorService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
@RequestMapping("/api/actors")
@CrossOrigin(origins = "http://localhost:5173/")
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
        actorService.save(new Actor(actorRequest.getFirstName(), actorRequest.getLastName()));
        return new ResponseEntity<>("Actor successfully added!", HttpStatus.CREATED);
    }
}
