package com.dailyfarm.Farm.FarmService.controllers;

import com.dailyfarm.Farm.FarmService.entities.Plot;
import com.dailyfarm.Farm.FarmService.services.PlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plots")
public class PlotController {

    @Autowired
    private PlotService plotService;

    // Create or update a plot
    @PostMapping
    public ResponseEntity<Plot> createOrUpdatePlot(@RequestBody Plot plot) {
        Plot savedPlot = plotService.savePlot(plot);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPlot);
    }

    // Get a plot by ID
    @GetMapping("/{plotId}")
    public ResponseEntity<Plot> getPlotById(@PathVariable String plotId) {
        Plot plot = plotService.getPlotById(plotId);
        return ResponseEntity.ok(plot);
    }

    // Get all plots for a specific farm
    @GetMapping("/farm/{farmId}")
    public ResponseEntity<List<Plot>> getPlotsByFarmId(@PathVariable String farmId) {
        List<Plot> plots = plotService.getPlotsByFarmId(farmId);
        return ResponseEntity.ok(plots);
    }

    // Get active plots for a specific farm
    @GetMapping("/farm/{farmId}/active")
    public ResponseEntity<List<Plot>> getActivePlotsByFarmId(@PathVariable String farmId) {
        List<Plot> plots = plotService.getActivePlotsByFarmId(farmId);
        return ResponseEntity.ok(plots);
    }

    // Delete a plot by ID
    @DeleteMapping("/{plotId}")
    public ResponseEntity<Void> deletePlot(@PathVariable String plotId) {
        plotService.deletePlot(plotId);
        return ResponseEntity.noContent().build();
    }
}
