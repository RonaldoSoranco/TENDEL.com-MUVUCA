package com.muvuca.repository;

import com.muvuca.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    Optional<Empresa> findByUsuarioId(Long usuarioId);
    boolean existsByUsuarioId(Long usuarioId);
}