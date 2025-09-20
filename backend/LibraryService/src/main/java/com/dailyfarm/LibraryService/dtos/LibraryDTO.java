package com.dailyfarm.LibraryService.dtos;

public class LibraryDTO {

    private String id;
    private String link;
    private String category;
    private String title;

    public LibraryDTO() {}

    public LibraryDTO(String id, String link, String category, String title) {
        this.id = id;
        this.link = link;
        this.category = category;
        this.title = title;
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
