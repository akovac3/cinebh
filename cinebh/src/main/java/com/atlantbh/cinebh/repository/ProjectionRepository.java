package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Projection;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

public interface ProjectionRepository extends JpaRepository<Projection, Long>, JpaSpecificationExecutor<Projection> {
    @Query("SELECT DISTINCT time FROM Projection ORDER BY time ASC ")
    List<Time> getTimes();

    @Query("SELECT proj FROM Projection proj WHERE proj.movie=?1 AND proj.venue=?2 AND proj.date=?3 ORDER BY proj.time")
    List<Projection> getProjectionsForMovieAndVenueAndDate(Movie movie, Venue venue, Date date);

    @Query("SELECT proj FROM Projection proj WHERE proj.date=CURRENT_DATE()")
    List<Projection> getTodaysProjections();
}
