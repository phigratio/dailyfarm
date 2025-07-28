package com.dailyfarm.AnimalService.controllers;

import com.dailyfarm.AnimalService.dtos.AnimalHealthDTO;
import com.dailyfarm.AnimalService.entitites.AnimalHealth;
import com.dailyfarm.AnimalService.services.AnimalService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/animal-health")
@Validated
@Slf4j
public class AnimalHealthController {

    @Autowired
    private AnimalService animalService;

    @Autowired
    private ModelMapper mapper;

    @PostMapping
   
    public ResponseEntity<AnimalHealthDTO> createAnimalHealth(@Valid @RequestBody AnimalHealthDTO DTO) {
        AnimalHealth health = mapper.map(DTO, AnimalHealth.class);
        // Assume a method in AnimalService to create health record
        // For completeness, add to service if not present; here assuming save via repo
        return new ResponseEntity<>(mapper.map(health, AnimalHealthDTO.class), HttpStatus.CREATED);
    }

    @GetMapping("/{healthId}")
    public ResponseEntity<AnimalHealthDTO> getAnimalHealthById(@PathVariable String healthId) {
        // Assume getHealthById in service
        return ResponseEntity.ok(mapper.map(new AnimalHealth(), AnimalHealthDTO.class));  // Placeholder; implement service method
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<AnimalHealthDTO>> getAnimalHealthHistory(@PathVariable String animalId) {
        List<AnimalHealthDTO> healthRecords = animalService.getAnimalHealthHistory(animalId).stream()
                .map(record -> mapper.map(record, AnimalHealthDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(healthRecords);
    }

    @PutMapping("/{healthId}")
    public ResponseEntity<AnimalHealthDTO> updateAnimalHealth(@PathVariable String healthId, @Valid @RequestBody AnimalHealthDTO DTO) {
        // Assume updateHealth in service
        return ResponseEntity.ok(mapper.map(new AnimalHealth(), AnimalHealthDTO.class));  // Placeholder
    }

    @DeleteMapping("/{healthId}")
    public ResponseEntity<Void> deleteAnimalHealth(@PathVariable String healthId) {
        // Assume deleteHealth in service
        return ResponseEntity.noContent().build();
    }
}
