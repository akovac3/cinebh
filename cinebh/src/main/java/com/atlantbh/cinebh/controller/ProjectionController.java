package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.request.PaginationParams;
import com.atlantbh.cinebh.service.ProjectionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.List;
import java.util.Set;

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
