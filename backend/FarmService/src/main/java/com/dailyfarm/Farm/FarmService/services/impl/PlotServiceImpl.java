package com.dailyfarm.Farm.FarmService.services.impl;

import com.dailyfarm.Farm.FarmService.entities.Plot;
import com.dailyfarm.Farm.FarmService.repositories.PlotRepository;
import com.dailyfarm.Farm.FarmService.services.PlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlotServiceImpl implements PlotService {

    @Autowired
    private PlotRepository plotRepository;

    // Create or update a plot
    public Plot savePlot(Plot plot) {
        return plotRepository.save(plot);
    }

    // Get a plot by ID
    public Plot getPlotById(String plotId) {
        Optional<Plot> plot = plotRepository.findById(plotId);
        if (plot.isPresent()) {
            return plot.get();
        } else {
            throw new RuntimeException("Plot not found with id: " + plotId);
        }
    }

    // Get all plots for a specific farm
    public List<Plot> getPlotsByFarmId(String farmId) {
        return plotRepository.findByFarm_FarmId(farmId);
    }

    // Get active plots for a specific farm
    public List<Plot> getActivePlotsByFarmId(String farmId) {
        return plotRepository.findByFarm_FarmIdAndIsActiveTrue(farmId);
    }

    // Delete a plot by ID
    public void deletePlot(String plotId) {
        plotRepository.deleteById(plotId);
    }
}
