package com.muvuca.service;

import com.muvuca.dto.EventoRequest;
import com.muvuca.dto.UsuarioSimpleResponse;
import com.muvuca.model.Categoria;
import com.muvuca.model.Evento;
import com.muvuca.model.Interesse;
import com.muvuca.model.Usuario;
import com.muvuca.repository.EventoRepository;
import com.muvuca.repository.InteresseRepository;
import com.muvuca.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventoService {

    private final EventoRepository eventoRepository;
    private final InteresseRepository interesseRepository;
    private final UsuarioRepository usuarioRepository;

    public EventoService(EventoRepository eventoRepository, InteresseRepository interesseRepository, UsuarioRepository usuarioRepository) {
        this.eventoRepository = eventoRepository;
        this.interesseRepository = interesseRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Evento> findAll(Categoria categoria, String cidade, String busca) {
        return eventoRepository.findWithFilters(categoria, cidade, busca);
    }

    public Evento findById(Long id) {
        return eventoRepository.findById(id).orElse(null);
    }

    public Evento create(EventoRequest request, Long autorId) {
        Evento evento = new Evento();
        evento.setNome(request.getNome());
        evento.setDescricao(request.getDescricao());
        evento.setData(request.getData());
        evento.setHora(request.getHora());
        evento.setLocal(request.getLocal());
        evento.setCidade(request.getCidade());
        evento.setCategoria(request.getCategoria());
        evento.setPreco(request.getPreco());
        evento.setImagemUrl(request.getImagemUrl());
        evento.setAutorId(autorId);
        evento.setCreatedAt(LocalDateTime.now());
        
        return eventoRepository.save(evento);
    }

    public List<Evento> findByAutorId(Long autorId) {
        return eventoRepository.findByAutorIdOrderByCreatedAtDesc(autorId);
    }

    public void toggleInteresse(Long eventoId, Long usuarioId) {
        if (interesseRepository.existsByEventoIdAndUsuarioId(eventoId, usuarioId)) {
            interesseRepository.deleteByEventoIdAndUsuarioId(eventoId, usuarioId);
        } else {
            Interesse interesse = new Interesse();
            interesse.setEventoId(eventoId);
            interesse.setUsuarioId(usuarioId);
            interesse.setCreatedAt(LocalDateTime.now());
            interesseRepository.save(interesse);
        }
    }

    public boolean isInteressado(Long eventoId, Long usuarioId) {
        return interesseRepository.existsByEventoIdAndUsuarioId(eventoId, usuarioId);
    }

    public List<Interesse> findInteressesByUsuario(Long usuarioId) {
        return interesseRepository.findByUsuarioId(usuarioId);
    }

    public List<Evento> findEventosByInteresses(List<Interesse> interesses) {
        return interesses.stream()
            .map(i -> eventoRepository.findById(i.getEventoId()).orElse(null))
            .filter(e -> e != null)
            .toList();
    }

    public List<UsuarioSimpleResponse> findInteressadosByEventoId(Long eventoId) {
        List<Interesse> interesses = interesseRepository.findByEventoId(eventoId);
        return interesses.stream()
            .map(i -> {
                Usuario usuario = usuarioRepository.findById(i.getUsuarioId()).orElse(null);
                if (usuario != null) {
                    return new UsuarioSimpleResponse(usuario.getId(), usuario.getNome(), usuario.getFotoUrl());
                }
                return null;
            })
            .filter(u -> u != null)
            .toList();
    }
}