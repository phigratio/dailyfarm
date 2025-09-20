package com.dailyfarm.Farm.FarmService.external.services;


import com.dailyfarm.Farm.FarmService.dto.CropDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "CROP-SERVICE")
public interface CropServiceClient {

    @GetMapping("/crops/farm/{farmId}")
    List<CropDTO> getCropsByFarmId(@PathVariable("farmId") String farmId);

    @GetMapping("/crops/plot/{plotId}")
    List<CropDTO> getCropsByPlotId(@PathVariable("plotId") String plotId);

    @GetMapping("/crops/owner/{ownerId}")
    List<CropDTO> getCropsByOwnerId(@PathVariable("ownerId") String ownerId);

    @GetMapping("/crops/{cropId}")
    CropDTO getCropById(@PathVariable("cropId") String cropId);
    @PostMapping("/crops")
    CropDTO createCrop(@RequestBody CropDTO cropDTO);
}
