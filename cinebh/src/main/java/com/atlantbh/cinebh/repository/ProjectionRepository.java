package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Projection;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.util.List;

public interface ProjectionRepository extends JpaRepository<Projection, Long>, JpaSpecificationExecutor<Projection> {
    @Query("SELECT DISTINCT time FROM Projection ORDER BY time ASC ")
    List<Time> getTimes();

    @Query("SELECT proj FROM Projection proj WHERE proj.movie=?1 AND proj.venue=?2 ORDER BY proj.time")
    List<Projection> getProjectionsForMovieAndVenue(Movie movie, Venue venue);

    @Query("SELECT proj FROM Projection proj WHERE proj.movie=?1 ORDER BY proj.time")
    List<Projection> getProjectionsForMovie(Movie movie);

    @Transactional
    void deleteByMovie(Movie movie);
}
