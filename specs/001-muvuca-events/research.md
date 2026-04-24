# Research: MUVUCA Implementation

## Decisões Técnicas

### SQLite com Spring Boot

**Decision**: Usar Hibernate Community Dialect para SQLite

**Rationale**: 
- Spring Boot 3.x não tem suporte nativo ao SQLite
- Hibernate Community Dialect fornece o dialeto necessário
- Alternativa mais simples que usar JPA raw

**Alternatives considered**:
- Spring JDBC template puro (mais verboso)
- Hibernate com dialeto customizado (mais complexo)
- JOOQ (overkill para MVP)

---

### Spectre.css (SpaceKit)

**Decision**: Importar Spectre.css via npm ou CDN

**Rationale**:
- Biblioteca leve (~50KB)
- Componentes prontos para uso
- Estética moderna sem customização pesada

**Alternatives considered**:
- Bootstrap (mais pesado)
- Tailwind (requer configuração)
- CSS puro (mais trabalho)

---

### Estrutura de Pastas

**Decision**: Projetos separados (backend/frontend)

**Rationale**:
- Facilidade de execução independente
- Separação clara de responsabilidades
- Build/package individual

## Contratos de API

### GET /api/eventos
```json
{
  "eventos": [
    {
      "id": 1,
      "nome": "Rock no Porão",
      "descricao": "Show de rock underground",
      "data": "2026-05-01",
      "hora": "21:00",
      "local": "Rua ABC, 123",
      "cidade": "São Paulo",
      "categoria": "SHOW",
      "preco": 0.0,
      "imagemUrl": null
    }
  ]
}
```

### POST /api/eventos
```json
{
  "nome": "string",
  "descricao": "string",
  "data": "2026-05-01",
  "hora": "21:00",
  "local": "string",
  "cidade": "string",
  "categoria": "FESTA|SHOW|RPG|OUTRO",
  "preco": 0.0
}
```

## Conclusão

Stack confirmado:
- ✅ Java 17 + Spring Boot 3
- ✅ SQLite + Hibernate Community Dialect
- ✅ React + Vite + Spectre.css