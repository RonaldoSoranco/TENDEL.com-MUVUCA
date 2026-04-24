package com.muvuca.dto;

import lombok.Data;

@Data
public class EmpresaRequest {
    private String nome;
    private String descricao;
    private String fotoUrl;
    private String endereco;
    private String linkSite;
}