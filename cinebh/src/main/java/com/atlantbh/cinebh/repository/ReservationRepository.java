package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Projection;
import com.atlantbh.cinebh.model.Reservation;
import com.atlantbh.cinebh.model.Type;
import com.atlantbh.cinebh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Transactional
    @Modifying
    @Query("DELETE FROM Reservation r WHERE r.projection = :projection AND r.type = :type")
    void deleteByProjectionAndType(Projection projection, Type type);

    @Query("SELECT r FROM Reservation r WHERE r.user = :user AND r.type = 'RESERVATION'")
    List<Reservation> findReservationsByUser(User user);

    @Query("SELECT r FROM Reservation r WHERE r.projection = :projection AND r.date = :date AND r.type = 'RESERVATION'")
    List<Reservation> findReservationsByProjectionAndDate(Projection projection, Date date);

    @Query("SELECT r FROM Reservation r WHERE r.user = :user AND r.type = 'PURCHASE' AND (r.date > CURRENT_DATE OR (r.date = CURRENT_DATE AND r.projection.time >= CURRENT_TIME))")
    List<Reservation> findUpcomingPurchasesByUser(User user);

    @Query("SELECT r FROM Reservation r WHERE r.user = :user AND r.type = 'PURCHASE' AND (r.date < CURRENT_DATE OR (r.date = CURRENT_DATE AND r.projection.time < CURRENT_TIME))")
    List<Reservation> findPastPurchasesByUser(User user);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.user = :user AND r.type = 'RESERVATION'")
    long countReservations(User user);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.user = :user AND r.type = 'PURCHASE' AND (r.date > CURRENT_DATE OR (r.date = CURRENT_DATE AND r.projection.time >= CURRENT_TIME))")
    long countUpcoming(User user);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.user = :user AND r.type = 'PURCHASE' AND (r.date < CURRENT_DATE OR (r.date = CURRENT_DATE AND r.projection.time < CURRENT_TIME))")
    long countPast(User user);

    @Query("SELECT r FROM Reservation r WHERE r.date=CURRENT_DATE() AND r.type='RESERVATION'")
    List<Reservation> getTodaysReservations();
}
