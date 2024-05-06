package com.atlantbh.cinebh.response;

import lombok.Data;

@Data
public class JWTAuthenticationResponse {
    private String token;
    private String refreshToken;
    private String firstName;
    private String lastName;
}
