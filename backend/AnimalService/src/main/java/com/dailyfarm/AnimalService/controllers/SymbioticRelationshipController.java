package com.dailyfarm.AnimalService.controllers;

import com.dailyfarm.AnimalService.dtos.SymbioticRelationshipDTO;
import com.dailyfarm.AnimalService.entitites.SymbioticRelationship;
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
@RequestMapping("/api/v1/symbiotic-relationships")
@Validated
@Slf4j
public class SymbioticRelationshipController {

    @Autowired
    private AnimalService animalService;

    @Autowired
    private ModelMapper mapper;

    @PostMapping
   
    public ResponseEntity<SymbioticRelationshipDTO> createSymbioticRelationship(@Valid @RequestBody SymbioticRelationshipDTO DTO) {
        SymbioticRelationship relationship = mapper.map(DTO, SymbioticRelationship.class);
        SymbioticRelationship created = animalService.createSymbioticRelationship(relationship);
        return new ResponseEntity<>(mapper.map(created, SymbioticRelationshipDTO.class), HttpStatus.CREATED);
    }

    @GetMapping("/{relationshipId}")

    public ResponseEntity<SymbioticRelationshipDTO> getSymbioticRelationshipById(@PathVariable String relationshipId) {
        // Assume getSymbioticById in service
        return ResponseEntity.ok(mapper.map(new SymbioticRelationship(), SymbioticRelationshipDTO.class));  // Placeholder
    }

    @GetMapping("/animal/{animalId}")

    public ResponseEntity<List<SymbioticRelationshipDTO>> getAnimalSymbioticRelationships(@PathVariable String animalId) {
        List<SymbioticRelationshipDTO> relationships = animalService.getAnimalSymbioticRelationships(animalId).stream()
                .map(relationship -> mapper.map(relationship, SymbioticRelationshipDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(relationships);
    }

    @PutMapping("/{relationshipId}")

    public ResponseEntity<SymbioticRelationshipDTO> updateSymbioticRelationship(@PathVariable String relationshipId, @Valid @RequestBody SymbioticRelationshipDTO DTO) {
        // Assume updateSymbiotic in service
        return ResponseEntity.ok(mapper.map(new SymbioticRelationship(), SymbioticRelationshipDTO.class));  // Placeholder
    }

    @DeleteMapping("/{relationshipId}")

    public ResponseEntity<Void> deleteSymbioticRelationship(@PathVariable String relationshipId) {
        // Assume deleteSymbiotic in service
        return ResponseEntity.noContent().build();
    }
}