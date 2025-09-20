package com.example.marketplace.services.impl;

import com.example.marketplace.Repositories.MarketPlaceRepositories;
import com.example.marketplace.dtos.MarketPlaceDTO;
import com.example.marketplace.entities.MarketPlace;
import com.example.marketplace.services.MarketPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MarketPlaceImpl implements MarketPlaceService {

    private final MarketPlaceRepositories repository;

    @Autowired
    public MarketPlaceImpl(MarketPlaceRepositories repository) {
        this.repository = repository;
    }

    private MarketPlaceDTO mapToDTO(MarketPlace entity) {
        MarketPlaceDTO marketPlaceDTO=new MarketPlaceDTO();
        marketPlaceDTO.setId(entity.getId());
        marketPlaceDTO.setName(entity.getName());
        marketPlaceDTO.setPrice(entity.getPrice());
        marketPlaceDTO.setDescription(entity.getDescription());
        marketPlaceDTO.setImage(entity.getImage());
        marketPlaceDTO.setContact(entity.getContact());
        marketPlaceDTO.setUserId(entity.getUserId());
        marketPlaceDTO.setAmount(entity.getAmount());

return marketPlaceDTO;
    }

    private MarketPlace mapToEntity(MarketPlaceDTO dto) {
        MarketPlace entity = new MarketPlace();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setPrice(dto.getPrice());
        entity.setDescription(dto.getDescription());
        entity.setImage(dto.getImage());
        entity.setContact(dto.getContact());
        entity.setUserId(dto.getUserId());
        entity.setAmount(dto.getAmount());
        return entity;
    }

    @Override
    public MarketPlaceDTO save(MarketPlaceDTO marketPlaceDTO) {
        MarketPlace entity = mapToEntity(marketPlaceDTO);
        MarketPlace saved = repository.save(entity);
        return mapToDTO(saved);
    }

    @Override
    public Optional<MarketPlaceDTO> findById(Long id) {
        Optional<MarketPlace> entityOpt = repository.findById(id);
        return entityOpt.map(this::mapToDTO);
    }

    @Override
    public List<MarketPlaceDTO> findAll() {
        return repository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MarketPlaceDTO update(Long id, MarketPlaceDTO marketPlaceDTO) {
        Optional<MarketPlace> existingOpt = repository.findById(id);
        if (existingOpt.isEmpty()) {
            throw new RuntimeException("MarketPlace item not found with id: " + id);
        }
        MarketPlace entityToUpdate = existingOpt.get();
        entityToUpdate.setName(marketPlaceDTO.getName());
        entityToUpdate.setPrice(marketPlaceDTO.getPrice());
        entityToUpdate.setDescription(marketPlaceDTO.getDescription());
        entityToUpdate.setImage(marketPlaceDTO.getImage());
        entityToUpdate.setContact(marketPlaceDTO.getContact());
        entityToUpdate.setUserId(marketPlaceDTO.getUserId());

        MarketPlace updated = repository.save(entityToUpdate);
        return mapToDTO(updated);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
    @Override
    public List<MarketPlaceDTO> findByUserId(String userId) {
        List<MarketPlace> entities = repository.findByUserId(userId);
        return entities.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

}
