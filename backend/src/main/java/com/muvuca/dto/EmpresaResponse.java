package com.muvuca.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmpresaResponse {
    private Long id;
    private String nome;
    private String descricao;
    private String fotoUrl;
    private String endereco;
    private String linkSite;
    private Long usuarioId;
}