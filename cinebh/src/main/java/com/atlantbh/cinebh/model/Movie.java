package com.atlantbh.cinebh.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;
    private String name;
    private String language;
    private Date projectionStart;
    private Date projectionEnd;
    private String director;
    private String synopsis;
    private String rating;
    private Integer duration;
    private String trailer;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private Step step;

    @OneToMany(mappedBy = "movie")
    private Set<Photo> photos = new HashSet<>();

    @OneToMany(mappedBy = "movie")
    private Set<Projection> projections = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "genre_movies",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "writer_movie",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "writer_id")
    )
    private Set<Writer> writers = new HashSet<>();

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    Set<MovieActor> movieActors = new HashSet<>();

    public Movie(String name, Step step, String language, Date projectionStart, Date projectionEnd, String director, String synopsis, String rating, Integer duration, String trailer, Status status) {
        this.name = name;
        this.language = language;
        this.projectionStart = projectionStart;
        this.projectionEnd = projectionEnd;
        this.director = director;
        this.synopsis = synopsis;
        this.rating = rating;
        this.duration = duration;
        this.trailer = trailer;
        this.status = status;
        this.step = step;
    }
}
