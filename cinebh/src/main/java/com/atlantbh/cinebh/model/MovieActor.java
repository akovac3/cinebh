package com.atlantbh.cinebh.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "movie_actors")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovieActor implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieActorId;
    @ManyToOne
    @JoinColumn(name = "movie_id")
    @JsonIgnore
    private Movie movie;
    @ManyToOne
    @JoinColumn(name = "actor_id")
    private Actor actor;
    @Column(name = "role")
    private String role;

    public MovieActor(Movie movie, Actor actor, String role){
        this.movie = movie;
        this.actor = actor;
        this.role = role;
    }
}
