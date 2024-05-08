package com.atlantbh.cinebh.request;

import com.atlantbh.cinebh.model.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationRequest {
    private Long projectionId;
    private List<String> seats;
    private Date date;
    private Integer price;
    private Type type;
}
