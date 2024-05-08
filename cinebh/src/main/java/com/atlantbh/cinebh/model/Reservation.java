package com.atlantbh.cinebh.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
    @Id
    @Column(name = "reservation_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;
    private List<String> seats;
    private Date date;
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "projection_id")
    private Projection projection;

    public Reservation(List<String> seats, Date date,Integer price, User user, Projection projection) {
        this.seats = seats;
        this.date = date;
        this.price = price;
        this.user = user;
        this.projection = projection;
    }
}
