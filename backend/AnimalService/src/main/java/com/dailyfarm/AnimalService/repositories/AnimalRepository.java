package com.dailyfarm.AnimalService.repositories;

import com.dailyfarm.AnimalService.entitites.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, String> {
    List<Animal> findByPlotId(String plotId);
    List<Animal> findByPlotIdAndFarmId(String plotId, String farmId);
    List<Animal> findByPlotIdAndFarmIdAndGender(String plotId, String farmId, String gender);
    List<Animal> findByFarmId(String farmId);
}
