package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Projection;
import com.atlantbh.cinebh.model.Reservation;
import com.atlantbh.cinebh.model.Type;
import com.atlantbh.cinebh.model.User;
import com.atlantbh.cinebh.repository.ProjectionRepository;
import com.atlantbh.cinebh.repository.ReservationRepository;
import com.atlantbh.cinebh.request.ReservationRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReservationService {

    private ReservationRepository reservationRepository;

    @Autowired
    private ProjectionRepository projectionRepository;

    public String create(ReservationRequest request, User user){
        Projection projection = projectionRepository.findById(request.getProjectionId()).orElseThrow(()-> new ResourceNotFoundException("Invalid projection id!"));
        List<String> reservedSeats = projection.getReservedSeats();
        List<String> purchasedSeats = projection.getPurchasedSeats();
        if(request.getSeats().isEmpty()) throw new IllegalArgumentException("Please select seats!");
        boolean seatsAvailable = request.getSeats().stream()
                .noneMatch(seat -> reservedSeats.contains(seat) || purchasedSeats.contains(seat));

        if(!seatsAvailable) throw new IllegalArgumentException("Seats are already reserved!");

        Reservation reservation = new Reservation(request.getSeats(), request.getDate(), request.getPrice(), user, projection);
        reservationRepository.save(reservation);
        if(request.getType().equals(Type.RESERVATION)) {
            reservedSeats.addAll(request.getSeats());
            projection.setReservedSeats(reservedSeats);
        } else {
            purchasedSeats.addAll(request.getSeats());
            projection.setPurchasedSeats(purchasedSeats);
        }
        projectionRepository.save(projection);
        return "Reservation saved successfully";
    }
}
