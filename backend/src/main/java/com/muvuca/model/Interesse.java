package com.muvuca.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "interesses", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"evento_id", "usuario_id"})
})
@Data
public class Interesse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "evento_id", nullable = false)
    private Long eventoId;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}