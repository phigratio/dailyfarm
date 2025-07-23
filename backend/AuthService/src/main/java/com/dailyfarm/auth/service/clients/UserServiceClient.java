package com.dailyfarm.auth.service.clients;

import com.dailyfarm.auth.service.entities.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "USER-SERVICE")
public interface UserServiceClient {

    @GetMapping("/users/email/{email}")
    User getUserByEmail(@PathVariable String email);

    @PostMapping("/users")
    User createUser(@RequestBody User user);
}