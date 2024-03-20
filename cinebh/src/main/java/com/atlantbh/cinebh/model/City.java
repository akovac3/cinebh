package com.atlantbh.cinebh.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class City {
    @Id
    @Column(name = "cityId", nullable = false)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long cityId;
    private String name;
}
