package com.atlantbh.cinebh.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import java.util.ArrayList;
import java.sql.Date;
import java.util.List;

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
    private Date date;
    private Time time;
    private List<String> reservedSeats = new ArrayList<>();
    private List<String> purchasedSeats = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    @JsonIgnore
    private Movie movie;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;

    public Projection(Time time, Date date, Movie movie, Venue venue) {
        this.time = time;
        this.date = date;
        this.movie = movie;
        this.venue = venue;
    }
}
