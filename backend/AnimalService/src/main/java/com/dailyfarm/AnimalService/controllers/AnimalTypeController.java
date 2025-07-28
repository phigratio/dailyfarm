package com.dailyfarm.AnimalService.controllers;

import com.dailyfarm.AnimalService.dtos.AnimalTypeDTO;
import com.dailyfarm.AnimalService.entitites.AnimalType;
import com.dailyfarm.AnimalService.services.AnimalTypeService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/animal-types")
@Validated
@Slf4j
public class AnimalTypeController {

    @Autowired
    private AnimalTypeService animalTypeService;  // Assume implementation similar to AnimalService

    @Autowired
    private ModelMapper mapper;

    @PostMapping
    public ResponseEntity<AnimalTypeDTO> createAnimalType(@Valid @RequestBody AnimalTypeDTO DTO) {
        AnimalType animalType = mapper.map(DTO, AnimalType.class);
        AnimalType created = animalTypeService.createAnimalType(animalType);
        return new ResponseEntity<>(mapper.map(created, AnimalTypeDTO.class), HttpStatus.CREATED);
    }

    // Add similar GET, PUT, DELETE methods as in AnimalController
}