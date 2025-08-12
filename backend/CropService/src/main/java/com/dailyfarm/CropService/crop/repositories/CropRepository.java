package com.dailyfarm.CropService.crop.repositories;

import com.dailyfarm.CropService.crop.entities.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, String> {

    List<Crop> findByFarmId(String farmId);
    List<Crop> findByPlotId(String plotId);
}