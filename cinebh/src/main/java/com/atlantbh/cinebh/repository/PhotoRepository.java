package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Query("SELECT img FROM Photo img WHERE img.movie=?1")
    Set<Photo> getPhotosByMovie(Movie movie);

    @Query("SELECT img FROM Photo img WHERE img.movie=?1 AND img.cover=TRUE")
    Photo getMovieCover(Movie movie);
}
