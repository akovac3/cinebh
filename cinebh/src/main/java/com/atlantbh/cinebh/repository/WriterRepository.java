package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Writer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WriterRepository extends JpaRepository<Writer, Long> {
    Writer findByFirstNameAndLastName(String firstName, String lastName);
}
