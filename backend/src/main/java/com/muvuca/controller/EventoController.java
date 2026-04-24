package com.muvuca.controller;

import com.muvuca.dto.*;
import com.muvuca.model.Evento;
import com.muvuca.model.Usuario;
import com.muvuca.service.EventoService;
import com.muvuca.repository.EventoRepository;
import com.muvuca.model.Categoria;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:5173")
public class EventoController {

    private final EventoService eventoService;
    private final EventoRepository eventoRepository;

    public EventoController(EventoService eventoService, EventoRepository eventoRepository) {
        this.eventoService = eventoService;
        this.eventoRepository = eventoRepository;
    }

    @GetMapping
    public ResponseEntity<List<Evento>> getAll(
            @RequestParam(required = false) Categoria categoria,
            @RequestParam(required = false) String cidade,
            @RequestParam(required = false) String busca) {
        List<Evento> eventos = eventoService.findAll(categoria, cidade, busca);
        return ResponseEntity.ok(eventos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> getById(@PathVariable Long id) {
        Evento evento = eventoService.findById(id);
        if (evento == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(evento);
    }

    @PostMapping
    public ResponseEntity<Evento> create(
            @Valid @RequestBody EventoRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        Long autorId = extractUserId(authHeader);
        Evento evento = eventoService.create(request, autorId);
        return ResponseEntity.status(HttpStatus.CREATED).body(evento);
    }

    @GetMapping("/{id}/interessados")
    public ResponseEntity<List<UsuarioSimpleResponse>> getInteressados(@PathVariable Long id) {
        List<UsuarioSimpleResponse> list = eventoService.findInteressadosByEventoId(id);
        return ResponseEntity.ok(list);
    }

    private Long extractUserId(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return 1L;
        }
        try {
            String token = authHeader.substring(7);
            if (token.startsWith("jwt_")) {
                String idStr = token.split("_")[1];
                return Long.parseLong(idStr);
            }
        } catch (Exception e) {
        }
        return 1L;
    }
}