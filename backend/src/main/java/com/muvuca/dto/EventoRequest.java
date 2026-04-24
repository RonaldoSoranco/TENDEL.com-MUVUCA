package com.muvuca.dto;

import com.muvuca.model.Categoria;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class EventoRequest {
    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    private String descricao;

    @NotNull(message = "Data é obrigatória")
    private LocalDate data;

    @NotNull(message = "Hora é obrigatória")
    private LocalTime hora;

    @NotBlank(message = "Local é obrigatório")
    private String local;

    @NotBlank(message = "Cidade é obrigatória")
    private String cidade;

    @NotNull(message = "Categoria é obrigatória")
    private Categoria categoria;

    private BigDecimal preco = BigDecimal.ZERO;
    private String imagemUrl;
}