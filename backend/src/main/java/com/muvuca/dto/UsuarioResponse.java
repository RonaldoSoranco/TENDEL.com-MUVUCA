package com.muvuca.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsuarioResponse {
    private Long id;
    private String email;
    private String nome;
    private String bio;
    private String fotoUrl;
    private Long empresaId;
}