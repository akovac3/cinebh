package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Reservation;
import com.atlantbh.cinebh.model.User;
import com.atlantbh.cinebh.request.PaymentRequest;
import com.atlantbh.cinebh.request.ReservationRequest;
import com.atlantbh.cinebh.response.NumberOfElementsResponse;
import com.atlantbh.cinebh.response.PaymentResponse;
import com.atlantbh.cinebh.service.JWTService;
import com.atlantbh.cinebh.service.PaymentService;
import com.atlantbh.cinebh.service.ReservationService;
import com.atlantbh.cinebh.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @GetMapping("/user")
    public ResponseEntity<List<Reservation>> getReservationsForUser(@RequestHeader("Authorization") String token) {
        String username = jwtService.getUsernameFromToken(token.replace("Bearer ", ""));
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(reservationService.getReservations(user));
    }

    @GetMapping("/count-elements")
    public ResponseEntity<NumberOfElementsResponse> getNumberOfElements(@RequestHeader("Authorization") String token) {
        String username = jwtService.getUsernameFromToken(token.replace("Bearer ", ""));
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(reservationService.getNumberOfElements(user));
    }

    @GetMapping("/user/upcoming-projections")
    public ResponseEntity<List<Reservation>> getUpcomingPurchasesForUser(@RequestHeader("Authorization") String token) {
        String username = jwtService.getUsernameFromToken(token.replace("Bearer ", ""));
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(reservationService.getUpcomingPurchases(user));
    }

    @GetMapping("/user/past-projections")
    public ResponseEntity<List<Reservation>> getPastPurchasesForUser(@RequestHeader("Authorization") String token) {
        String username = jwtService.getUsernameFromToken(token.replace("Bearer ", ""));
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(reservationService.getPastPurchases(user));
    }

    @GetMapping("/user/count")
    public ResponseEntity<Long> getReservationsNumber(@RequestHeader("Authorization") String token) {
        String username = jwtService.getUsernameFromToken(token.replace("Bearer ", ""));
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(reservationService.getReservationsNumber(user));
    }

    @PutMapping("/{id}/buy-ticket")
    public ResponseEntity<String> buyTicket(@PathVariable long id) {
        Reservation reservation = reservationService.findById(id);
        return ResponseEntity.ok(reservationService.makePurchase(reservation));
    }

    @PostMapping
    public ResponseEntity<String> createReservation(@RequestBody ReservationRequest request){
        User user;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication!=null && authentication.getPrincipal() instanceof UserDetails) {
            user = (User) authentication.getPrincipal();
        } else {
            throw new ResourceNotFoundException("Invalid token");
        }
        try {
            String response = reservationService.create(request, user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/create-payment-intent")
    public ResponseEntity<PaymentResponse> createPaymentIntent(@RequestBody PaymentRequest request){
        try {
            PaymentResponse response = paymentService.createPaymentIntent(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable long id, @RequestHeader("Authorization") String token){
        String username = jwtService.getUsernameFromToken(token.replace("Bearer ", ""));
        User user = userService.getUserByUsername(username);
        Reservation reservation = reservationService.findById(id);
        if(!user.equals(reservation.getUser())) ResponseEntity.badRequest().body("Error: Invalid user!");
        return ResponseEntity.ok(reservationService.cancelReservation(reservation));
    }
}
