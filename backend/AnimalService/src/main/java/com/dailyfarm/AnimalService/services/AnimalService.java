package com.dailyfarm.AnimalService.services;



import com.dailyfarm.AnimalService.dtos.AnimalDTO;

import java.util.List;
import java.util.Optional;

public interface AnimalService {
    AnimalDTO createAnimal(AnimalDTO animalDTO);
    Optional<AnimalDTO> getAnimalById(String animalId);
    List<AnimalDTO> getAllAnimals();
    AnimalDTO updateAnimal(String animalId, AnimalDTO animalDTO);
    void deleteAnimal(String animalId);

    List<AnimalDTO> findByPlotId(String plotId);
    List<AnimalDTO> findByPlotIdAndFarmId(String plotId, String farmId);
    List<AnimalDTO> findByPlotIdAndFarmIdAndGender(String plotId, String farmId, String gender);
    List<AnimalDTO> findByFarmId(String farmId);
}
