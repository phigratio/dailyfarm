package com.dailyfarm.Farm.FarmService.services.impl;

import com.dailyfarm.Farm.FarmService.entities.Plot;
import com.dailyfarm.Farm.FarmService.enums.PlotStatus;
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

    @Override
    public Plot createPlot(Plot plot) {
        return plotRepository.save(plot);
    }

    @Override
    public Plot updatePlot(String id, Plot plot) {
        Optional<Plot> optionalPlot = plotRepository.findById(id);
        if (optionalPlot.isPresent()) {
            Plot existing = optionalPlot.get();
            existing.setPlotNumber(plot.getPlotNumber());
            existing.setFarm(plot.getFarm());
            existing.setArea(plot.getArea());
            existing.setStatus(plot.getStatus());
            existing.setSoilPh(plot.getSoilPh());
            existing.setOrganicMatter(plot.getOrganicMatter());
            existing.setNitrogen(plot.getNitrogen());
            existing.setPhosphorus(plot.getPhosphorus());
            existing.setPotassium(plot.getPotassium());
            existing.setNotes(plot.getNotes());
            existing.setPlotType(plot.getPlotType());
            existing.setIsActive(plot.getIsActive());
            existing.setWaterPh(plot.getWaterPh());
            return plotRepository.save(existing);
        } else {
            throw new RuntimeException("Plot not found with id: " + id);
        }
    }

    @Override
    public void deletePlot(String id) {
        plotRepository.deleteById(id);
    }

    @Override
    public List<Plot> getAllPlots() {
        return plotRepository.findAll();
    }

    @Override
    public Plot getPlotById(String id) {
        return plotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plot not found with id: " + id));
    }

    @Override
    public List<Plot> getPlotsByFarmId(String farmId) {
        return plotRepository.findByFarm_FarmId(farmId);
    }

    @Override
    public List<Plot> getPlotsByFarmIdAndStatus(String farmId, PlotStatus status) {
        return plotRepository.findByFarm_FarmIdAndStatus(farmId, status);
    }
}
