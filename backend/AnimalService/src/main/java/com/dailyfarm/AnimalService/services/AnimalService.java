package com.dailyfarm.AnimalService.services;

import com.dailyfarm.AnimalService.entitites.Animal;
import com.dailyfarm.AnimalService.entitites.AnimalHealth;
import com.dailyfarm.AnimalService.entitites.AnimalProductivity;
import com.dailyfarm.AnimalService.entitites.SymbioticRelationship;
import com.dailyfarm.AnimalService.enums.AnimalCategory;
import com.dailyfarm.AnimalService.enums.AnimalStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AnimalService {

    // Basic CRUD operations
    Animal createAnimal(Animal animal);
    Optional<Animal> getAnimalById(String animalId);
    List<Animal> getAllAnimals();
    Animal updateAnimal(String animalId, Animal animal);
    void deleteAnimal(String animalId);

    // Farm-specific operations
    List<Animal> getAnimalsByFarmId(String farmId);
    List<Animal> getAnimalsByOwnerId(String ownerId);
    List<Animal> getAnimalsByCategory(AnimalCategory category);
    List<Animal> getAnimalsByStatus(AnimalStatus status);

    // Location-based queries
    List<Animal> getAnimalsByLocation(String division, String district);
    List<Animal> getAnimalsInRadius(Double latitude, Double longitude, Double radiusKm);

    // Health and productivity
    List<AnimalHealth> getAnimalHealthHistory(String animalId);
    List<AnimalProductivity> getAnimalProductivityRecords(String animalId);

    // Symbiotic relationships
    List<SymbioticRelationship> getAnimalSymbioticRelationships(String animalId);
    SymbioticRelationship createSymbioticRelationship(SymbioticRelationship relationship);

    // Analytics and reporting
    Double calculateAnimalProductivity(String animalId, LocalDate startDate, LocalDate endDate);
    Double calculateFeedEfficiency(String animalId, LocalDate startDate, LocalDate endDate);
    List<Animal> getHighPerformingAnimals(String farmId, Integer topN);
    List<Animal> getAnimalsNeedingAttention(String farmId);

    // Business logic
    boolean canAnimalBreed(String animalId);
    List<Animal> getSuitableBreedingPartners(String animalId);
    Double estimateAnimalValue(String animalId);
    List<String> getRecommendedVaccinations(String animalId);
}