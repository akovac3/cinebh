package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query("SELECT mov FROM Movie mov WHERE mov.projectionStart <= CURRENT_DATE() AND mov.projectionEnd >= CURRENT_DATE()")
    Page<Movie> findCurrentlyShowing(Pageable pageable);

    @Query("SELECT mov FROM Movie mov WHERE mov.projectionStart>=DATEADD(DAY, 10, CURRENT_DATE())")
    Page<Movie> findUpcoming(Pageable pageable);
}
