package com.muvuca.dto;

import lombok.Data;

@Data
public class UsuarioUpdateRequest {
    private String nome;
    private String bio;
    private String fotoUrl;
}