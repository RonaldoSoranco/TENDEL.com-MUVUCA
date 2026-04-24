package com.muvuca.controller;

import com.muvuca.dto.*;
import com.muvuca.service.EmpresaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/empresa")
@CrossOrigin(origins = "http://localhost:5173")
public class EmpresaController {

    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    @PostMapping
    public ResponseEntity<EmpresaResponse> create(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @Valid @RequestBody EmpresaRequest request) {
        Long usuarioId = extractUserId(authHeader);
        try {
            EmpresaResponse response = empresaService.create(request, usuarioId);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpresaResponse> update(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @Valid @RequestBody EmpresaRequest request) {
        Long usuarioId = extractUserId(authHeader);
        try {
            EmpresaResponse response = empresaService.update(id, request, usuarioId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaResponse> getById(@PathVariable Long id) {
        try {
            EmpresaResponse response = empresaService.findByIdResponse(id);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/by-usuario/{usuarioId}")
    public ResponseEntity<EmpresaResponse> getByUsuarioId(@PathVariable Long usuarioId) {
        try {
            EmpresaResponse response = empresaService.findByUsuarioId(usuarioId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
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