package com.atlantbh.cinebh.service;

import com.atlantbh.cinebh.exception.ResourceNotFoundException;
import com.atlantbh.cinebh.model.Movie;
import com.atlantbh.cinebh.model.Photo;
import com.atlantbh.cinebh.repository.MovieRepository;
import com.atlantbh.cinebh.repository.PhotoRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
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
        Optional<Photo> photo = photoRepository.findById(id);
        if (photo.isPresent()) {
            return photo.get();
        } else {
            throw new ResourceNotFoundException("Movie with provided id not found!");
        }
    }
    public Photo createPhoto(Photo photo){
        return photoRepository.save(photo);
    }

    public Set<Photo> getPhotosByMovie(Movie movie){
        return photoRepository.getPhotosByMovie(movie);
    }
}
