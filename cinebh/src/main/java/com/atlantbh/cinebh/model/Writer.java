package com.atlantbh.cinebh.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "writers")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Writer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long writerId;
    private String firstName;
    private String lastName;

    public Writer(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
