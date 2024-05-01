package com.atlantbh.cinebh.request;

import lombok.Data;

@Data
public class RefreshTokenRequest {
    private String refreshToken;
    private String token;
}
