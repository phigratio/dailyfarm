package com.dailyfarm.CropService.crop.services;

import com.dailyfarm.CropService.crop.dto.CropDTO;
import com.dailyfarm.CropService.crop.entities.Crop;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CropService {

    @Transactional
    CropDTO createCrop(CropDTO cropDTO);

    List<CropDTO> getCropsByFarmId(String farmId);

    List<CropDTO> getCropsByPlotId(String plotId);

    CropDTO getCropById(String cropId);

    boolean deleteCrop(String cropId);

    CropDTO updateCrop(String cropId, CropDTO cropDTO);

}
