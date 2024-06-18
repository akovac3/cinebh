package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Projection;
import com.atlantbh.cinebh.model.Reservation;
import com.atlantbh.cinebh.model.Type;
import com.atlantbh.cinebh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Transactional
    @Modifying
    @Query("DELETE FROM Reservation r WHERE r.projection = :projection AND r.type = :type")
    void deleteByProjectionAndType(Projection projection, Type type);

    @Query("SELECT r FROM Reservation r WHERE r.user = :user AND r.type = 'RESERVATION'")
    List<Reservation> findAllByUser(User user);

    @Query("SELECT COUNT(res) FROM Reservation res WHERE res.user = :user AND res.type = 'RESERVATION'")
    long countReservations(User user);
}
