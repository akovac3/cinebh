package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Writer;
import com.atlantbh.cinebh.repository.WriterRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class WriterService {
    @Autowired
    private WriterRepository writerRepository;

    public Iterable<Writer> getAll() {
        return writerRepository.findAll();
    }

    public Writer findById(Long id) {
        return writerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Writer with provided id not found!"));
    }

    public Writer save(Writer writer) {
        return writerRepository.save(writer);
    }

    public void remove(Long id) throws JsonProcessingException {
        if (!writerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Writer with id= " + id + " does not exist");
        }
        writerRepository.deleteById(id);
    }

    public Writer findByName(String firstName, String lastName) {
        return writerRepository.findByFirstNameAndLastName(firstName, lastName);
    }
}
