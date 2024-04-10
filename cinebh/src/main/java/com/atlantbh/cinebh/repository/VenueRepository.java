package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.City;
import com.atlantbh.cinebh.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    @Query("SELECT venue FROM Venue venue WHERE venue.city = ?1")
    Set<Venue> findAllByCity(City city);
}
