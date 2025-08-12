package com.dailyfarm.Farm.FarmService.external.services;

import com.dailyfarm.Farm.FarmService.dto.CropDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "CROP-SERVICE")
public interface CropServiceClient {
    @GetMapping("/crops/farm/{farmId}")
    List<CropDTO> getCropsByFarmId(@PathVariable("farmId") String farmId);
}
