package com.atlantbh.cinebh.repository;

import com.atlantbh.cinebh.model.Token;
import com.atlantbh.cinebh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {
    @Query("SELECT t FROM Token t WHERE t.user=?1 AND t.loggedOut=FALSE")
    List<Token> findAllTokensByUser(User user);

    Optional<Token> findByToken(String token);
}
