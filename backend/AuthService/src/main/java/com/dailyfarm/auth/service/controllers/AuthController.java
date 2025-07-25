package com.dailyfarm.auth.service.controllers;

import com.dailyfarm.auth.service.clients.UserServiceClient;
import com.dailyfarm.auth.service.dtos.UserDTO;
import com.dailyfarm.auth.service.entities.User;
import com.dailyfarm.auth.service.exceptions.ApiException;
import com.dailyfarm.auth.service.payloads.JwtAuthRequest;
import com.dailyfarm.auth.service.payloads.JwtAuthResponse;
import com.dailyfarm.auth.service.security.JwtTokenHelper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserServiceClient userServiceClient;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper mapper;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest request) {
        if (request.getUsername() == null || request.getPassword() == null) {
            throw new ApiException("Username and password are required");
        }
        this.authenticate(request.getUsername(), request.getPassword());
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getUsername());
        String token = this.jwtTokenHelper.generateToken(userDetails);

        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(token);
        response.setUser(this.mapper.map(userDetails, UserDTO.class)); // Map to DTO
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void authenticate(String username, String password) {
        User user = this.userServiceClient.getUserByEmail(username);

        if (user.getStatus() != com.dailyfarm.auth.service.enums.UserStatus.ACTIVE) {
            throw new ApiException("User is not active");
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, password);

        try {
            this.authenticationManager.authenticate(authenticationToken);
        } catch (BadCredentialsException e) {
            throw new ApiException("Invalid username or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDto) {
        if (userDto.getEmail() == null || userDto.getPassword() == null) {
            throw new ApiException("Email and password are required");
        }
        // Map DTO to entity
        User user = mapper.map(userDto, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash
        // Set defaults if needed (role, status already handled in USER-SERVICE save)

        User registeredUser = this.userServiceClient.createUser(user);
        return new ResponseEntity<>(mapper.map(registeredUser, UserDTO.class), HttpStatus.CREATED);
    }
}