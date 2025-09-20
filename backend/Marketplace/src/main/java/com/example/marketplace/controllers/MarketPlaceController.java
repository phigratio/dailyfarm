package com.example.marketplace.controllers;

import com.example.marketplace.dtos.MarketPlaceDTO;
import com.example.marketplace.services.MarketPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/marketplace")
public class MarketPlaceController {
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<MarketPlaceDTO>> getMarketPlaceItemsByUserId(@PathVariable String userId) {
        System.out.println("Pong");
        System.out.println("Pong");
        System.out.println("Pong");
        System.out.println("Pong");
        List<MarketPlaceDTO> items = service.findByUserId(userId);
        return ResponseEntity.ok(items);
    }

    private final MarketPlaceService service;

    @Autowired
    public MarketPlaceController(MarketPlaceService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<MarketPlaceDTO>> getAllMarketPlaceItems() {
        List<MarketPlaceDTO> items = service.findAll();
        return ResponseEntity.ok(items);
    }



    @PostMapping
    public ResponseEntity<MarketPlaceDTO> saveMarketPlaceItem(@RequestBody MarketPlaceDTO dto) {
        MarketPlaceDTO created = service.save(dto);
        return ResponseEntity.created(URI.create("/api/marketplace/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MarketPlaceDTO> update(@PathVariable Long id, @RequestBody MarketPlaceDTO dto) {
        try {
            MarketPlaceDTO updated = service.update(id, dto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
