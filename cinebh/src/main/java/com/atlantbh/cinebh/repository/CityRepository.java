package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
    City findByName(String name);
}
