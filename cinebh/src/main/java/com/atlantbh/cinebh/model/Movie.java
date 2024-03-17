package com.atlantbh.cinebh.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "movies")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
    @Id
    @Column(name = "movieId", nullable = false)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long movieId;
    private String name;
    private Integer year;
    private String language;
    private Date projectionStart;
    private Date projectionEnd;
    private String director;
    private String synopsis;
    private Float rating;
    private Integer duration;
    private String trailer;
    @OneToMany(mappedBy="movie")
    private Set<Photo> photos = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "genre_movies",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private Set<Genre> genres = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "actor_movies",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "actor_id"))
    private Set<Actor> actors = new HashSet<>();


    public Movie(String name, Integer year, String language, Date projectionStart, Date projectionEnd, String director, String synopsis, Float rating, Integer duration, String trailer){
        this.name = name;
        this.year = year;
        this.language = language;
        this.projectionStart = projectionStart;
        this.projectionEnd = projectionEnd;
        this.director = director;
        this.synopsis = synopsis;
        this.rating = rating;
        this.duration = duration;
        this.trailer = trailer;
    }
}
