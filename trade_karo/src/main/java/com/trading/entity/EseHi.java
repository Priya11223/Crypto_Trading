package com.trading.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class EseHi {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    private String purpose = "ESE hi AAYE HAI";
}
