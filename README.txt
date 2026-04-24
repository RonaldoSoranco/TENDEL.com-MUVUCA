# TENDEL - Plataforma de Eventos

Sistema de gerenciamento de eventos sociais para compra e venda de ingressos.

## Funcionalidades

- **Eventos**: Criação, edição e listagem de eventos (shows, festas, rpg, etc)
- **Ingressos**: Compra de ingressos para eventos
- **Perfis**: Perfis de usuários e empresas
- **Interesses**: Sistema de interesses em eventos

## Tech Stack

- **Backend**: Java 17 + Spring Boot 3 + SQLite
- **Frontend**: React + Vite

## Como Iniciar

### Backend

```bash
make run
```

O backend estará disponível em http://localhost:8080

O frontend estará disponível em http://localhost:5173 (ou 5174 se a 5173 estiver em uso)

## Credenciais de Demo

- Email: `alice@exemplo.com` / Senha: `senha123`
- Email: `bruno@exemplo.com` / Senha: `senha123`

## Estrutura do Projeto

```
/backend      - API Spring Boot
/frontend    - Aplicação React
muvuca.db    - Banco de dados SQLite
```

## API Endpoints

- `POST /api/usuarios/register` - Cadastrar usuário
- `POST /api/usuarios/login` - Login
- `GET /api/usuarios/me` - Perfil do usuário logado
- `GET /api/eventos` - Listar eventos
- `POST /api/eventos` - Criar evento
- `GET /api/eventos/:id` - Detalhes do evento
- `POST /api/empresa` - Criar empresa
- `POST /api/interesses` - Registrar interesse
