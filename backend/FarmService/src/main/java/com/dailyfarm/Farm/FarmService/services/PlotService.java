package com.dailyfarm.Farm.FarmService.services;

import com.dailyfarm.Farm.FarmService.entities.Plot;
import com.dailyfarm.Farm.FarmService.enums.PlotStatus;

import java.util.List;

public interface PlotService {
    Plot createPlot(Plot plot);

    Plot updatePlot(String id, Plot plot);

    void deletePlot(String id);

    List<Plot> getAllPlots();

    Plot getPlotById(String id);

    List<Plot> getPlotsByFarmId(String farmId);

    List<Plot> getPlotsByFarmIdAndStatus(String farmId, PlotStatus status);
}
