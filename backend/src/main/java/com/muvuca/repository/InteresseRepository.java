package com.muvuca.repository;

import com.muvuca.model.Interesse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

public interface InteresseRepository extends JpaRepository<Interesse, Long> {
    List<Interesse> findByUsuarioId(Long usuarioId);
    List<Interesse> findByEventoId(Long eventoId);
    Optional<Interesse> findByEventoIdAndUsuarioId(Long eventoId, Long usuarioId);
    boolean existsByEventoIdAndUsuarioId(Long eventoId, Long usuarioId);
    
    @Modifying
    @Transactional
    void deleteByEventoIdAndUsuarioId(Long eventoId, Long usuarioId);
}