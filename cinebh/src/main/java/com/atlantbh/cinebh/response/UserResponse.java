package com.atlantbh.cinebh.response;

import com.atlantbh.cinebh.model.City;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Long userId;
    private String firstName;
    private String lastName;
    private String phone;
    private String photo;
    private String email;
    private City city;
}
