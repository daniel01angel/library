package com.library.library.controller;

import com.library.library.model.Publisher;
import com.library.library.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publishers")
public class PublisherController {

    @Autowired
    private PublisherService publisherService;

    // Endpoint para obtener todos los editores
    @GetMapping("/all")
    public List<Publisher> getAllPublishers() {
        return publisherService.getAllPublishers();
    }

    // Endpoint para obtener un editor por ID
    @GetMapping("/{publisherId}")
    public Publisher getPublisherById(@PathVariable int publisherId) {
        return publisherService.getPublisherById(publisherId);
    }

    // Endpoint para obtener editores por nombre
    @GetMapping("/search")
    public List<Publisher> getPublishersByName(@RequestParam String name) {
        return publisherService.getPublishersByName(name);
    }
}