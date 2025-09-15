package com.dailyfarm.Farm.FarmService.controllers;

import com.dailyfarm.Farm.FarmService.entities.Plot;
import com.dailyfarm.Farm.FarmService.enums.PlotStatus;
import com.dailyfarm.Farm.FarmService.services.PlotService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/farms/plots")
public class PlotController {

    @Autowired
    private PlotService plotService;

    @PostMapping
    public ResponseEntity<Plot> createPlot(@Valid @RequestBody Plot plot) {
        Plot created = plotService.createPlot(plot);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{plotId}")
    public ResponseEntity<Plot> updatePlot(@PathVariable String plotId, @Valid @RequestBody Plot plot) {
        System.out.println(plot.getWaterPh());
        Plot updated = plotService.updatePlot(plotId, plot);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{plotId}")
    public ResponseEntity<Void> deletePlot(@PathVariable String plotId) {
        plotService.deletePlot(plotId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Plot>> getAllPlots() {
        return ResponseEntity.ok(plotService.getAllPlots());
    }

    @GetMapping("/{plotId}")
    public ResponseEntity<Plot> getPlotById(@PathVariable String plotId) {
        return ResponseEntity.ok(plotService.getPlotById(plotId));
    }

    @GetMapping("/farm/{farmId}")
    public ResponseEntity<List<Plot>> getPlotsByFarmId(@PathVariable String farmId) {
        return ResponseEntity.ok(plotService.getPlotsByFarmId(farmId));
    }

    @GetMapping("/farm/{farmId}/status/{status}")
    public ResponseEntity<List<Plot>> getPlotsByFarmIdAndStatus(
            @PathVariable String farmId,
            @PathVariable PlotStatus status) {
        return ResponseEntity.ok(plotService.getPlotsByFarmIdAndStatus(farmId, status));
    }
}
