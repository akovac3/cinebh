package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Projection;
import com.atlantbh.cinebh.model.Reservation;
import com.atlantbh.cinebh.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Transactional
    @Modifying
    @Query("DELETE FROM Reservation r WHERE r.projection = :projection AND r.type = :type")
    void deleteByProjectionAndType(Projection projection, Type type);
}
