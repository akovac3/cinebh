package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Type;
import com.atlantbh.cinebh.model.User;
import com.atlantbh.cinebh.request.PaymentRequest;
import com.atlantbh.cinebh.request.ReservationRequest;
import com.atlantbh.cinebh.response.PaymentResponse;
import com.atlantbh.cinebh.service.PaymentService;
import com.atlantbh.cinebh.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private PaymentService paymentService;

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
}
