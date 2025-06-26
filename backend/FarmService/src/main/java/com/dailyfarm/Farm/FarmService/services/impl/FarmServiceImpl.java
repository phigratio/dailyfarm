package com.dailyfarm.Farm.FarmService.services.impl;

import com.dailyfarm.Farm.FarmService.entities.Farm;
import com.dailyfarm.Farm.FarmService.repositories.FarmRepository;
import com.dailyfarm.Farm.FarmService.services.FarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmServiceImpl implements FarmService {

    @Autowired
    private FarmRepository farmRepository;

    @Override
    public Farm createFarm(Farm farm) {
        return farmRepository.save(farm);
    }

    @Override
    public List<Farm> getAllFarms() {
        return List.of();
    }

    @Override
    public Farm getFarmById(String id) {
        return null;
    }

    @Override
    public Farm updateFarm(Farm farm) {
        return null;
    }

    @Override
    public void deleteFarm(String id) {

    }
}
