package com.dailyfarm.AnimalService.controllers;

import com.dailyfarm.AnimalService.dtos.AnimalDTO;
import com.dailyfarm.AnimalService.dtos.AnimalHealthDTO;
import com.dailyfarm.AnimalService.dtos.AnimalProductivityDTO;
import com.dailyfarm.AnimalService.dtos.SymbioticRelationshipDTO;
import com.dailyfarm.AnimalService.entitites.Animal;
import com.dailyfarm.AnimalService.entitites.SymbioticRelationship;
import com.dailyfarm.AnimalService.enums.AnimalCategory;
import com.dailyfarm.AnimalService.enums.AnimalStatus;
import com.dailyfarm.AnimalService.services.AnimalService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/animals")

@Validated
@Slf4j
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @Autowired
    private ModelMapper mapper;

    @PostMapping
    public ResponseEntity<AnimalDTO> createAnimal(@Valid @RequestBody AnimalDTO animalDTO) {
        Animal animal = mapper.map(animalDTO, Animal.class);
        Animal created = animalService.createAnimal(animal);
        return new ResponseEntity<>(mapper.map(created, AnimalDTO.class), HttpStatus.CREATED);
    }

    @GetMapping("/{animalId}")
    public ResponseEntity<AnimalDTO> getAnimalById(@PathVariable String animalId) {
        return animalService.getAnimalById(animalId)
                .map(animal -> ResponseEntity.ok(mapper.map(animal, AnimalDTO.class)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<AnimalDTO>> getAllAnimals() {
        List<AnimalDTO> animals = animalService.getAllAnimals().stream()
                .map(animal -> mapper.map(animal, AnimalDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(animals);
    }

    @PutMapping("/{animalId}")
    public ResponseEntity<AnimalDTO> updateAnimal(@PathVariable String animalId,
                                                  @Valid @RequestBody AnimalDTO animalDTO) {
        Animal animal = mapper.map(animalDTO, Animal.class);
        Animal updated = animalService.updateAnimal(animalId, animal);
        return ResponseEntity.ok(mapper.map(updated, AnimalDTO.class));
    }

    @DeleteMapping("/{animalId}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable String animalId) {
        animalService.deleteAnimal(animalId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/farm/{farmId}")
    public ResponseEntity<List<AnimalDTO>> getAnimalsByFarm(@PathVariable String farmId) {
        List<AnimalDTO> animals = animalService.getAnimalsByFarmId(farmId).stream()
                .map(animal -> mapper.map(animal, AnimalDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<AnimalDTO>> getAnimalsByOwner(@PathVariable String ownerId) {
        List<AnimalDTO> animals = animalService.getAnimalsByOwnerId(ownerId).stream()
                .map(animal -> mapper.map(animal, AnimalDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<AnimalDTO>> getAnimalsByCategory(@PathVariable AnimalCategory category) {
        List<AnimalDTO> animals = animalService.getAnimalsByCategory(category).stream()
                .map(animal -> mapper.map(animal, AnimalDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AnimalDTO>> getAnimalsByStatus(@PathVariable AnimalStatus status) {
        List<AnimalDTO> animals = animalService.getAnimalsByStatus(status).stream()
                .map(animal -> mapper.map(animal, AnimalDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/location")
    public ResponseEntity<List<AnimalDTO>> getAnimalsByLocation(
            @RequestParam String division,
            @RequestParam String district) {
        List<AnimalDTO> animals = animalService.getAnimalsByLocation(division, district).stream()
                .map(animal -> mapper.map(animal, AnimalDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/radius")
    public ResponseEntity<List<AnimalDTO>> getAnimalsInRadius(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam Double radiusKm) {
        List<AnimalDTO> animals = animalService.getAnimalsInRadius(latitude, longitude, radiusKm).stream()
                .map(animal -> mapper.map(animal, AnimalDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/{animalId}/health")
    public ResponseEntity<List<AnimalHealthDTO>> getAnimalHealthHistory(@PathVariable String animalId) {
        List<AnimalHealthDTO> healthRecords = animalService.getAnimalHealthHistory(animalId).stream()
                .map(record -> mapper.map(record, AnimalHealthDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(healthRecords);
    }

    @GetMapping("/{animalId}/productivity")
    public ResponseEntity<List<AnimalProductivityDTO>> getAnimalProductivityRecords(@PathVariable String animalId) {
        List<AnimalProductivityDTO> productivityRecords = animalService.getAnimalProductivityRecords(animalId).stream()
                .map(record -> mapper.map(record, AnimalProductivityDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(productivityRecords);
    }

    @GetMapping("/{animalId}/symbiotic-relationships")
    public ResponseEntity<List<SymbioticRelationshipDTO>> getAnimalSymbioticRelationships(@PathVariable String animalId) {
        List<SymbioticRelationshipDTO> relationships = animalService.getAnimalSymbioticRelationships(animalId).stream()
                .map(relationship -> mapper.map(relationship, SymbioticRelationshipDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(relationships);
    }

    @PostMapping("/symbiotic-relationships")
    public ResponseEntity<SymbioticRelationshipDTO> createSymbioticRelationship(
            @Valid @RequestBody SymbioticRelationshipDTO DTO) {
        SymbioticRelationship relationship = mapper.map(DTO, SymbioticRelationship.class);
        SymbioticRelationship created = animalService.createSymbioticRelationship(relationship);
        return new ResponseEntity<>(mapper.map(created, SymbioticRelationshipDTO.class), HttpStatus.CREATED);
    }

    @GetMapping("/{animalId}/productivity/calculate")
    public ResponseEntity<Double> calculateAnimalProductivity(
            @PathVariable String animalId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        Double productivity = animalService.calculateAnimalProductivity(animalId, startDate, endDate);
        return ResponseEntity.ok(productivity);
    }

    @GetMapping("/{animalId}/feed-efficiency")

    public ResponseEntity<Double> calculateFeedEfficiency(
            @PathVariable String animalId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        Double efficiency = animalService.calculateFeedEfficiency(animalId, startDate, endDate);
        return ResponseEntity.ok(efficiency);
    }

    @GetMapping("/farm/{farmId}/high-performing")

    public ResponseEntity<List<AnimalDTO>> getHighPerformingAnimals(
            @PathVariable String farmId,
            @RequestParam(defaultValue = "10") Integer topN) {
        List<AnimalDTO> animals = animalService.getHighPerformingAnimals(farmId, topN).stream()
                .map(animal -> mapper.map(animal, AnimalDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/farm/{farmId}/attention-needed")

    public ResponseEntity<List<AnimalDTO>> getAnimalsNeedingAttention(@PathVariable String farmId) {
        List<AnimalDTO> animals = animalService.getAnimalsNeedingAttention(farmId).stream()
                .map(animal -> mapper.map(animal, AnimalDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/{animalId}/can-breed")
    public ResponseEntity<Boolean> canAnimalBreed(@PathVariable String animalId) {
        boolean canBreed = animalService.canAnimalBreed(animalId);
        return ResponseEntity.ok(canBreed);
    }

    @GetMapping("/{animalId}/breeding-partners")
    public ResponseEntity<List<AnimalDTO>> getSuitableBreedingPartners(@PathVariable String animalId) {
        List<AnimalDTO> partners = animalService.getSuitableBreedingPartners(animalId).stream()
                .map(animal -> mapper.map(animal, AnimalDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(partners);
    }

    @GetMapping("/{animalId}/estimated-value")
    public ResponseEntity<Double> estimateAnimalValue(@PathVariable String animalId) {
        Double value = animalService.estimateAnimalValue(animalId);
        return ResponseEntity.ok(value);
    }

    @GetMapping("/{animalId}/vaccination-recommendations")
    public ResponseEntity<List<String>> getRecommendedVaccinations(@PathVariable String animalId) {
        List<String> recommendations = animalService.getRecommendedVaccinations(animalId);
        return ResponseEntity.ok(recommendations);
    }
}