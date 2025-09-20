package com.dailyfarm.LibraryService.controllers;

import com.dailyfarm.LibraryService.dtos.LibraryDTO;
import com.dailyfarm.LibraryService.entities.Library;
import com.dailyfarm.LibraryService.services.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/library")
public class LibraryController {

    private final LibraryService libraryService;

    @Autowired
    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    private LibraryDTO mapToDTO(Library entity) {
        LibraryDTO dto = new LibraryDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setCategory(entity.getCategory());
        dto.setLink(entity.getLink());
        return dto;
    }

    private Library mapToEntity(LibraryDTO dto) {
        Library entity = new Library();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setCategory(dto.getCategory());
        entity.setLink(dto.getLink());
        return entity;
    }

    @GetMapping
    public ResponseEntity<List<LibraryDTO>> getAllLibraryItems() {
        List<LibraryDTO> dtos = libraryService.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<LibraryDTO>> getByCategory(@PathVariable String category) {
        List<LibraryDTO> filtered = libraryService.findAll()
                .stream()
                .filter(item -> category.equalsIgnoreCase(item.getCategory()))
                .map(this::mapToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(filtered);
    }

    @PostMapping
    public ResponseEntity<LibraryDTO> createLibraryItem(@RequestBody LibraryDTO dto) {
        Library entity = mapToEntity(dto);
        Library saved = libraryService.save(entity);
        return ResponseEntity.created(URI.create("/api/library/" + saved.getId())).body(mapToDTO(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LibraryDTO> updateLibraryItem(@PathVariable String id, @RequestBody LibraryDTO dto) {
        Optional<Library> existing = libraryService.findById(id);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        Library entityToUpdate = mapToEntity(dto);
        entityToUpdate.setId(id);

        Library updated = libraryService.save(entityToUpdate);
        return ResponseEntity.ok(mapToDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLibraryItem(@PathVariable String id) {
        if (libraryService.findById(id).isEmpty()) return ResponseEntity.notFound().build();
        libraryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
