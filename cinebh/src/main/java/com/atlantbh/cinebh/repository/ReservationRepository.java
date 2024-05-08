package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
