package com.dailyfarm.AnimalService.services;

import com.dailyfarm.AnimalService.entitites.AnimalType;

import java.util.List;
import java.util.Optional;

public interface AnimalTypeService {

    AnimalType createAnimalType(AnimalType animalType);
    Optional<AnimalType> getAnimalTypeById(String typeId);
    List<AnimalType> getAllAnimalTypes();
    AnimalType updateAnimalType(String typeId, AnimalType animalType);
    void deleteAnimalType(String typeId);
}