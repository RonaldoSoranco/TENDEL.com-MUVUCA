package com.muvuca.repository;

import com.muvuca.model.Categoria;
import com.muvuca.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {
    
    List<Evento> findByOrderByDataAsc();
    
    List<Evento> findByCategoriaOrderByDataAsc(Categoria categoria);
    
    List<Evento> findByCidadeOrderByDataAsc(String cidade);
    
    @Query("SELECT e FROM Evento e WHERE " +
           "(:categoria IS NULL OR e.categoria = :categoria) AND " +
           "(:cidade IS NULL OR e.cidade = :cidade) AND " +
           "(:busca IS NULL OR LOWER(e.nome) LIKE LOWER(CONCAT('%', :busca, '%')) OR LOWER(e.descricao) LIKE LOWER(CONCAT('%', :busca, '%'))) " +
           "ORDER BY e.data ASC")
    List<Evento> findWithFilters(
        @Param("categoria") Categoria categoria, 
        @Param("cidade") String cidade,
        @Param("busca") String busca
    );
    
    List<Evento> findByAutorIdOrderByCreatedAtDesc(Long autorId);
}