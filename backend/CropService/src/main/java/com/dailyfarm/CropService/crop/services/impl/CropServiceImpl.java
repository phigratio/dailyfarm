package com.dailyfarm.CropService.crop.services.impl;

import com.dailyfarm.CropService.crop.dto.CropDTO;
import com.dailyfarm.CropService.crop.entities.Crop;
import com.dailyfarm.CropService.crop.repositories.CropRepository;
import com.dailyfarm.CropService.crop.services.CropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CropServiceImpl implements CropService {

    @Autowired
    private CropRepository cropRepository;

    // Mapping Crop -> CropDTO
    private CropDTO mapToDTO(Crop crop) {
        if (crop == null) return null;
        CropDTO dto = new CropDTO();
        dto.setCropId(crop.getCropId());
        dto.setCropName(crop.getCropName());
        dto.setFarmId(crop.getFarmId());
        dto.setPlotId(crop.getPlotId());
        dto.setOwnerId(crop.getOwnerId());
        dto.setVariety(crop.getVariety());
        dto.setCategory(crop.getCategory());
        dto.setStatus(crop.getStatus());
        dto.setPlantingDate(crop.getPlantingDate());
        dto.setExpectedHarvestDate(crop.getExpectedHarvestDate());
        dto.setPlantedArea(crop.getPlantedArea());
        dto.setSeedCost(crop.getSeedCost());
        dto.setCurrentValue(crop.getCurrentValue());
        dto.setBatchNumber(crop.getBatchNumber());
        dto.setPestResistance(crop.getPestResistance());
        dto.setFertilizerNeeds(crop.getFertilizerNeeds());
        dto.setIrrigationNeeds(crop.getIrrigationNeeds());
        dto.setNotes(crop.getNotes());
        dto.setIsActive(crop.getIsActive());
        dto.setIsOrganic(crop.getIsOrganic());
        dto.setCreatedAt(crop.getCreatedAt());
        dto.setUpdatedAt(crop.getUpdatedAt());

        dto.setHealthCheckDate(crop.getHealthCheckDate());
        dto.setDisease(crop.getDisease());
        dto.setTreatment(crop.getTreatment());
        dto.setHealthNotes(crop.getHealthNotes());

        dto.setProductivityRecordDate(crop.getProductivityRecordDate());
        dto.setYieldAmount(crop.getYieldAmount());
        dto.setGrowthRate(crop.getGrowthRate());
        dto.setProductivityNotes(crop.getProductivityNotes());

        return dto;
    }

    // Mapping CropDTO -> Crop
    private Crop mapToEntity(CropDTO dto) {
        if (dto == null) return null;
        Crop crop = new Crop();
        crop.setCropId(dto.getCropId());
        crop.setCropName(dto.getCropName());
        crop.setFarmId(dto.getFarmId());
        crop.setPlotId(dto.getPlotId());
        crop.setOwnerId(dto.getOwnerId());
        crop.setVariety(dto.getVariety());
        crop.setCategory(dto.getCategory());
        crop.setStatus(dto.getStatus());
        crop.setPlantingDate(dto.getPlantingDate());
        crop.setExpectedHarvestDate(dto.getExpectedHarvestDate());
        crop.setPlantedArea(dto.getPlantedArea());
        crop.setSeedCost(dto.getSeedCost());
        crop.setCurrentValue(dto.getCurrentValue());
        crop.setBatchNumber(dto.getBatchNumber());
        crop.setPestResistance(dto.getPestResistance());
        crop.setFertilizerNeeds(dto.getFertilizerNeeds());
        crop.setIrrigationNeeds(dto.getIrrigationNeeds());
        crop.setNotes(dto.getNotes());
        crop.setIsActive(dto.getIsActive());
        crop.setIsOrganic(dto.getIsOrganic());

        crop.setHealthCheckDate(dto.getHealthCheckDate());
        crop.setDisease(dto.getDisease());
        crop.setTreatment(dto.getTreatment());
        crop.setHealthNotes(dto.getHealthNotes());

        crop.setProductivityRecordDate(dto.getProductivityRecordDate());
        crop.setYieldAmount(dto.getYieldAmount());
        crop.setGrowthRate(dto.getGrowthRate());
        crop.setProductivityNotes(dto.getProductivityNotes());

        return crop;
    }

    @Override
    @Transactional
    public CropDTO createCrop(CropDTO cropDTO) {
        if (cropDTO.getCropId() == null) {
            cropDTO.setCropId(UUID.randomUUID().toString());
        }
        Crop crop = mapToEntity(cropDTO);
        Crop savedCrop = cropRepository.save(crop);
        return mapToDTO(savedCrop);
    }

    @Override
    public List<CropDTO> getCropsByFarmId(String farmId) {
        List<Crop> crops = cropRepository.findByFarmId(farmId);
        return crops.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<CropDTO> getCropsByPlotId(String plotId) {
        List<Crop> crops = cropRepository.findByPlotId(plotId);
        return crops.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public CropDTO getCropById(String cropId) {
        Optional<Crop> crop = cropRepository.findById(cropId);
        return crop.map(this::mapToDTO).orElse(null);
    }

    @Override
    @Transactional
    public CropDTO updateCrop(String cropId, CropDTO cropDTO) {
        Optional<Crop> optionalCrop = cropRepository.findById(cropId);
        if (!optionalCrop.isPresent()) {
            return null;
        }
        Crop existingCrop = optionalCrop.get();

        // Update non-null fields from DTO to existing entity
        if (cropDTO.getCropName() != null) existingCrop.setCropName(cropDTO.getCropName());
        if (cropDTO.getFarmId() != null) existingCrop.setFarmId(cropDTO.getFarmId());
        if (cropDTO.getPlotId() != null) existingCrop.setPlotId(cropDTO.getPlotId());
        if (cropDTO.getOwnerId() != null) existingCrop.setOwnerId(cropDTO.getOwnerId());
        if (cropDTO.getVariety() != null) existingCrop.setVariety(cropDTO.getVariety());
        if (cropDTO.getCategory() != null) existingCrop.setCategory(cropDTO.getCategory());
        if (cropDTO.getStatus() != null) existingCrop.setStatus(cropDTO.getStatus());
        if (cropDTO.getPlantingDate() != null) existingCrop.setPlantingDate(cropDTO.getPlantingDate());
        if (cropDTO.getExpectedHarvestDate() != null) existingCrop.setExpectedHarvestDate(cropDTO.getExpectedHarvestDate());
        if (cropDTO.getPlantedArea() != null) existingCrop.setPlantedArea(cropDTO.getPlantedArea());
        if (cropDTO.getSeedCost() != null) existingCrop.setSeedCost(cropDTO.getSeedCost());
        if (cropDTO.getCurrentValue() != null) existingCrop.setCurrentValue(cropDTO.getCurrentValue());
        if (cropDTO.getBatchNumber() != null) existingCrop.setBatchNumber(cropDTO.getBatchNumber());
        if (cropDTO.getPestResistance() != null) existingCrop.setPestResistance(cropDTO.getPestResistance());
        if (cropDTO.getFertilizerNeeds() != null) existingCrop.setFertilizerNeeds(cropDTO.getFertilizerNeeds());
        if (cropDTO.getIrrigationNeeds() != null) existingCrop.setIrrigationNeeds(cropDTO.getIrrigationNeeds());
        if (cropDTO.getNotes() != null) existingCrop.setNotes(cropDTO.getNotes());
        if (cropDTO.getIsActive() != null) existingCrop.setIsActive(cropDTO.getIsActive());
        if (cropDTO.getIsOrganic() != null) existingCrop.setIsOrganic(cropDTO.getIsOrganic());

        if (cropDTO.getHealthCheckDate() != null) existingCrop.setHealthCheckDate(cropDTO.getHealthCheckDate());
        if (cropDTO.getDisease() != null) existingCrop.setDisease(cropDTO.getDisease());
        if (cropDTO.getTreatment() != null) existingCrop.setTreatment(cropDTO.getTreatment());
        if (cropDTO.getHealthNotes() != null) existingCrop.setHealthNotes(cropDTO.getHealthNotes());

        if (cropDTO.getProductivityRecordDate() != null) existingCrop.setProductivityRecordDate(cropDTO.getProductivityRecordDate());
        if (cropDTO.getYieldAmount() != null) existingCrop.setYieldAmount(cropDTO.getYieldAmount());
        if (cropDTO.getGrowthRate() != null) existingCrop.setGrowthRate(cropDTO.getGrowthRate());
        if (cropDTO.getProductivityNotes() != null) existingCrop.setProductivityNotes(cropDTO.getProductivityNotes());

        Crop saved = cropRepository.save(existingCrop);
        return mapToDTO(saved);
    }

    @Override
    @Transactional
    public boolean deleteCrop(String cropId) {
        if (!cropRepository.existsById(cropId)) {
            return false;
        }
        cropRepository.deleteById(cropId);
        return true;
    }
}
