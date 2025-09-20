package com.dailyfarm.AnimalService.services.impl;

import com.dailyfarm.AnimalService.dtos.AnimalDTO;
import com.dailyfarm.AnimalService.entitites.Animal;
import com.dailyfarm.AnimalService.dtos.mapper;
import com.dailyfarm.AnimalService.repositories.AnimalRepository;
import com.dailyfarm.AnimalService.services.AnimalService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class AnimalServiceImpl implements AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    @Override
    @Transactional
    public AnimalDTO createAnimal(AnimalDTO animalDTO) {
        Animal entity = mapper.toEntity(animalDTO);
        Animal saved = animalRepository.save(entity);
        return mapper.toDTO(saved);
    }

    @Override
    public Optional<AnimalDTO> getAnimalById(String animalId) {
        return animalRepository.findById(animalId)
                .map(mapper::toDTO);
    }

    @Override
    public List<AnimalDTO> getAllAnimals() {
        return animalRepository.findAll()
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AnimalDTO updateAnimal(String animalId, AnimalDTO animalDTO) {
        Optional<Animal> existingAnimalOpt = animalRepository.findById(animalId);
        if (existingAnimalOpt.isPresent()) {
            Animal existingAnimal = existingAnimalOpt.get();
            BeanUtils.copyProperties(animalDTO, existingAnimal, "animalId", "createdAt", "updatedAt");
            Animal updated = animalRepository.save(existingAnimal);
            return mapper.toDTO(updated);
        }
        return null; // or throw exception
    }

    @Override
    @Transactional
    public void deleteAnimal(String animalId) {
        animalRepository.deleteById(animalId);
    }

    @Override
    public List<AnimalDTO> findByPlotId(String plotId) {
        return animalRepository.findByPlotId(plotId)
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AnimalDTO> findByPlotIdAndFarmId(String plotId, String farmId) {
        return animalRepository.findByPlotIdAndFarmId(plotId, farmId)
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AnimalDTO> findByPlotIdAndFarmIdAndGender(String plotId, String farmId, String gender) {
        return animalRepository.findByPlotIdAndFarmIdAndGender(plotId, farmId, gender)
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AnimalDTO> findByFarmId(String farmId) {
        return animalRepository.findByFarmId(farmId)
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
}
