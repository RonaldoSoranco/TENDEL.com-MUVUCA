# Quickstart: MUVUCA

## Prerequisites

- Java 17+
- Node.js 18+
- Maven

## Setup

### 1. Back-end

```bash
cd backend
./mvnw install
./mvnw spring-boot:run
```

O banco `muvuca.db` será criado automaticamente na raiz do backend.

### 2. Front-end

```bash
cd frontend
npm install
npm run dev
```

### 3. Acessar

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api/eventos

## Desenvolvimento

### Endpoints disponíveis

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/eventos | Listar todos |
| GET | /api/eventos/{id} | Detalhar |
| POST | /api/eventos | Criar |
| DELETE | /api/eventos/{id} | Excluir |

## Seed

O banco já vem com 3 eventos de exemplo ao iniciar.

## Apresentação

Para apresentar na faculdade:
1. Execute `npm run dev` (frontend)
2. Execute `./mvnw spring-boot:run` (backend)
3. Abra http://localhost:5173 no navegador

Tudo rodará do seu notebook - sem dependências externas!