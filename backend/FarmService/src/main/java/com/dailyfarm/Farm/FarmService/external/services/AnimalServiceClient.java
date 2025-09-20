package com.dailyfarm.Farm.FarmService.external.services;

import com.dailyfarm.Farm.FarmService.dto.AnimalDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@FeignClient(name = "ANIMAL-SERVICE")
public interface AnimalServiceClient {

    @GetMapping("/api/animals/farm/{farmId}")
    ResponseEntity<List<AnimalDTO>> getAnimalsByFarmId(@PathVariable("farmId") String farmId);

    @GetMapping("/api/animals/{animalId}")
    ResponseEntity<AnimalDTO> getAnimalById(@PathVariable("animalId") String animalId);

    @PostMapping("/api/animals")
    ResponseEntity<AnimalDTO> createAnimal(@Valid @RequestBody AnimalDTO animalDTO);

    @GetMapping("/api/animals/plot/{plotId}")
    ResponseEntity<List<AnimalDTO>> getAnimalsByPlotId(@PathVariable("plotId") String plotId);

    @GetMapping("/api/animals/plot/{plotId}/farm/{farmId}")
    ResponseEntity<List<AnimalDTO>> getAnimalsByPlotIdAndFarmId(@PathVariable("plotId") String plotId,
                                                                @PathVariable("farmId") String farmId);

    @GetMapping("/api/animals/plot/{plotId}/farm/{farmId}/gender/{gender}")
    ResponseEntity<List<AnimalDTO>> getAnimalsByPlotIdAndFarmIdAndGender(@PathVariable("plotId") String plotId,
                                                                         @PathVariable("farmId") String farmId,
                                                                         @PathVariable("gender") String gender);
}
