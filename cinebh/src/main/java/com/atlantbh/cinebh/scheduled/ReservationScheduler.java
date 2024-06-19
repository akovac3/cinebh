package com.atlantbh.cinebh.scheduled;

import com.atlantbh.cinebh.model.Reservation;
import com.atlantbh.cinebh.repository.ProjectionRepository;
import com.atlantbh.cinebh.repository.ReservationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Time;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@Slf4j
public class ReservationScheduler {
    private final ReservationRepository reservationRepository;
    private final ProjectionRepository projectionRepository;

    @Autowired
    public ReservationScheduler(ReservationRepository reservationRepository, ProjectionRepository projectionRepository) {
        this.reservationRepository = reservationRepository;
        this.projectionRepository = projectionRepository;
    }

    @Scheduled(cron = "0 0/15 * * * *")
    public void deleteReservedSeatsForExpiredProjections() {
        LocalTime currentHour = LocalTime.now().truncatedTo(ChronoUnit.MINUTES).plusHours(1);
        log.info("Task for deleting reserved seats started at {}", LocalTime.now().truncatedTo(ChronoUnit.MINUTES));

        List<Reservation> reservations = reservationRepository.getTodaysReservations();

        for (Reservation r : reservations) {
            Time projectionTime = r.getProjection().getTime();
            LocalTime localProjectionTime = projectionTime.toLocalTime();

            if (localProjectionTime.isBefore(currentHour) || localProjectionTime.equals(currentHour)) {
                reservationRepository.delete(r);
            }
        }
    }
}
