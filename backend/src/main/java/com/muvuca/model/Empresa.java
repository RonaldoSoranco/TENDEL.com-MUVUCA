package com.muvuca.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "empresas")
@Data
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String descricao;

    @Column(name = "foto_url")
    private String fotoUrl;

    private String endereco;

    @Column(name = "link_site")
    private String linkSite;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}