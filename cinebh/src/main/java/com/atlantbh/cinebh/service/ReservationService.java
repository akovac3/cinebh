package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Projection;
import com.atlantbh.cinebh.model.Reservation;
import com.atlantbh.cinebh.model.Type;
import com.atlantbh.cinebh.model.User;
import com.atlantbh.cinebh.repository.ProjectionRepository;
import com.atlantbh.cinebh.repository.ReservationRepository;
import com.atlantbh.cinebh.request.EmailRequest;
import com.atlantbh.cinebh.request.ReservationRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ReservationService {

    private ReservationRepository reservationRepository;

    @Autowired
    private ProjectionRepository projectionRepository;

    @Autowired
    private EmailService emailService;

    public String create(ReservationRequest request, User user) {
        Projection projection = projectionRepository.findById(request.getProjectionId()).orElseThrow(() -> new ResourceNotFoundException("Invalid projection id!"));
        List<String> reservedSeats = projection.getReservedSeats();
        List<String> purchasedSeats = projection.getPurchasedSeats();
        if(reservedSeats == null ) reservedSeats = new ArrayList<>();
        if(purchasedSeats == null) purchasedSeats = new ArrayList<>();

        if (request.getSeats().isEmpty()) throw new IllegalArgumentException("Please select seats!");
        List<String> finalReservedSeats = reservedSeats;
        List<String> finalPurchasedSeats = purchasedSeats;
        boolean seatsAvailable = request.getSeats().stream()
                .noneMatch(seat -> finalReservedSeats.contains(seat) || finalPurchasedSeats.contains(seat));

        if (!seatsAvailable) throw new IllegalArgumentException("Seats are already reserved!");
        if (request.getType().equals(Type.RESERVATION)) {
            reservedSeats.addAll(request.getSeats());
            projection.setReservedSeats(reservedSeats);
        } else {
            purchasedSeats.addAll(request.getSeats());
            projection.setPurchasedSeats(purchasedSeats);
        }
        Reservation reservation = new Reservation(request.getSeats(), request.getDate(), request.getPrice(), request.getType(), user, projection);
        reservationRepository.save(reservation);
        projectionRepository.save(projection);
        String reservationDetails = "Movie: " + projection.getMovie().getName() + "\nDate: " + request.getDate() + "\nTime: " + projection.getTime().toString().substring(0, 5) + "\nVenue: " +
                projection.getVenue().getName() + ", " + projection.getVenue().getAddress() + "\nSeats: " + String.join(", ", request.getSeats());
        if (request.getType().equals(Type.RESERVATION)) return emailService.sendEmail(
                new EmailRequest(
                        user.getEmail(),
                        "Reservation Confirmation",
                        "Hi " + user.getFirstName() + " " + user.getLastName() + ", \n\nWe are pleased to confirm your reservation for the following details:\n\n" +
                                reservationDetails +
                                "\n\nPlease note that your reservation will expire if the tickets are not purchased at least one hour before the showtime. \nTo ensure your seats are secured, we recommend completing your purchase well in advance." +
                                "\n\nThank you for choosing us, we look forward to providing you with an enjoyable movie experience.\n" +
                                "\n -The Cinebh Team"));
        else {
            return emailService.sendEmail(
                    new EmailRequest(
                            user.getEmail(),
                            "Payment Confirmation",
                            "Hi " + user.getFirstName() + " " + user.getLastName() + ", \n\nWe are pleased to confirm your payment for the following details:\n\n" +
                                    reservationDetails +
                                    "\n\nThank you for choosing us, we look forward to providing you with an enjoyable movie experience.\n" +
                                    "\n -The Cinebh Team"));
        }
    }
}
