package com.dailyfarm.CropService.crop.services;

import com.dailyfarm.CropService.crop.entities.Crop;
import com.dailyfarm.CropService.crop.external.services.FarmServiceClient;
import com.dailyfarm.CropService.crop.repositories.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
i

import java.util.List;
import java.util.UUID;

@Service
public class CropService {

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private FarmServiceClient farmServiceClient;

    @Transactional
    public Crop createCrop(Crop crop) {
        // Validate farm existence
        Farm farm = farmServiceClient.getFarmById(crop.getFarmId());
        if (farm == null) {
            throw new IllegalArgumentException("Farm not found with ID: " + crop.getFarmId());
        }

        // Validate plot existence if provided
        if (crop.getPlotId() != null) {
            Plot plot = farmServiceClient.getPlotById(crop.getFarmId(), crop.getPlotId());
            if (plot == null) {
                throw new IllegalArgumentException("Plot not found with ID: " + crop.getPlotId() + " in farm " + crop.getFarmId());
            }
        }

        // Generate ID if not provided
        if (crop.getCropId() == null) {
            crop.setCropId(UUID.randomUUID().toString());
        }

        return cropRepository.save(crop);
    }

    public List<Crop> getCropsByFarmId(String farmId) {
        // Optionally validate farm, but for efficiency, assume valid
        return cropRepository.findByFarmId(farmId);
    }

    // Additional methods: updateCrop, deleteCrop, etc.
}