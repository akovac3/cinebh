package com.atlantbh.cinebh.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PasswordReset {
    @Id
    @Column(name = "reset_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long passwordResetId;
    private String email;
    private String resetCode;
    private String token;
    private LocalDateTime expiryTime;
    private Boolean valid;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
