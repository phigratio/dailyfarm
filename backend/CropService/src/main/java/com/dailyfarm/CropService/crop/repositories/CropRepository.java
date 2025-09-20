package com.dailyfarm.CropService.crop.repositories;

import com.dailyfarm.CropService.crop.entities.Crop;
import com.dailyfarm.CropService.crop.enums.CropCategory;
import com.dailyfarm.CropService.crop.enums.CropStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, String> {

    List<Crop> findByFarmId(String farmId);

    List<Crop> findByPlotId(String plotId);

    List<Crop> findByOwnerId(String ownerId);

    List<Crop> findByCategory(CropCategory category);

    List<Crop> findByStatus(CropStatus status);

    List<Crop> findByIsActive(Boolean isActive);

    // Find crops by farmId and status
    List<Crop> findByFarmIdAndStatus(String farmId, CropStatus status);

    // Find crops by ownerId and isActive
    List<Crop> findByOwnerIdAndIsActive(String ownerId, Boolean isActive);

}
