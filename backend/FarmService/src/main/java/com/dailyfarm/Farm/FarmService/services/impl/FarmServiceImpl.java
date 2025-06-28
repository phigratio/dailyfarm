package com.dailyfarm.Farm.FarmService.services.impl;

import com.dailyfarm.Farm.FarmService.dto.UserDto;
import com.dailyfarm.Farm.FarmService.entities.Farm;
import com.dailyfarm.Farm.FarmService.exceptions.ResourceNotFoundException;
import com.dailyfarm.Farm.FarmService.external.services.UserServiceClient;
import com.dailyfarm.Farm.FarmService.repositories.FarmRepository;
import com.dailyfarm.Farm.FarmService.services.FarmService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class FarmServiceImpl implements FarmService {

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private UserServiceClient userServiceClient;

    @Override
    public Farm createFarm(Farm farm) {
        // Verify that the owner exists in User Service
        try {
            ResponseEntity<UserDto> userResponse = userServiceClient.getUser(farm.getOwnerId());
            if (userResponse.getBody() == null) {
                throw new ResourceNotFoundException("User not found with id: " + farm.getOwnerId());
            }
            log.info("Owner verified: {}", userResponse.getBody().getUserName());
        } catch (Exception e) {
            log.error("Error verifying owner: {}", e.getMessage());
            throw new ResourceNotFoundException("Unable to verify owner with id: " + farm.getOwnerId());
        }

        // Generate farmId
        farm.setFarmId(UUID.randomUUID().toString());

        // Set default values if not provided
        if (farm.getIsActive() == null) {
            farm.setIsActive(true);
        }
        if (farm.getIsOrganic() == null) {
            farm.setIsOrganic(false);
        }

        return farmRepository.save(farm);
    }

    @Override
    public List<Farm> getAllFarms() {
        return farmRepository.findAll();
    }

    @Override
    public Farm getFarmById(String id) {
        return farmRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Farm not found with id: " + id));
    }

    @Override
    public Farm updateFarm(Farm farm) {
        Farm existingFarm = getFarmById(farm.getFarmId());

        if (farm.getFarmName() != null) {
            existingFarm.setFarmName(farm.getFarmName());
        }
        if (farm.getFarmType() != null) {
            existingFarm.setFarmType(farm.getFarmType());
        }
        if (farm.getTotalArea() != null) {
            existingFarm.setTotalArea(farm.getTotalArea());
        }
        if (farm.getCultivatedArea() != null) {
            existingFarm.setCultivatedArea(farm.getCultivatedArea());
        }
        if (farm.getDivision() != null) {
            existingFarm.setDivision(farm.getDivision());
        }
        if (farm.getDistrict() != null) {
            existingFarm.setDistrict(farm.getDistrict());
        }
        if (farm.getUpazila() != null) {
            existingFarm.setUpazila(farm.getUpazila());
        }
        if (farm.getVillage() != null) {
            existingFarm.setVillage(farm.getVillage());
        }
        if (farm.getLatitude() != null) {
            existingFarm.setLatitude(farm.getLatitude());
        }
        if (farm.getLongitude() != null) {
            existingFarm.setLongitude(farm.getLongitude());
        }
        if (farm.getSoilType() != null) {
            existingFarm.setSoilType(farm.getSoilType());
        }
        if (farm.getIrrigationType() != null) {
            existingFarm.setIrrigationType(farm.getIrrigationType());
        }
        if (farm.getDescription() != null) {
            existingFarm.setDescription(farm.getDescription());
        }
        if (farm.getIsActive() != null) {
            existingFarm.setIsActive(farm.getIsActive());
        }
        if (farm.getIsOrganic() != null) {
            existingFarm.setIsOrganic(farm.getIsOrganic());
        }

        return farmRepository.save(existingFarm);
    }

    @Override
    public void deleteFarm(String id) {
        Farm farm = getFarmById(id);
        farmRepository.delete(farm);
    }

    @Override
    public List<Farm> getFarmsByOwnerId(String ownerId) {
        return farmRepository.findByOwnerIdAndIsActiveTrue(ownerId);
    }

    @Override
    public List<Farm> getFarmsByDivision(String division) {
        return farmRepository.findByDivisionAndIsActiveTrue(division);
    }

    @Override
    public List<Farm> getFarmsByDivisionAndDistrict(String division, String district) {
        return farmRepository.findByDivisionAndDistrictAndIsActiveTrue(division, district);
    }
}