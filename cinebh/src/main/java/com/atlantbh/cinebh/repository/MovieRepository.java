package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.Set;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query("SELECT mov FROM Movie mov WHERE mov.projectionStart<=?1 AND mov.projectionEnd>=?1")
    Page<Movie> findCurrentlyShowing(Date date, Pageable pageable);

    @Query("SELECT mov FROM Movie mov WHERE mov.projectionStart>?1")
    Set<Movie> findUpcoming(Date date);
}
