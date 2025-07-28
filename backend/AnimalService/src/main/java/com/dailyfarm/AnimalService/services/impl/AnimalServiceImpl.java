package com.dailyfarm.AnimalService.services.impl;

import com.dailyfarm.AnimalService.entitites.Animal;
import com.dailyfarm.AnimalService.entitites.AnimalHealth;
import com.dailyfarm.AnimalService.entitites.AnimalProductivity;
import com.dailyfarm.AnimalService.entitites.SymbioticRelationship;
import com.dailyfarm.AnimalService.enums.AnimalCategory;
import com.dailyfarm.AnimalService.enums.AnimalStatus;
import com.dailyfarm.AnimalService.enums.HealthStatus;
import com.dailyfarm.AnimalService.exceptions.ResourceNotFoundException;
import com.dailyfarm.AnimalService.repositories.AnimalHealthRepository;
import com.dailyfarm.AnimalService.repositories.AnimalProductivityRepository;
import com.dailyfarm.AnimalService.repositories.AnimalRepository;
import com.dailyfarm.AnimalService.repositories.SymbioticRelationshipRepository;
import com.dailyfarm.AnimalService.services.AnimalService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@Transactional
public class AnimalServiceImpl implements AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private AnimalHealthRepository animalHealthRepository;

    @Autowired
    private AnimalProductivityRepository animalProductivityRepository;

    @Autowired
    private SymbioticRelationshipRepository symbioticRelationshipRepository;

    @Override
    public Animal createAnimal(Animal animal) {
        log.info("Creating new animal: {}", animal.getAnimalName());

        // Generate animal ID
        animal.setAnimalId(UUID.randomUUID().toString());

        // Generate identification number if not provided
        if (animal.getIdentificationNumber() == null) {
            animal.setIdentificationNumber(generateIdentificationNumber(animal));
        }

        // Set default values
        if (animal.getIsActive() == null) {
            animal.setIsActive(true);
        }

        if (animal.getStatus() == null) {
            animal.setStatus(determineInitialStatus(animal));
        }

        Animal savedAnimal = animalRepository.save(animal);
        log.info("Animal created successfully with ID: {}", savedAnimal.getAnimalId());

        return savedAnimal;
    }

    @Override
    public Optional<Animal> getAnimalById(String animalId) {
        return animalRepository.findById(animalId);
    }

    @Override
    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    @Override
    public Animal updateAnimal(String animalId, Animal animal) {
        Animal existingAnimal = animalRepository.findById(animalId)
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id: " + animalId));

        // Update fields
        updateAnimalFields(existingAnimal, animal);

        return animalRepository.save(existingAnimal);
    }

    @Override
    public void deleteAnimal(String animalId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id: " + animalId));

        // Soft delete
        animal.setIsActive(false);
        animal.setStatus(AnimalStatus.SOLD); // or DECEASED
        animalRepository.save(animal);
    }

    @Override
    public List<Animal> getAnimalsByFarmId(String farmId) {
        return animalRepository.findByFarmIdAndIsActiveTrue(farmId);
    }

    @Override
    public List<Animal> getAnimalsByOwnerId(String ownerId) {
        return animalRepository.findByOwnerIdAndIsActiveTrue(ownerId);
    }

    @Override
    public List<Animal> getAnimalsByCategory(AnimalCategory category) {
        return animalRepository.findByCategoryAndIsActiveTrue(category);
    }

    @Override
    public List<Animal> getAnimalsByStatus(AnimalStatus status) {
        return animalRepository.findByStatusAndIsActiveTrue(status);
    }

    @Override
    public List<Animal> getAnimalsByLocation(String division, String district) {
        return animalRepository.findByDivisionAndDistrictAndIsActiveTrue(division, district);
    }

    @Override
    public List<Animal> getAnimalsInRadius(Double latitude, Double longitude, Double radiusKm) {
        return List.of();
    }


    @Override
    public List<AnimalHealth> getAnimalHealthHistory(String animalId) {
        return animalHealthRepository.findByAnimalAnimalIdOrderByCheckupDateDesc(animalId);
    }

    @Override
    public List<AnimalProductivity> getAnimalProductivityRecords(String animalId) {
        return animalProductivityRepository.findByAnimalAnimalIdOrderByRecordDateDesc(animalId);
    }

    @Override
    public List<SymbioticRelationship> getAnimalSymbioticRelationships(String animalId) {
        return symbioticRelationshipRepository.findByAnimalsAnimalIdAndIsActiveTrue(animalId);
    }

    @Override
    public SymbioticRelationship createSymbioticRelationship(SymbioticRelationship relationship) {
        relationship.setRelationshipId(UUID.randomUUID().toString());
        return symbioticRelationshipRepository.save(relationship);
    }

    @Override
    public Double calculateAnimalProductivity(String animalId, LocalDate startDate, LocalDate endDate) {
        return animalProductivityRepository.getTotalProductivity(animalId, startDate, endDate);
    }

    @Override
    public Double calculateFeedEfficiency(String animalId, LocalDate startDate, LocalDate endDate) {
        return animalProductivityRepository.getAverageFeedEfficiency(animalId, startDate, endDate);
    }

    @Override
    public List<Animal> getHighPerformingAnimals(String farmId, Integer topN) {
        return List.of();
    }

    @Override
    public List<Animal> getAnimalsNeedingAttention(String farmId) {
        return List.of();
    }

    @Override
    public boolean canAnimalBreed(String animalId) {
        return false;
    }


    @Override
    public List<Animal> getSuitableBreedingPartners(String animalId) {
        return List.of();
    }


    @Override
    public Double estimateAnimalValue(String animalId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id: " + animalId));
        return animal.getPurchasePrice().doubleValue() * (1 + (animal.getAgeInYears() / 10.0));
    }

    @Override
    public List<String> getRecommendedVaccinations(String animalId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id: " + animalId));
        // Simple logic based on category
        if (animal.getCategory() == AnimalCategory.LIVESTOCK) {
            return List.of("Foot and Mouth Disease", "Brucellosis");
        } else if (animal.getCategory() == AnimalCategory.POULTRY) {
            return List.of("Newcastle Disease", "Avian Influenza");
        }
        return List.of("General Vaccination");
    }

    // Private helpers
    private String generateIdentificationNumber(Animal animal) {
        return animal.getCategory().name().substring(0, 3) + "-" + UUID.randomUUID().toString().substring(0, 8);
    }

    private AnimalStatus determineInitialStatus(Animal animal) {
        return animal.getAgeInMonths() < animal.getAnimalType().getMaturityAgeMonths() ? AnimalStatus.YOUNG : AnimalStatus.ACTIVE;
    }

    private void updateAnimalFields(Animal existing, Animal updated) {
        if (updated.getAnimalName() != null) existing.setAnimalName(updated.getAnimalName());
        if (updated.getStatus() != null) existing.setStatus(updated.getStatus());
        // Add more as needed
    }
}