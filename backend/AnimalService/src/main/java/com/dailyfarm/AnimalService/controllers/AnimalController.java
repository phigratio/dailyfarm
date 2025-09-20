package com.dailyfarm.AnimalService.controllers;

import com.dailyfarm.AnimalService.dtos.AnimalDTO;
import com.dailyfarm.AnimalService.services.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/animals")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @PostMapping
    public ResponseEntity<List<AnimalDTO>> createAnimals(@RequestBody AnimalDTO animalDTO) {
        int count = (animalDTO.getNumber() > 0) ? animalDTO.getNumber() : 1;
        List<AnimalDTO> createdAnimals = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            createdAnimals.add(animalService.createAnimal(animalDTO));
        }
        return ResponseEntity.ok(createdAnimals);
    }


    @GetMapping("/{id}")
    public ResponseEntity<AnimalDTO> getAnimalById(@PathVariable("id") String id) {
        Optional<AnimalDTO> animal = animalService.getAnimalById(id);
        return animal.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<AnimalDTO>> getAllAnimals() {
        List<AnimalDTO> animals = animalService.getAllAnimals();
        return ResponseEntity.ok(animals);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalDTO> updateAnimal(@PathVariable("id") String id, @RequestBody AnimalDTO animalDTO) {
        AnimalDTO updated = animalService.updateAnimal(id, animalDTO);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable("id") String id) {
        animalService.deleteAnimal(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/plot/{plotId}")
    public ResponseEntity<List<AnimalDTO>> getByPlotId(@PathVariable String plotId) {
        List<AnimalDTO> animals = animalService.findByPlotId(plotId);
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/plot/{plotId}/farm/{farmId}")
    public ResponseEntity<List<AnimalDTO>> getByPlotIdAndFarmId(@PathVariable String plotId, @PathVariable String farmId) {
        List<AnimalDTO> animals = animalService.findByPlotIdAndFarmId(plotId, farmId);
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/plot/{plotId}/farm/{farmId}/gender/{gender}")
    public ResponseEntity<List<AnimalDTO>> getByPlotIdAndFarmIdAndGender(@PathVariable String plotId,
                                                                         @PathVariable String farmId,
                                                                         @PathVariable String gender) {
        List<AnimalDTO> animals = animalService.findByPlotIdAndFarmIdAndGender(plotId, farmId, gender);
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/farm/{farmId}")
    public ResponseEntity<List<AnimalDTO>> getByFarmId(@PathVariable String farmId) {
        List<AnimalDTO> animals = animalService.findByFarmId(farmId);
        return ResponseEntity.ok(animals);
    }
}
