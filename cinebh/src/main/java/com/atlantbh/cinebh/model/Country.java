package com.atlantbh.cinebh.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Country {
    @Id
    @Column(name = "country_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long countryId;
    private String name;
}
