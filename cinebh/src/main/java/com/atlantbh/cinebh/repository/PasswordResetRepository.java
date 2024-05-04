package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.PasswordReset;
import com.atlantbh.cinebh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PasswordResetRepository extends JpaRepository<PasswordReset, Long> {
    @Query("SELECT pr FROM PasswordReset pr WHERE pr.user=?1 AND pr.valid=TRUE")
    List<PasswordReset> findAllPasswordResetsForUser(User user);

    Optional<PasswordReset> findByEmailAndToken(String email, String token);

    Optional<PasswordReset> findByEmail(String email);
}
