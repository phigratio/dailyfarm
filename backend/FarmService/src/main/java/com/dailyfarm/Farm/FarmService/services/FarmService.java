package com.dailyfarm.Farm.FarmService.services;

import com.dailyfarm.Farm.FarmService.entities.Farm;

import java.util.List;

public interface FarmService {
    Farm createFarm(Farm farm);
    List<Farm> getAllFarms();
    Farm getFarmById(String id);
    Farm updateFarm(String id,Farm farm);
    void deleteFarm(String id);
    List<Farm> getFarmsByOwnerId(String ownerId);
    List<Farm> getFarmsByDivision(String division);
    List<Farm> getFarmsByDivisionAndDistrict(String division, String district);
}