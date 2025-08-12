package com.dailyfarm.Farm.FarmService.external.services;

import com.dailyfarm.Farm.FarmService.dto.FarmDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "FARM-SERVICE")
public interface FarmServiceClient {

    @GetMapping("/farms/{farmId}")
    FarmDTO getFarmById(@PathVariable("farmId") String farmId);

}
