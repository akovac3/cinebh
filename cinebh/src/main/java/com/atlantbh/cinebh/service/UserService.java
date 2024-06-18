package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.User;
import com.atlantbh.cinebh.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User getUserData(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User with provided id not found!"));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByEmail(username).orElseThrow(() -> new ResourceNotFoundException("User with provided email not found!"));
    }
}
