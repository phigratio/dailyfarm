package com.dailyfarm.Farm.FarmService.services;
import com.dailyfarm.Farm.FarmService.entities.Plot;

import java.util.List;

public interface PlotService {
    public Plot savePlot(Plot plot);
    public Plot getPlotById(String plotId);
    public List<Plot> getPlotsByFarmId(String farmId);
    public List<Plot> getActivePlotsByFarmId(String farmId);
    public void deletePlot(String plotId);
}
