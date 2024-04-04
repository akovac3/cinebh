package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.model.Genre;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.service.GenreService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/genres")
@CrossOrigin(origins = "http://localhost:5173/")
public class GenreController {

    private GenreService genreService;

    @GetMapping("/")
    public ResponseEntity<Iterable<Genre>> getAll() {
        return ResponseEntity.ok(genreService.getAll());
    }

}