# Tasks: MUVUCA - Plataforma de Eventos

**Feature**: MUVUCA  
**Plan**: `specs/001-muvuca-events/plan.md`  
**Generated**: 2026-04-23  
**Total Tasks**: 47

---

## Dependency Graph

```
┌─────────────────────────────────────────────────────────────┐
│                      PHASE 1: SETUP                         │
│         (All user stories depend on this phase)             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   PHASE 2: FOUNDATIONAL                     │
│         (Backend base + Frontend base - required)           │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  US1: Cadastro│     │  US2: Login   │     │  US4: Eventos │
│  (Phase 3)    │     │  (Phase 4)    │     │  (Phase 5)    │
└───────────────┘     └───────────────┘     └───────────────┘
        │                     │                     │
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  US3: Criar   │     │  US6: Detalhe │     │  US5: Filtro │
│  (Phase 6)    │     │  (Phase 7)    │     │  (Phase 8)   │
└───────────────┘     └───────────────┘     └───────────────┘
        │                     │                     │
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  US7:Interesse│     │  US8: Cidade  │     │  US9: Busca   │
│  (Phase 9)    │     │  (Phase 10)   │     │  (Phase 11)   │
└───────────────┘     └───────────────┘     └───────────────┘
        │                     │                     │
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     PHASE 12: US10                          │
│                   Visualizar Meus Eventos                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   FINAL: POLISH & SEED                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Setup

**Goal**: Inicializar projetos back-end e front-end com dependências corretas

**Independent Test**: Executar `cd backend && ./mvnw spring-boot:run` e `cd frontend && npm run dev` sem erros

- [x] T001 Criar estrutura de diretórios do projeto MUVUCA em `/home/ronaldo/MUVUCAAPP/`
- [x] T002 [P] Criar projeto Spring Boot em `backend/` via Spring Initializr (Java 17+, Spring Boot 3)
- [x] T003 [P] Configurar `pom.xml` com dependências: Spring Web, Spring Data JPA, Lombok, SQLite JDBC, Hibernate Community Dialect
- [x] T004 [P] Criar projeto React com Vite em `frontend/`
- [x] T005 Instalar Spectre.css no frontend via npm

---

## Phase 2: Foundational

**Goal**: Configurar persistência e base do back-end, estrutura React inicial

**Independent Test**: GET /api/eventos retorna array vazio [] e página Home carrega sem erro

- [x] T006 Configurar `backend/src/main/resources/application.properties` com url jdbc:sqlite:muvuca.db
- [x] T007 Criar classe principal `MuvucaApplication.java` em `backend/src/main/java/com/muvuca/`
- [x] T008 [P] Criar enum `Categoria` em `backend/src/main/java/com/muvuca/model/Categoria.java` (FESTA, SHOW, RPG, OUTRO)
- [x] T009 [P] Criar entidade `Usuario` em `backend/src/main/java/com/muvuca/model/Usuario.java`
- [x] T010 [P] Criar entidade `Evento` em `backend/src/main/java/com/muvuca/model/Evento.java`
- [x] T011 [P] Criar entidade `Interesse` em `backend/src/main/java/com/muvuca/model/Interesse.java`
- [x] T012 Criar `UsuarioRepository` em `backend/src/main/java/com/muvuca/repository/UsuarioRepository.java`
- [x] T013 Criar `EventoRepository` em `backend/src/main/java/com/muvuca/repository/EventoRepository.java`
- [x] T014 Criar `InteresseRepository` em `backend/src/main/java/com/muvuca/repository/InteresseRepository.java`
- [x] T015 [P] Configurar CORS para permitir http://localhost:5173 no back-end
- [x] T016 [P] Criar `App.jsx` em `frontend/src/` com Router básico
- [x] T017 [P] Criar `Navbar.jsx` em `frontend/src/components/` com links Home e Criar Evento
- [x] T018 [P] Criar `api.js` em `frontend/src/services/` com configuração base axios
- [x] T019 [P] Configurar estilo base com Spectre.css em `frontend/src/main.jsx`

---

## Phase 3: US1 - Cadastrar Nova Conta

**Goal**: Permitir cadastro de novos usuários

**Independent Test**: POST /api/usuarios/register com email único e senha retorna 201 Created e usuário é persistido

- [x] T020 Criar DTO `RegisterRequest` em `backend/src/main/java/com/muvuca/dto/RegisterRequest.java`
- [x] T021 Criar DTO `UsuarioResponse` em `backend/src/main/java/com/muvuca/dto/UsuarioResponse.java`
- [x] T022 Criar `UsuarioController` em `backend/src/main/java/com/muvuca/controller/UsuarioController.java` com endpoint POST /api/usuarios/register
- [x] T023 Implementar validação de email único no service
- [x] T024 Implementar hash de senha com BCrypt no service
- [x] T025 [P] Criar página `Register.jsx` em `frontend/src/pages/`
- [x] T026 [P] Criar formulário de cadastro com campos email, senha, confirmar senha
- [x] T027 [P] Integrar formulário com POST /api/usuarios/register
- [x] T028 Adicionar validação client-side para senhas iguais

---

## Phase 4: US2 - Login no Aplicativo

**Goal**: Permitir login de usuários cadastrados

**Independent Test**: POST /api/usuarios/login com credenciais válidas retorna 200 OK com token/sessão

- [x] T029 Criar DTO `LoginRequest` em `backend/src/main/java/com/muvuca/dto/LoginRequest.java`
- [x] T030 Criar DTO `LoginResponse` em `backend/src/main/java/com/muvuca/dto/LoginResponse.java`
- [x] T031 Implementar endpoint POST /api/usuarios/login em `UsuarioController.java`
- [x] T032 Implementar verificação de senha com BCrypt em service
- [x] T033 Implementar geração de token JWT simples para autenticação
- [x] T034 [P] Criar página `Login.jsx` em `frontend/src/pages/`
- [x] T035 [P] Criar formulário de login com campos email e senha
- [x] T036 [P] Implementar armazenamento de token no localStorage
- [x] T037 [P] Implementar contexto de autenticação em React
- [x] T038 Atualizar Navbar para mostrar usuário logado / links de auth

---

## Phase 5: US4 - Descobrir Eventos

**Goal**: Listar todos os eventos disponíveis

**Independent Test**: GET /api/eventos retorna lista de eventos ordenados por data

- [x] T039 Implementar endpoint GET /api/eventos em `EventoController.java`
- [x] T040 Implementar ordenação por data no `EventoRepository`
- [x] T041 [P] Criar `EventCard.jsx` em `frontend/src/components/` com layout SpaceKit
- [x] T042 [P] Criar `EventList.jsx` em `frontend/src/components/` com grid de eventos
- [x] T043 [P] Criar página `Home.jsx` em `frontend/src/pages/`
- [x] T044 [P] Implementar fetch de eventos em Home
- [x] T045 Implementar estado vazio (mensagem quando não há eventos)

---

## Phase 6: US3 - Criar Novo Evento

**Goal**: Permitir que usuários logados criem eventos

**Independent Test**: POST /api/eventos com dados válidos cria evento e retorna 201 Created

- [x] T046 Criar DTO `EventoRequest` em `backend/src/main/java/com/muvuca/dto/EventoRequest.java`
- [x] T047 Criar `EventoService` em `backend/src/main/java/com/muvuca/service/EventoService.java`
- [x] T048 Implementar endpoint POST /api/eventos em `EventoController.java`
- [x] T049 Implementar validação de campos obrigatórios
- [x] T050 Implementar validação de data futura
- [x] T051 [P] Criar `EventForm.jsx` em `frontend/src/components/`
- [x] T052 [P] Criar página `CreateEvent.jsx` em `frontend/src/pages/`
- [x] T053 [P] Implementar formulário com campos: título, descrição, data, hora, local, cidade, categoria, preço
- [x] T054 [P] Adicionar validação client-side
- [x] T055 [P] Integrar com POST /api/eventos (requer token)

---

## Phase 7: US6 - Ver Detalhes de Evento

**Goal**: Exibir página de detalhes completa do evento

**Independent Test**: GET /api/eventos/{id} retorna evento com todos os detalhes

- [x] T056 Implementar endpoint GET /api/eventos/{id} em `EventoController.java`
- [x] T057 [P] Criar página `EventDetail.jsx` em `frontend/src/pages/`
- [x] T058 [P] Exibir todos os campos do evento em layout detalhado
- [x] T059 [P] Adicionar botão de marcar interesse na página de detalhes
- [x] T060 [P] Adicionar link de volta para lista

---

## Phase 8: US5 - Filtrar por Categoria

**Goal**: Permitir filtrar eventos por categoria

**Independent Test**: GET /api/eventos?categoria=RPG retorna apenas eventos da categoria

- [x] T061 Implementar filtro por categoria no `EventoRepository` (query method)
- [x] T062 Implementar parâmetro de query no endpoint GET /api/eventos
- [x] T063 [P] Criar componente de filtro de categoria em `frontend/src/components/`
- [x] T064 [P] Adicionar filtros na página Home
- [x] T065 [P] Implementar atualização de lista ao selecionar filtro

---

## Phase 9: US7 - Marcar Interesse

**Goal**: Permitir marcar/desmarcar interesse em eventos

**Independent Test**: POST /api/interesse/{eventoId} cria registro, DELETE remove

- [x] T066 Implementar endpoint POST /api/interesse/{eventoId} em `InteresseController.java`
- [x] T067 Implementar endpoint DELETE /api/interesse/{eventoId}
- [x] T068 Implementar toggle de interesse (se existe, remove; se não, cria)
- [x] T069 [P] Adicionar botão de interesse no `EventCard.jsx`
- [x] T070 [P] Implementar visualização de estado "interessado" (ícone diferente)
- [x] T071 [P] Implementar verificação de login antes de marcar interesse (redirecionar se não logado)

---

## Phase 10: US8 - Filtrar por Cidade

**Goal**: Permitir filtrar eventos por cidade

**Independent Test**: GET /api/eventos?cidade=São Paulo retorna apenas eventos de São Paulo

- [x] T072 Implementar filtro por cidade no `EventoRepository`
- [x] T073 Implementar parâmetro de query cidade no endpoint GET /api/eventos
- [x] T074 [P] Adicionar seletor de cidade nos filtros da Home
- [x] T075 [P] Combinar filtros de categoria e cidade

---

## Phase 11: US9 - Buscar por Nome

**Goal**: Permitir busca textual por título/descrição

**Independent Test**: GET /api/eventos?busca=RPG retorna eventos contendo "RPG"

- [x] T076 Implementar busca textual no `EventoRepository` (like query)
- [x] T077 Implementar parâmetro de busca no endpoint GET /api/eventos
- [x] T078 [P] Adicionar campo de busca textual na Home
- [x] T079 [P] Implementar debounce na busca (300ms)

---

## Phase 12: US10 - Visualizar Meus Eventos

**Goal**: Listar eventos criados e marcados como interesse

**Independent Test**: GET /api/usuarios/me/eventos retorna eventos do usuário logado

- [x] T080 Implementar endpoint GET /api/usuarios/me/eventos
- [x] T081 Implementar endpoint GET /api/usuarios/me/interesses
- [x] T082 [P] Criar página `MyEvents.jsx` em `frontend/src/pages/`
- [x] T083 [P] Exibir duas seções: "Meus Eventos" e "Eventos de Interesse"
- [x] T084 [P] Adicionar link "Meus Eventos" na Navbar

---

## Final Phase: Polish & Seed

**Goal**: Adicionar dados iniciais e polir experiência

- [x] T085 Criar `data.sql` em `backend/src/main/resources/` com 3 eventos de exemplo
- [ ] T086 Adicionar estilização adicional com Spectre.css
- [ ] T087 Implementar indicator visual para eventos passados
- [ ] T088 Adicionar tratamento de erros genérico com mensagens amigáveis
- [ ] T089 Verificar responsividade mobile
- [ ] T090 Criar script/README com instruções de execução

---

## Summary

| Fase | User Story | Tasks |
|------|-----------|-------|
| 1 | Setup | 5 |
| 2 | Foundational | 14 |
| 3 | US1: Cadastro | 9 |
| 4 | US2: Login | 10 |
| 5 | US4: Descobrir | 7 |
| 6 | US3: Criar Evento | 10 |
| 7 | US6: Detalhes | 5 |
| 8 | US5: Filtro Categoria | 5 |
| 9 | US7: Interesse | 6 |
| 10 | US8: Filtro Cidade | 4 |
| 11 | US9: Busca | 4 |
| 12 | US10: Meus Eventos | 5 |
| Final | Polish | 6 |

**Total**: 47 tarefas

**Paralelismo identificado**: T002-T005 (setup inicial), T008-T011 (entidades), T016-T019 (frontend base), T025-T028 (cadastro frontend), T034-T038 (login frontend) podem ser executados em paralelo se dependências permitirem.

**MVP Scope Sugerido** (foco apresentação):
- Phase 1-2 completos
- US4 (descobrir eventos) - demonstra valor imediato
- US3 (criar evento) - funcionalidade central
- US1+US2 (cadastro/login) - habilita criação

Isso totaliza ~35 tarefas para um MVP funcional.