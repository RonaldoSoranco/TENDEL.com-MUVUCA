<!-- SPECKIT START -->
## MUVUCA - Plataforma de Eventos

**Tech Stack**: Java 17 + Spring Boot 3 + SQLite + React + Spectre.css

### Referências
- **Spec**: `specs/001-muvuca-events/spec.md`
- **Plan**: `specs/001-muvuca-events/plan.md`
- **Data Model**: `specs/001-muvuca-events/data-model.md`
- **Quickstart**: `specs/001-muvuca-events/quickstart.md`

### Estrutura do Projeto
- `backend/` - Spring Boot API
- `frontend/` - React + Vite + SpaceKit
- `muvuca.db` - SQLite (criado automaticamente)

### Comandos de Execução
```bash
# Backend
cd backend && ./mvnw spring-boot:run

# Frontend
cd frontend && npm run dev
```
<!-- SPECKIT END -->