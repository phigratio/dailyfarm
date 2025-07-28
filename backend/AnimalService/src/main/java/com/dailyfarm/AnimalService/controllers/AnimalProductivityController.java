package com.dailyfarm.AnimalService.controllers;
import com.dailyfarm.AnimalService.dtos.AnimalProductivityDTO;
import com.dailyfarm.AnimalService.entitites.AnimalProductivity;
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
@RequestMapping("/api/v1/animal-productivity")
@Validated
@Slf4j
public class AnimalProductivityController {

    @Autowired
    private AnimalService animalService;

    @Autowired
    private ModelMapper mapper;

    @PostMapping
    public ResponseEntity<AnimalProductivityDTO> createAnimalProductivity(@Valid @RequestBody AnimalProductivityDTO DTO) {
        AnimalProductivity productivity = mapper.map(DTO, AnimalProductivity.class);
        // Assume createProductivity in service
        return new ResponseEntity<>(mapper.map(productivity, AnimalProductivityDTO.class), HttpStatus.CREATED);
    }

    @GetMapping("/{productivityId}")

    public ResponseEntity<AnimalProductivityDTO> getAnimalProductivityById(@PathVariable String productivityId) {
        // Assume getProductivityById in service
        return ResponseEntity.ok(mapper.map(new AnimalProductivity(), AnimalProductivityDTO.class));  // Placeholder
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<AnimalProductivityDTO>> getAnimalProductivityRecords(@PathVariable String animalId) {
        List<AnimalProductivityDTO> records = animalService.getAnimalProductivityRecords(animalId).stream()
                .map(record -> mapper.map(record, AnimalProductivityDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(records);
    }

    @PutMapping("/{productivityId}")
    public ResponseEntity<AnimalProductivityDTO> updateAnimalProductivity(@PathVariable String productivityId, @Valid @RequestBody AnimalProductivityDTO DTO) {
        // Assume updateProductivity in service
        return ResponseEntity.ok(mapper.map(new AnimalProductivity(), AnimalProductivityDTO.class));  // Placeholder
    }

    @DeleteMapping("/{productivityId}")
    public ResponseEntity<Void> deleteAnimalProductivity(@PathVariable String productivityId) {
        // Assume deleteProductivity in service
        return ResponseEntity.noContent().build();
    }
}
