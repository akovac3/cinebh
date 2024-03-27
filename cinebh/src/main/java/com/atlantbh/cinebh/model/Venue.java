package com.atlantbh.cinebh.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Venue {
    @Id
    @Column(name = "venueId", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long venueId;
    private String name;
    private String photo;
    private String address;
    private String telephone;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    public Venue(String name, String photo, String address, String telephone, City city) {
        this.name = name;
        this.photo = photo;
        this.address = address;
        this.telephone = telephone;
        this.city = city;
    }
}
