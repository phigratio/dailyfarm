package com.dailyfarm.AnimalService.services.impl;

import com.dailyfarm.AnimalService.entitites.AnimalBreed;

import java.util.List;
import java.util.Optional;

public interface AnimalBreedService {
    AnimalBreed createAnimalBreed(AnimalBreed animalBreed);
    Optional<AnimalBreed> getAnimalBreedById(String breedId);
    List<AnimalBreed> getAllAnimalBreeds();
    AnimalBreed updateAnimalBreed(String breedId, AnimalBreed animalBreed);
    void deleteAnimalBreed(String breedId);
}
