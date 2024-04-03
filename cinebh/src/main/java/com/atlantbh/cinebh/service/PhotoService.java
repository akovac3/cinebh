package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Photo;
import com.atlantbh.cinebh.repository.PhotoRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@AllArgsConstructor
public class PhotoService {
    @Autowired
    private PhotoRepository photoRepository;

    public Iterable<Photo> getAll() {
        return photoRepository.findAll();
    }

    public Photo findById(Long id) {
        return photoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Photo with provided id not found!"));
    }

    public Photo createPhoto(Photo photo) {
        return photoRepository.save(photo);
    }

    public Set<Photo> getPhotosByMovie(Movie movie) {
        return photoRepository.getPhotosByMovie(movie);
    }

    public Photo getMovieCover(Movie movie) {
        return photoRepository.getMovieCover(movie);
    }

    public Photo save(Photo photo) {
        return photoRepository.save(photo);
    }

    public void remove(Long id) throws JsonProcessingException {
        if (!photoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Movie with id= " + id + " does not exist");
        }
        photoRepository.deleteById(id);
    }

    public Set<Photo> getCovers() {
        return photoRepository.findByCoverTrue();
    }
}
