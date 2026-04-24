package com.muvuca.controller;

import com.muvuca.service.EventoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interesse")
@CrossOrigin(origins = "http://localhost:5173")
public class InteresseController {

    private final EventoService eventoService;

    public InteresseController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @PostMapping("/{eventoId}")
    public ResponseEntity<Void> toggleInteresse(
            @PathVariable Long eventoId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        Long usuarioId = extractUserId(authHeader);
        eventoService.toggleInteresse(eventoId, usuarioId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{eventoId}")
    public ResponseEntity<Void> removeInteresse(
            @PathVariable Long eventoId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        Long usuarioId = extractUserId(authHeader);
        eventoService.toggleInteresse(eventoId, usuarioId);
        return ResponseEntity.ok().build();
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