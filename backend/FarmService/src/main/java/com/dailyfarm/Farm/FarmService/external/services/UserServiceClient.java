package com.dailyfarm.Farm.FarmService.external.services;

import com.dailyfarm.Farm.FarmService.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "USER-SERVICE")
public interface UserServiceClient {

    @GetMapping("/users/{userId}")
    ResponseEntity<UserDTO> getUser(@PathVariable("userId") String userId);
}
