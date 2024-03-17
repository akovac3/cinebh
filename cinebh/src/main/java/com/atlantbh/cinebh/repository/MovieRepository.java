package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
