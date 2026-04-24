package com.muvuca.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsuarioSimpleResponse {
    private Long id;
    private String nome;
    private String fotoUrl;
}