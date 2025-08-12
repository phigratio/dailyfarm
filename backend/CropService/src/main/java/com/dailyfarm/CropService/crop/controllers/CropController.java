package com.dailyfarm.CropService.crop.controllers;

import com.dailyfarm.CropService.crop.entities.Crop;
import com.dailyfarm.CropService.crop.services.CropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/crops")
public class CropController {

    @Autowired
    private CropService cropService;

    @PostMapping
    public ResponseEntity<Crop> createCrop(@RequestBody Crop crop) {
        Crop savedCrop = cropService.createCrop(crop);
        return new ResponseEntity<>(savedCrop, HttpStatus.CREATED);
    }

    @GetMapping("/farm/{farmId}")
    public ResponseEntity<List<Crop>> getCropsByFarmId(@PathVariable String farmId) {
        List<Crop> crops = cropService.getCropsByFarmId(farmId);
        return new ResponseEntity<>(crops, HttpStatus.OK);
    }

    // Additional endpoints: GET /crops/{id}, PUT /crops/{id}, DELETE /crops/{id}
}
