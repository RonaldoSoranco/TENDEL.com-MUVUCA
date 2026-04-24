package com.muvuca.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String senha;

    private String nome;

    private String bio;

    @Column(name = "foto_url")
    private String fotoUrl;

    @Column(name = "empresa_id")
    private Long empresaId;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}