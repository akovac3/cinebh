package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.service.ProjectionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/projections")
@CrossOrigin(origins = "http://localhost:5173/")
public class ProjectionController {
    @Autowired
    private ProjectionService projectionService;

    @GetMapping("/times")
    ResponseEntity<List<String>> getProjectionTimes(){
        return ResponseEntity.ok(projectionService.getTimes());
    }
}
