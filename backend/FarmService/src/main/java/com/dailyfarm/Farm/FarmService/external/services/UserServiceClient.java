package com.dailyfarm.Farm.FarmService.external.services;

import com.dailyfarm.Farm.FarmService.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "USER-SERVICE", url = "${user.service.url:http://localhost:8080}")
public interface UserServiceClient {

    @GetMapping("/users/{userId}")
    ResponseEntity<UserDto> getUser(@PathVariable("userId") String userId);
}