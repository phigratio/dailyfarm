package com.dailyfarm.Farm.FarmService.services;

import com.dailyfarm.Farm.FarmService.entities.Farm;

import java.util.List;

public interface FarmService {

    Farm createFarm(Farm farm);

    List<Farm> getAllFarms();

    Farm getFarmById(String id);

    Farm updateFarm(Farm farm);

    void deleteFarm(String id);



}
