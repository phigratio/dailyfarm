package com.dailyfarm.user.service.UserService.external.services;

import com.dailyfarm.user.service.UserService.dto.FarmDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "FARMSERVICE", url = "${farm.service.url:http://localhost:9091}")
public interface FarmServiceClient {

    @GetMapping("/farms/owner/{ownerId}")
    ResponseEntity<List<FarmDto>> getFarmsByOwnerId(@PathVariable("ownerId") String ownerId);

    @GetMapping("/farms/{farmId}")
    ResponseEntity<FarmDto> getFarmById(@PathVariable("farmId") String farmId);
}