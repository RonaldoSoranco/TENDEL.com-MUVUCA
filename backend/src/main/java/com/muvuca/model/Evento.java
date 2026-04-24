package com.muvuca.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "eventos")
@Data
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 2000)
    private String descricao;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private LocalTime hora;

    @Column(nullable = false)
    private String local;

    @Column(nullable = false)
    private String cidade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Categoria categoria = Categoria.OUTRO;

    @Column(precision = 10, scale = 2)
    private BigDecimal preco = BigDecimal.ZERO;

    private String imagemUrl;

    @Column(name = "autor_id")
    private Long autorId;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}