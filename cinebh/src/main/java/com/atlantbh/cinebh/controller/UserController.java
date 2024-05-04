package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.model.User;
import com.atlantbh.cinebh.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/details")
    @PreAuthorize("hasAuthority('USER)")
    public ResponseEntity<Object> getUserDetails() {
        return ResponseEntity.ok(userService.getUserByUsername(getUserData().getUsername()));
    }

    public User getUserData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return (User) authentication.getPrincipal();
        }
        return null;
    }
}
