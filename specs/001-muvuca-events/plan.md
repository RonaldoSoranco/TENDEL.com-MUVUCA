# Implementation Plan: MUVUCA - Plataforma de Eventos

**Branch**: `[001-muvuca-events]` | **Date**: 2026-04-23 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification with tech stack Java/SQLite/React/SpaceKit

## Summary

Plataforma para descoberta e gerenciamento de eventos (rolês), com back-end em Java (Spring Boot 3 + SQLite) e front-end em React com SpaceKit (Spectre.css). Objetivo: portabilidade máxima para apresentação na faculdade - servidor direto do notebook.

## Technical Context

**Language/Version**: Java 17+  
**Primary Dependencies**: Spring Boot 3, Spring Web, Spring Data JPA, Lombok, SQLite JDBC, Spectre.css (SpaceKit)  
**Storage**: SQLite (arquivo único `muvuca.db`)  
**Testing**: JUnit 5 (built-in Spring Boot)  
**Target Platform**: Desktop browser, executado localmente  
**Project Type**: Web application (full-stack)  
**Performance Goals**: <2s carregamento inicial, resposta API <500ms  
**Constraints**: Portátil - sem necessidade de banco externoinstalled  
**Scale/Scope**: MVP com ~10-500 eventos

## Constitution Check

✅ Gate: Portabilidade verificada - SQLite não requer instalação  
✅ Gate: Stack tecnológico definido pelo usuário  
✅ Gate: Escopo MVP com funcionalidades essenciais

## Project Structure

### Source Code

```text
muvuca-app/
├── backend/                    # Spring Boot
│   ├── src/main/java/com/muvuca/
│   │   ├── MuvucaApplication.java
│   │   ├── model/
│   │   │   ├── Evento.java
│   │   │   └── Usuario.java
│   │   ├── repository/
│   │   │   ├── EventoRepository.java
│   │   │   └── UsuarioRepository.java
│   │   ├── controller/
│   │   │   ├── EventoController.java
│   │   │   └── UsuarioController.java
│   │   └── service/
│   │       └── EventoService.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql          # Seed inicial
│   └── pom.xml
│
├── frontend/                  # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── EventList.jsx
│   │   │   └── EventForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── CreateEvent.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── muvuca.db                # SQLite (criado automaticamente)
```

## Phase 1: Configuração do Ambiente e Dependências

### Back-end (Spring Boot)
1. Criar projeto via Spring Initializr (spring boot 3, java 17+)
2. Adicionar dependências:
   - Spring Web
   - Spring Data JPA
   - Lombok
   - SQLite JDBC Driver
   - Hibernate Community Dialect
3. Configurar `application.properties`:
   ```properties
   spring.datasource.url=jdbc:sqlite:muvuca.db
   spring.datasource.driver-class-name=org.sqlite.JDBC
   spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect
   spring.jpa.hibernate.ddl-auto=update
   ```

### Front-end (React + SpaceKit)
1. Inicializar projeto com Vite
2. Instalar Spectre.css (SpaceKit)
3. Configurar estilo base

## Phase 2: Modelo de Dados e Persistência

### Entidades
- **Evento**: id, nome, descricao, data, hora, local, cidade, categoria, preco, imagemUrl, autorId, createdAt
- **Usuario**: id, email, senha, nome, createdAt
- **Interesse**: id, eventoId, usuarioId, createdAt

### Repositórios
- EventoRepository (JpaRepository)
- UsuarioRepository (JpaRepository)
- InteresseRepository (JpaRepository)

## Phase 3: Camada de API (REST)

### Endpoints
| Método | Endpoint | Descrição |
|--------|----------|----------|
| GET | /api/eventos | Listar todos eventos |
| GET | /api/eventos/{id} | Detalhar evento |
| POST | /api/eventos | Criar evento |
| DELETE | /api/eventos/{id} | Excluir evento |
| POST | /api/usuarios/register | Cadastrar usuário |
| POST | /api/usuarios/login | Login |
| POST | /api/interesse/{eventoId} | Marcar interesse |
| DELETE | /api/interesse/{eventoId} | Remover interesse |

### CORS
Configurar `@CrossOrigin(origins = "http://localhost:5173")` ou porta 3000

## Phase 4: Front-end (React + SpaceKit)

### Componentes
- `Navbar`: Logo MUVUCA, links Home/Criar
- `EventCard`: Card com SpaceKit (`.card`, `.card-image`, `.card-title`)
- `EventList`: Grid de eventos
- `EventForm`: Formulário criar evento

### Pages
- `Home`: Lista de eventos + filtros
- `CreateEvent`: Página criar evento

## Phase 5: Integração e Seed

### Fetch
- Service `api.js` com fetch/axios para endpoints

### Seed Inicial
Popular banco com 3 eventos exemplo:
1. "Rock no Porão" - Show
2. "Encontro RPG" - RPG
3. "Resenha Muvuca" - Festa

## Execution Instructions

### Rodar o projeto (duas terminal)

**Terminal 1 - Back-end:**
```bash
cd backend
./mvnw spring-boot:run
# ou: java -jar target/muvuca-0.0.1-SNAPSHOT.jar
```

**Terminal 2 - Front-end:**
```bash
cd frontend
npm run dev
```

Acesse: http://localhost:5173

## Artifacts Gerados

- [ ] Backend Spring Boot configurado
- [ ] Entidades e repositórios criados
- [ ] APIs REST implementadas
- [ ] Frontend React com SpaceKit
- [ ] Componentes UI funcionais
- [ ] Integração completa
- [ ] Seed de exemplo