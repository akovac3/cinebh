package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.model.City;
import com.atlantbh.cinebh.service.CityService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/cities")
@CrossOrigin(origins = "http://localhost:5173/")
public class CityController {

    private CityService cityService;

    @GetMapping("/")
    public ResponseEntity<Iterable<City>> getAll() {
        return ResponseEntity.ok(cityService.getAll());
    }
}
