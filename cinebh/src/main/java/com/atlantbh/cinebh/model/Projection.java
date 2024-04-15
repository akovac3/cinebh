package com.atlantbh.cinebh.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Entity
@Table(name = "projections")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Projection {
    @Id
    @Column(name = "projectionId", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectionId;
    private Time time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    @JsonIgnore
    private Movie movie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venue_id", nullable = false)
    @JsonIgnore
    private Venue venue;

    public Projection(Time time, Movie movie, Venue venue) {
        this.time = time;
        this.movie = movie;
        this.venue = venue;
    }
}
