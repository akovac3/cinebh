package com.atlantbh.cinebh.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "photos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Photo {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long photoId;
    private String link;
    private Boolean cover;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="movie_id", nullable=false)
    @JsonIgnore
    private Movie movie;

    public Photo(String link, Boolean cover, Movie movie){
        this.link = link;
        this.cover = cover;
        this.movie = movie;
    }
}
