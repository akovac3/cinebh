package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Actor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActorRepository extends JpaRepository<Actor, Long> {
    Actor findByFirstNameAndLastName(String firstName, String lastName);
}
