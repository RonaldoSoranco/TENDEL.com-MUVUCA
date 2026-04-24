package com.muvuca.service;

import com.muvuca.dto.*;
import com.muvuca.model.Empresa;
import com.muvuca.model.Usuario;
import com.muvuca.repository.EmpresaRepository;
import com.muvuca.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class EmpresaService {
    
    private final EmpresaRepository empresaRepository;
    private final UsuarioRepository usuarioRepository;

    public EmpresaService(EmpresaRepository empresaRepository, UsuarioRepository usuarioRepository) {
        this.empresaRepository = empresaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public EmpresaResponse create(EmpresaRequest request, Long usuarioId) {
        if (empresaRepository.existsByUsuarioId(usuarioId)) {
            throw new RuntimeException("Usuário já possui uma empresa");
        }
        
        Empresa empresa = new Empresa();
        empresa.setNome(request.getNome());
        empresa.setDescricao(request.getDescricao());
        empresa.setFotoUrl(request.getFotoUrl());
        empresa.setEndereco(request.getEndereco());
        empresa.setLinkSite(request.getLinkSite());
        empresa.setUsuarioId(usuarioId);
        
        empresa = empresaRepository.save(empresa);
        
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        if (usuario != null) {
            usuario.setEmpresaId(empresa.getId());
            usuarioRepository.save(usuario);
        }
        
        return toResponse(empresa);
    }

    public EmpresaResponse update(Long id, EmpresaRequest request, Long usuarioId) {
        Empresa empresa = empresaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
        
        if (!empresa.getUsuarioId().equals(usuarioId)) {
            throw new RuntimeException("Não autorizado");
        }
        
        if (request.getNome() != null) {
            empresa.setNome(request.getNome());
        }
        if (request.getDescricao() != null) {
            empresa.setDescricao(request.getDescricao());
        }
        if (request.getFotoUrl() != null) {
            empresa.setFotoUrl(request.getFotoUrl());
        }
        if (request.getEndereco() != null) {
            empresa.setEndereco(request.getEndereco());
        }
        if (request.getLinkSite() != null) {
            empresa.setLinkSite(request.getLinkSite());
        }
        
        empresa = empresaRepository.save(empresa);
        return toResponse(empresa);
    }

    public Optional<Empresa> findById(Long id) {
        return empresaRepository.findById(id);
    }

    public EmpresaResponse findByIdResponse(Long id) {
        Empresa empresa = empresaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
        return toResponse(empresa);
    }

    public EmpresaResponse findByUsuarioId(Long usuarioId) {
        Empresa empresa = empresaRepository.findByUsuarioId(usuarioId)
            .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
        return toResponse(empresa);
    }

    public boolean existsByUsuarioId(Long usuarioId) {
        return empresaRepository.existsByUsuarioId(usuarioId);
    }

    private EmpresaResponse toResponse(Empresa empresa) {
        return new EmpresaResponse(
            empresa.getId(),
            empresa.getNome(),
            empresa.getDescricao(),
            empresa.getFotoUrl(),
            empresa.getEndereco(),
            empresa.getLinkSite(),
            empresa.getUsuarioId()
        );
    }
}