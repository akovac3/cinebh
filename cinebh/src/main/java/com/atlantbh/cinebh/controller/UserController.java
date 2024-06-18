package com.atlantbh.cinebh.controller;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.City;
import com.atlantbh.cinebh.model.User;
import com.atlantbh.cinebh.repository.CityRepository;
import com.atlantbh.cinebh.request.ChangePasswordRequest;
import com.atlantbh.cinebh.request.UserRequest;
import com.atlantbh.cinebh.response.UserResponse;
import com.atlantbh.cinebh.service.AmazonService;
import com.atlantbh.cinebh.service.JWTService;
import com.atlantbh.cinebh.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JWTService jwtService;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private AmazonService amazonClient;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/details")
    public ResponseEntity<UserResponse> getLoggedInUser(@RequestHeader("Authorization") String token) {
        String username = jwtService.getUsernameFromToken(token.replace("Bearer ", ""));
        User user = userService.getUserByUsername(username);
        UserResponse response = new UserResponse(user.getUserId(), user.getFirstName(), user.getLastName(), user.getPhone(), user.getPhoto(), user.getEmail(), user.getCity());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/change-info")
    public ResponseEntity<String> changeUserInfo(@RequestHeader("Authorization") String token, @RequestPart(value = "photo", required = false) MultipartFile photo, @Validated @RequestPart(value = "user", required = false) UserRequest userRequest) {
        String username = jwtService.getUsernameFromToken(token.replace("Bearer ", ""));
        User user = userService.getUserByUsername(username);
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setEmail(userRequest.getEmail());
        user.setPhone(userRequest.getPhone());
        City city = cityRepository.findById(userRequest.getCity()).orElseThrow(() -> new ResourceNotFoundException("City id doesn't exist!"));
        user.setCity(city);
        if(photo != null) {
            if(user.getPhoto() != null) amazonClient.deleteFileFromS3Bucket(user.getPhoto());
            user.setPhoto(amazonClient.uploadFile(photo));
        }
        userService.save(user);
        return ResponseEntity.ok("User details successfully saved!");
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestHeader("Authorization") String token, @RequestBody ChangePasswordRequest changePasswordRequest) {
        String username = jwtService.getUsernameFromToken(token.replace("Bearer ", ""));
        User user = userService.getUserByUsername(username);

        if(passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())){
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
            userService.save(user);
            return ResponseEntity.ok("Password successfully changed!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong old password");
        }
    }

    @PutMapping("/deactivate-account")
    public ResponseEntity<String> deactivate(@RequestHeader("Authorization") String token) {
        String username = jwtService.getUsernameFromToken(token.replace("Bearer ", ""));
        User user = userService.getUserByUsername(username);

        user.setSoftDelete(true);
        userService.save(user);
        return ResponseEntity.ok("User deactivated!");
    }
}
