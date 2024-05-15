package com.atlantbh.cinebh.response;

import com.atlantbh.cinebh.model.Role;
import lombok.Data;

@Data
public class JWTAuthenticationResponse {
    private String token;
    private String refreshToken;
    private String firstName;
    private String lastName;
    private Role role;
}
