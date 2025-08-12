package com.dailyfarm.user.service.UserService.external.services;

import com.dailyfarm.user.service.UserService.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "USER-SERVICE")
public interface UserServiceClient {

    @GetMapping("/users/email/{email}")
    ResponseEntity<UserDTO> getUserByEmail(@PathVariable("email") String email);

    @PostMapping("/users")
    ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDto);
}
