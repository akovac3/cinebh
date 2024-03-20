package com.atlantbh.cinebh.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long venueId;
    private String name;
    private String address;
    private String telephone;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    public Venue(String name, String address, String telephone, City city){
        this.name = name;
        this.address = address;
        this.telephone = telephone;
        this.city = city;
    }
}
