package com.dailyfarm.CropService.crop.controllers;

import com.dailyfarm.CropService.crop.dto.CropDTO;
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

    // Create a new crop
    @PostMapping
    public ResponseEntity<CropDTO> createCrop(@RequestBody CropDTO cropDTO) {
        CropDTO savedCrop = cropService.createCrop(cropDTO);
        return new ResponseEntity<>(savedCrop, HttpStatus.CREATED);
    }

    // Get all crops by farm ID
    @GetMapping("/farm/{farmId}")
    public ResponseEntity<List<CropDTO>> getCropsByFarmId(@PathVariable String farmId) {
        List<CropDTO> crops = cropService.getCropsByFarmId(farmId);
        return new ResponseEntity<>(crops, HttpStatus.OK);
    }

    // Get crop by its ID
    @GetMapping("/{id}")
    public ResponseEntity<CropDTO> getCropById(@PathVariable String id) {
        CropDTO crop = cropService.getCropById(id);
        if (crop != null) {
            return new ResponseEntity<>(crop, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update crop by ID
    @PutMapping("/{id}")
    public ResponseEntity<CropDTO> updateCrop(@PathVariable String id, @RequestBody CropDTO cropDTO) {
        CropDTO updatedCrop = cropService.updateCrop(id, cropDTO);
        if (updatedCrop != null) {
            return new ResponseEntity<>(updatedCrop, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete crop by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCrop(@PathVariable String id) {
        boolean deleted = cropService.deleteCrop(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get all crops by plot ID
    @GetMapping("/plot/{plotId}")
    public ResponseEntity<List<CropDTO>> getCropsByPlotId(@PathVariable String plotId) {
        List<CropDTO> crops = cropService.getCropsByPlotId(plotId);
        return new ResponseEntity<>(crops, HttpStatus.OK);
    }
}

