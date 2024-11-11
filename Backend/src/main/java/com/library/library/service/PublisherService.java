package com.library.library.service;

import com.library.library.model.Publisher;
import com.library.library.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublisherService {

    @Autowired
    private PublisherRepository publisherRepository;

    // Obtener todos los editores
    public List<Publisher> getAllPublishers() {
        return publisherRepository.getAllPublishers();
    }

    // Obtener un editor por ID
    public Publisher getPublisherById(int publisherId) {
        return publisherRepository.getPublisherById(publisherId);
    }

    // Obtener editores por nombre
    public List<Publisher> getPublishersByName(String publisherName) {
        return publisherRepository.getPublishersByName(publisherName);
    }
}