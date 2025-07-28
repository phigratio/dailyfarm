package com.dailyfarm.AnimalService.services.impl;

import com.dailyfarm.AnimalService.entitites.AnimalType;
import com.dailyfarm.AnimalService.exceptions.ResourceNotFoundException;
import com.dailyfarm.AnimalService.repositories.AnimalTypeRepository;
import com.dailyfarm.AnimalService.services.AnimalTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@Transactional
public class AnimalTypeServiceImpl implements AnimalTypeService {

    @Autowired
    private AnimalTypeRepository animalTypeRepository;

    @Override
    public AnimalType createAnimalType(AnimalType animalType) {
        log.info("Creating new animal type: {}", animalType.getTypeName());
        animalType.setTypeId(UUID.randomUUID().toString());
        if (animalType.getIsActive() == null) {
            animalType.setIsActive(true);
        }
        return animalTypeRepository.save(animalType);
    }

    @Override
    public Optional<AnimalType> getAnimalTypeById(String typeId) {
        return animalTypeRepository.findById(typeId);
    }

    @Override
    public List<AnimalType> getAllAnimalTypes() {
        return animalTypeRepository.findAll();
    }

    @Override
    public AnimalType updateAnimalType(String typeId, AnimalType animalType) {
        AnimalType existingType = animalTypeRepository.findById(typeId)
                .orElseThrow(() -> new ResourceNotFoundException("AnimalType not found with id: " + typeId));
        // Update fields (example; add more as needed)
        if (animalType.getTypeName() != null) {
            existingType.setTypeName(animalType.getTypeName());
        }
        if (animalType.getDescription() != null) {
            existingType.setDescription(animalType.getDescription());
        }
        return animalTypeRepository.save(existingType);
    }

    @Override
    public void deleteAnimalType(String typeId) {
        AnimalType animalType = animalTypeRepository.findById(typeId)
                .orElseThrow(() -> new ResourceNotFoundException("AnimalType not found with id: " + typeId));
        animalTypeRepository.delete(animalType);
    }
}