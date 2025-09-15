package com.dailyfarm.user.service.UserService.external.services;

import com.dailyfarm.user.service.UserService.dto.FarmDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "FARM-SERVICE")
public interface FarmServiceClient {

    @GetMapping("/farms/owner/{ownerId}")
    ResponseEntity<List<FarmDTO>> getFarmsByOwnerId(@PathVariable("ownerId") String ownerId);

    @GetMapping("/farms/{farmId}")
    ResponseEntity<FarmDTO> getFarmById(@PathVariable("farmId") String farmId);

    @PostMapping("/farms")
    ResponseEntity<FarmDTO> createFarm(@RequestBody FarmDTO farm);
}