package com.dailyfarm.user.service.UserService.external.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="FARMSERVICE")
public interface FarmService {

    @GetMapping("/farms/{farmId}")
    Farm getFarm(@PathVariable String farmId);
}
