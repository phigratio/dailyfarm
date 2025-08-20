package com.dailyfarm.Farm.FarmService.repositories;

import com.dailyfarm.Farm.FarmService.entities.Plot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlotRepository extends JpaRepository<Plot, String> {

    // Custom query to get plots by farm ID
    List<Plot> findByFarm_FarmId(String farmId);

    // Custom query to get active plots for a specific farm
    List<Plot> findByFarm_FarmIdAndIsActiveTrue(String farmId);
}
