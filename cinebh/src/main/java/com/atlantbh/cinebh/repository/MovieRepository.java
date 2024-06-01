package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface MovieRepository extends JpaRepository<Movie, Long>, JpaSpecificationExecutor<Movie> {

    @Query("SELECT mov FROM Movie mov WHERE mov.projectionStart <= CURRENT_DATE() AND mov.projectionEnd >= CURRENT_DATE() AND mov.status = 'PUBLISHED'")
    Page<Movie> findCurrentlyShowing(Pageable pageable);

    @Query("SELECT mov FROM Movie mov WHERE mov.projectionStart>=DATEADD(DAY, 10, CURRENT_DATE()) AND mov.status = 'PUBLISHED'")
    Page<Movie> findUpcoming(Pageable pageable);

    @Query("SELECT mov FROM Movie mov WHERE mov.projectionStart>= CURRENT_DATE() AND mov.status = 'PUBLISHED'")
    Page<Movie> findAllUpcoming(Pageable pageable);

    @Query("SELECT COUNT(mov) FROM Movie mov WHERE mov.projectionStart <= CURRENT_DATE() AND mov.projectionEnd >= CURRENT_DATE() AND mov.status = 'PUBLISHED'")
    long countCurrentlyShowing();

    @Query("SELECT COUNT(mov) FROM Movie mov WHERE mov.projectionStart >= CURRENT_DATE() AND mov.status = 'PUBLISHED'")
    long countUpcoming();

    @Query("SELECT COUNT(mov) FROM Movie mov WHERE mov.status = 'DRAFT'")
    long countDrafts();

    @Query("SELECT COUNT(mov) FROM Movie mov WHERE mov.status = 'ARCHIVED'")
    long countArchived();

    Page<Movie> findByStatus(Status status, Pageable pageable);
}
