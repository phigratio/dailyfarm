package com.dailyfarm.Farm.FarmService.controllers;

import com.dailyfarm.Farm.FarmService.entities.Farm;
import com.dailyfarm.Farm.FarmService.services.FarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/farms")
public class FarmController {

    @Autowired
    private FarmService farmService;

    @PostMapping
    public ResponseEntity<Farm> createFarm(@RequestBody Farm farm) {
        Farm createdFarm = farmService.createFarm(farm);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFarm);
    }

    @GetMapping("/{farmId}")
    public ResponseEntity<Farm> getFarmById(@PathVariable String farmId) {
        Farm farm = farmService.getFarmById(farmId);
        return ResponseEntity.ok(farm);
    }

    @GetMapping
    public ResponseEntity<List<Farm>> getAllFarms() {
        List<Farm> farms = farmService.getAllFarms();
        return ResponseEntity.ok(farms);
    }

    @PutMapping
    public ResponseEntity<Farm> updateFarm(@RequestBody Farm farm) {
        Farm updatedFarm = farmService.updateFarm(farm);
        return ResponseEntity.ok(updatedFarm);
    }

    @DeleteMapping("/{farmId}")
    public ResponseEntity<Void> deleteFarm(@PathVariable String farmId) {
        farmService.deleteFarm(farmId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<Farm>> getFarmsByOwnerId(@PathVariable String ownerId) {
        List<Farm> farms = farmService.getFarmsByOwnerId(ownerId);
        return ResponseEntity.ok(farms);
    }

    @GetMapping("/division/{division}")
    public ResponseEntity<List<Farm>> getFarmsByDivision(@PathVariable String division) {
        List<Farm> farms = farmService.getFarmsByDivision(division);
        return ResponseEntity.ok(farms);
    }

    @GetMapping("/location/{division}/{district}")
    public ResponseEntity<List<Farm>> getFarmsByDivisionAndDistrict(
            @PathVariable String division,
            @PathVariable String district) {
        List<Farm> farms = farmService.getFarmsByDivisionAndDistrict(division, district);
        return ResponseEntity.ok(farms);
    }
}