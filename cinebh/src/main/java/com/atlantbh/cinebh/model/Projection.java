package com.atlantbh.cinebh.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;

    public Projection(Time time, Movie movie, Venue venue) {
        this.time = time;
        this.movie = movie;
        this.venue = venue;
    }
}
