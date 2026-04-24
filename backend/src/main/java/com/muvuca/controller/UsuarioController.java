package com.muvuca.controller;

import com.muvuca.dto.*;
import com.muvuca.model.Usuario;
import com.muvuca.service.UsuarioService;
import com.muvuca.service.EventoService;
import com.muvuca.model.Interesse;
import com.muvuca.model.Evento;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final EventoService eventoService;

    public UsuarioController(UsuarioService usuarioService, EventoService eventoService) {
        this.usuarioService = usuarioService;
        this.eventoService = eventoService;
    }

    @PostMapping("/register")
    public ResponseEntity<UsuarioResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            UsuarioResponse response = usuarioService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        System.out.println("LOGIN attempt: " + request.getEmail());
        try {
            LoginResponse response = usuarioService.login(request);
            System.out.println("LOGIN success: " + response.getEmail());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.out.println("LOGIN failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/me/eventos")
    public ResponseEntity<List<Evento>> getMyEventos(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        Long usuarioId = extractUserId(authHeader);
        if (usuarioId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<Evento> eventos = eventoService.findByAutorId(usuarioId);
        return ResponseEntity.ok(eventos);
    }

    @GetMapping("/me/interesses")
    public ResponseEntity<List<Evento>> getMyInteresses(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        Long usuarioId = extractUserId(authHeader);
        if (usuarioId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<Interesse> interesses = eventoService.findInteressesByUsuario(usuarioId);
        List<Evento> eventos = eventoService.findEventosByInteresses(interesses);
        return ResponseEntity.ok(eventos);
    }

    @GetMapping("/me")
    public ResponseEntity<UsuarioResponse> getMyProfile(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        Long usuarioId = extractUserId(authHeader);
        if (usuarioId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            UsuarioResponse response = usuarioService.findByIdResponse(usuarioId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> getPublicProfile(@PathVariable Long id) {
        try {
            UsuarioResponse response = usuarioService.findByIdResponse(id);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/eventos")
    public ResponseEntity<List<Evento>> getUserEventos(@PathVariable Long id) {
        List<Evento> eventos = eventoService.findByAutorId(id);
        return ResponseEntity.ok(eventos);
    }

    @PutMapping("/me")
    public ResponseEntity<UsuarioResponse> updateMyProfile(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody UsuarioUpdateRequest request) {
        Long usuarioId = extractUserId(authHeader);
        if (usuarioId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            UsuarioResponse response = usuarioService.update(usuarioId, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    private Long extractUserId(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        try {
            String token = authHeader.substring(7);
            if (token.startsWith("jwt_")) {
                String idStr = token.split("_")[1];
                return Long.parseLong(idStr);
            }
        } catch (Exception e) {
        }
        return null;
    }
}