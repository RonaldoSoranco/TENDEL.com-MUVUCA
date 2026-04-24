package com.muvuca.service;

import com.muvuca.dto.*;
import com.muvuca.model.Usuario;
import com.muvuca.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UsuarioService {
    
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UsuarioResponse register(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já está em uso");
        }
        
        Usuario usuario = new Usuario();
        usuario.setEmail(request.getEmail());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        usuario.setNome(request.getNome());
        usuario.setCreatedAt(LocalDateTime.now());
        
        usuario = usuarioRepository.save(usuario);
        
        return new UsuarioResponse(usuario.getId(), usuario.getEmail(), usuario.getNome(), null, null, null);
    }

    public LoginResponse login(LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.getEmail());
        
        if (usuarioOpt.isEmpty()) {
            // Criar novo usuário se não existir (modo debug)
            Usuario novo = new Usuario();
            novo.setEmail(request.getEmail());
            novo.setSenha(request.getSenha());
            novo.setNome(request.getEmail().split("@")[0]);
            novo.setCreatedAt(java.time.LocalDateTime.now());
            novo = usuarioRepository.save(novo);
            String token = "jwt_" + novo.getId() + "_" + System.currentTimeMillis();
            return new LoginResponse(token, novo.getId(), novo.getEmail(), novo.getNome());
        }
        
        Usuario usuario = usuarioOpt.get();
        
        // Check se a senha está hasheada ou em texto plano (para compatibilidade)
        boolean senhaValida = false;
        String passNoBanco = usuario.getSenha();
        String passDigitada = request.getSenha();
        
        // BCrypt válido tem formato $2a$10$... ou $2b$10$... (mínimo 60 chars)
        if (passNoBanco != null && passNoBanco.length() >= 60 && passNoBanco.matches("^\\$2[ab]\\$.+")) {
            // Senha bcrypt
            senhaValida = passwordEncoder.matches(passDigitada, passNoBanco);
        } else {
            // Senha em texto plano (modo desenvolvimento)
            senhaValida = passDigitada.equals(passNoBanco);
        }
        
        if (!senhaValida) {
            throw new RuntimeException("Credenciais inválidas");
        }
        
        String token = "jwt_" + usuario.getId() + "_" + System.currentTimeMillis();
        
        return new LoginResponse(token, usuario.getId(), usuario.getEmail(), usuario.getNome());
    }

    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    public UsuarioResponse findByIdResponse(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return toResponse(usuario);
    }

    public UsuarioResponse update(Long id, UsuarioUpdateRequest request) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        if (request.getNome() != null) {
            usuario.setNome(request.getNome());
        }
        if (request.getBio() != null) {
            usuario.setBio(request.getBio());
        }
        if (request.getFotoUrl() != null) {
            usuario.setFotoUrl(request.getFotoUrl());
        }
        
        usuario = usuarioRepository.save(usuario);
        return toResponse(usuario);
    }

    public UsuarioResponse updateEmpresaLink(Long usuarioId, Long empresaId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuario.setEmpresaId(empresaId);
        usuario = usuarioRepository.save(usuario);
        return toResponse(usuario);
    }

    private UsuarioResponse toResponse(Usuario usuario) {
        return new UsuarioResponse(
            usuario.getId(),
            usuario.getEmail(),
            usuario.getNome(),
            usuario.getBio(),
            usuario.getFotoUrl(),
            usuario.getEmpresaId()
        );
    }
}