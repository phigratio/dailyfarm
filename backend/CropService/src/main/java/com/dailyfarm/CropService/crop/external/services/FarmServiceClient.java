package com.dailyfarm.CropService.crop.external.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "FARM-SERVICE") // Use application.properties for url, e.g., http://localhost:8081
public interface FarmServiceClient {

    @GetMapping("/farms/{farmId}")
    Farm getFarmById(@PathVariable("farmId") String farmId);

    @GetMapping("/farms/{farmId}/plots/{plotId}")
    Plot getPlotById(@PathVariable("farmId") String farmId, @PathVariable("plotId") String plotId);
}
