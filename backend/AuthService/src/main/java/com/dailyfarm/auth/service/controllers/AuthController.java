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

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

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
        if (request.getEmail() == null || request.getPassword() == null) {
            throw new ApiException("Username and password are required");
        }

        // Authenticate user credentials
        this.authenticate(request.getEmail(), request.getPassword());

        // Load UserDetails for JWT generation
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.jwtTokenHelper.generateToken(userDetails);

        // Fetch full User entity from your user service client (so you can map to DTO properly)
        User user = this.userServiceClient.getUserByEmail(request.getEmail());
        UserDTO userDTO = this.mapper.map(user, UserDTO.class);

        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(token);
        response.setUser(userDTO);

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
            throw new ApiException("Invalid email or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody UserDTO userDto) {
        if (userDto.getEmail() == null || userDto.getPassword() == null) {
            throw new ApiException("Email and password are required");
        }
        User alreadyExistUser=this.userServiceClient.getUserByEmail(userDto.getEmail());
        if(alreadyExistUser!=null){
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Email already exists, please use another email");
            return ResponseEntity.ok().body(errorResponse);
        }
        User user = mapper.map(userDto, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User registeredUser = this.userServiceClient.createUser(user);
        return new ResponseEntity<>(mapper.map(registeredUser, UserDTO.class), HttpStatus.CREATED);

    }
}