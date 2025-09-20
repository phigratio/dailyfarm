package com.dailyfarm.AnimalService.dtos;


import com.dailyfarm.AnimalService.entitites.Animal;

public class mapper {

    public static AnimalDTO toDTO(Animal entity) {
        if (entity == null) return null;
        return AnimalDTO.builder()
                .animalId(entity.getAnimalId())
                .animalName(entity.getAnimalName())
                .farmId(entity.getFarmId())
                .plotId(entity.getPlotId())
                .ownerId(entity.getOwnerId())
                .number(entity.getNumber())
                .breed(entity.getBreed())
                .category(entity.getCategory())
                .status(entity.getStatus())
                .age(entity.getAge())
                .gender(entity.getGender())
                .weight(entity.getWeight())
                .height(entity.getHeight())
                .food(entity.getFood())
                .purchasePrice(entity.getPurchasePrice())
                .motherId(entity.getMotherId())
                .fatherId(entity.getFatherId())
                .vaccinationStatus(entity.getVaccinationStatus())
                .notes(entity.getNotes())
                .isActive(entity.getIsActive())
                .animalHealth(entity.getAnimalHealth())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static Animal toEntity(AnimalDTO dto) {
        if (dto == null) return null;
        Animal entity = new Animal();
        entity.setAnimalId(dto.getAnimalId());
        entity.setAnimalName(dto.getAnimalName());
        entity.setFarmId(dto.getFarmId());
        entity.setPlotId(dto.getPlotId());
        entity.setOwnerId(dto.getOwnerId());
        entity.setNumber(dto.getNumber());
        entity.setBreed(dto.getBreed());
        entity.setCategory(dto.getCategory());
        entity.setStatus(dto.getStatus());
        entity.setAge(dto.getAge());
        entity.setGender(dto.getGender());
        entity.setWeight(dto.getWeight());
        entity.setHeight(dto.getHeight());
        entity.setPurchasePrice(dto.getPurchasePrice());
        entity.setMotherId(dto.getMotherId());
        entity.setFatherId(dto.getFatherId());
        entity.setVaccinationStatus(dto.getVaccinationStatus());
        entity.setNotes(dto.getNotes());
        entity.setIsActive(dto.getIsActive());
        entity.setAnimalHealth(dto.getAnimalHealth());
        entity.setFood(dto.getFood());
        // createdAt and updatedAt managed by JPA
        return entity;
    }
}
