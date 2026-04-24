# Feature Specification: MUVUCA - Plataforma de Eventos

**Feature Branch**: `[001-muvuca-events]`  
**Created**: 2026-04-23  
**Status**: Draft  
**Input**: "Vou criar um aplicativo chamado MUVUCA. A ideia é uma plataforma para gerenciar e descobrir 'rolês' (eventos, festas, encontros de RPG e shows). O objetivo principal é ser um projeto simples, focado em portabilidade para eu apresentar na faculdade rodando direto do meu notebook. Vou criar back-end em Java com SQLite e front-end em React, utilizando SpaceKit (Spectre). Autenticação básica email e senha, múltiplas cidades e locais, apenas interessado."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Cadastrar nova conta de usuário (Priority: P1)

Como novo usuário, quiero me cadastrar no app para poder criar e gerenciar eventos.

**Why this priority**: Sem autenticação, não há como rastrear eventos criados por cada usuário. É pré-requisito para todas as outras funcionalidades personalizáveis.

**Independent Test**: Pode ser testado independentemente criando uma conta com email e senha válidos, e verificando que o sistema aceita o cadastro.

**Acceptance Scenarios**:

1. **Given** o usuário não possui conta, **When** preenche email válido, senha com pelo menos 6 caracteres e confirma senha iguais, **Then** conta é criada com sucesso e acesso é permitted.
2. **Given** o usuário tenta cadastrar com email já existente, **When** submete o formulário, **Then** sistema exibe erro informativo.
3. **Given** o usuário tenta cadastrar com senhas diferentes, **When** submete o formulário, **Then** sistema exibe erro indicando divergência.

---

### User Story 2 - Login no aplicativo (Priority: P1)

Como usuário cadastrado, quero fazer login para acessar minhas funcionalidades.

**Why this priority**: Funcionalidade básica de autenticação necessária para operar o app.

**Independent Test**: Pode ser testado fazendo login com credenciais válidas e verificando acesso ao sistema.

**Acceptance Scenarios**:

1. **Given** usuário possui conta, **When** insere email e senha corretos, **Then** login é bem-sucedido e acesso ao sistema é concedido.
2. **Given** usuário tenta login com senha incorreta, **When** submete credenciais, **Then** erro informativo é exibido.
3. **Given** usuário tenta login com email não cadastrado, **When** submete credenciais, **Then** erro informativo é exibido.

---

### User Story 3 - Criar novo evento (Priority: P1)

Como usuário logado, quero criar um novo evento para divulgação.

**Why this priority**: Funcionalidade central do app - a principal razão de existir da plataforma.

**Independent Test**: Pode ser testado criando um evento completo e verificando que aparece na listagem.

**Acceptance Scenarios**:

1. **Given** usuário está logado, **When** preenche título, descrição, data/horário, local, categoria e preço, **Then** evento é criado e salvo.
2. **Given** usuário tenta criar evento sem título, **When** submete formulário, **Then** erro indicando campo obrigatório.
3. **Given** usuário tenta criar evento com data no passado, **When** seleciona data, **Then** sistema alerta ou rejeita a data.

---

### User Story 4 - Descobrir eventos (Priority: P1)

Como usuário (logado ou não), quiero visualizar eventos disponíveis na plataforma.

**Why this priority**: Funcionalidade de discovery - permite que qualquer um visualize o conteúdo do app.

**Independent Test**: Pode ser testado acessando a página inicial e verificando listagem de eventos.

**Acceptance Scenarios**:

1. **Given** existem eventos cadastrados, **When** usuário acessa a página inicial, **Then** lista de eventos é exibida em ordem cronológica.
2. **Given** não existem eventos, **When** usuário acessa a página inicial, **Then** mensagem indicando ausência de eventos é exibida.

---

### User Story 5 - Filtrar eventos por categoria (Priority: P2)

Como usuário, quero filtrar eventos por categoria para encontrar mais rápido o que procuro.

**Why this priority**: Melhora significamente a experiência de navegação, especialmente com muitos eventos.

**Independent Test**: Pode ser testado selecionando uma categoria e verificando que apenas eventos daquilo tipo aparecem.

**Acceptance Scenarios**:

1. **Given** existem eventos de múltiplas categorias, **When** seleciona filtro "RPG", **Then** apenas eventos de RPG são exibidos.
2. **Given** filtro não corresponde a nenhum evento, **Then** mensagem indicando resultado vazio é exibida.

---

### User Story 6 - Ver detalhes de um evento (Priority: P1)

Como usuário, quiero ver informações completas de um evento específico.

**Why this priority**: Permite ao usuário tomar decisão sobre interesse no evento.

**Independent Test**: Pode ser testadoclicando em um evento na lista e verificando que todos os detalhes aparecem.

**Acceptance Scenarios**:

1. **Given** evento existe no sistema, **When** usuário acessa página de detalhe, **Then** todas as informações (título, descrição, local, data, preço, categoria) são exibidas.
2. **Given** evento tem imagem associada, **When**.visualiza detalhes, **Then** imagem é exibida.

---

### User Story 7 - Marcar interesse em evento (Priority: P2)

Como usuário logado, quiero marcar que tenho interesse em um evento.

**Why this priority**: Permite que usuários acompanhem eventos de interesse sem necessidade de confirmação formal.

**Independent Test**: Pode ser testado marcando interesse e verificando que o evento aparece na lista pessoal.

**Acceptance Scenarios**:

1. **Given** usuário está logado, **When** clica em "interessado" em um evento, **Then** ação é registrada e ícone muda para indicar estado.
2. **Given** usuário já marcado como interessado, **When** clica novamente, **Then** interesse é removido (toggle).
3. **Given** usuário não está logado, **When** tenta marcar interesse, **Then** redirecionamento para login ocorre.

---

### User Story 8 - Filtrar eventos por cidade (Priority: P2)

Como usuário, quiero filtrar eventos por cidade para encontrar eventos próximos.

**Why this priority**: Suporte a múltiplas cidades é requisito explícito do usuário.

**Independent Test**: Pode ser testado selecionando uma cidade e verificando que apenas eventos daquilo local são exibidos.

**Acceptance Scenarios**:

1. **Given** existem eventos em múltiplas cidades, **When** seleciona filtro "São Paulo", **Then** apenas eventos em São Paulo são exibidos.

---

### User Story 9 - Buscar eventos por nome (Priority: P3)

Como usuário, quero buscar eventos pelo nome para encontrar algo específico.

**Why this priority**: Funcionalidade padrão em qualquer plataforma de discovery.

**Independent Test**: Pode ser testadodigitando um termo de busca e verificando resultados correspondentes.

**Acceptance Scenarios**:

1. **Given** existem eventos com "RPG" no nome, **When** busca por "RPG", **Then** eventos correspondentes são retornados.
2. **Given** busca não retorna resultados, **Then** mensagem informativa é exibida.

---

### User Story 10 - Visualizar meus eventos (Priority: P2)

Como usuário logado, quiero ver os eventos que criei e os que marquei interesse.

**Why this priority**: Permite gestão pessoal dos eventos.

**Independent Test**: Pode ser testado acessando perfil e verificando listas separadas de eventos criados e interessados.

**Acceptance Scenarios**:

1. **Given** usuário logado possui eventos criados e interesados, **When** acessa "meus eventos", **Then** duas listas separadas são exibidas.
2. **Given** usuário logado não tem eventos criados, **Then** lista vazia com mensagem informativa é exibida.

---

### Edge Cases

- O que acontece quando um evento criado é excluído pelo autor? Usuários que marcaram interesse são notificados?
- Como lidar com eventos com data/horário já passou(s)? Devem aparecer com indicador visual de "encerrado"?
- Limitação de caracteres para título e descrição? Há um máximo razoável?
- Upload de imagem é obrigatório ou opcional? Quais formatos suportados?
-同一Local pode sed sediado em mais de um evento simultâneo? Suporte a locais idênticos?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Sistema DEVE permitir cadastro de novos usuários com email único e senha de pelo menos 6 caracteres.
- **FR-002**: Sistema DEVE validar que o email possui formato válido durante cadastro.
- **FR-003**: Sistema DEVE garantir que cada email seja único no sistema.
- **FR-004**: Sistema DEVE autenticar usuários através de email e senha.
- **FR-005**: Sistema DEVE permitir que usuários logados criem eventos com título, descrição, data/horário, local, categoria e preço.
- **FR-006**: Sistema DEVE suportar múltiplas cidades como localização dos eventos.
- **FR-007**: Sistema DEVE atribuir automaticamente a data de criação ao evento.
- **FR-008**: Sistema DEVE listar todos os eventos em ordem cronológica (próximos primeiro).
- **FR-009**: Sistema DEVE permitir filtrar eventos por categoria (Festa, Show, RPG, Outro).
- **FR-010**: Sistema DEVE permitir filtrar eventos por cidade.
- **FR-011**: Sistema DEVE permitir buscas textuais por título ou descrição do evento.
- **FR-012**: Sistema DEVE exibir página de detalhes completa para cada evento.
- **FR-013**: Sistema DEVE permitir que usuários logados marquem interesse em eventos.
- **FR-014**: Sistema DEVE permitir toggle (marcar/desmarcar) de interesse.
- **FR-015**: Sistema DEVE listar eventos criados pelo usuário logado.
- **FR-016**: Sistema DEVE listar eventos que o usuário marcou interesse.
- **FR-017**: Sistema DEVE permitir upload de imagem opcional para o evento.
- **FR-018**: Sistema DEVE garantir que apenas o autor possa editar ou excluir seu próprio evento.

### Key Entities *(include if data involved)*

- **Usuário**: ID único, email, senha hasheada, nome опциональный, data de cadastro.
- **Evento**: ID único, título, descrição, data/horário, local (cidade + endereço), categoria, preço (ou gratuito), imagem (opcional), ID do autor, data de criação.
- **Interesse**: ID único, ID do evento, ID do usuário, data/horário da ação.

### Non-Functional Requirements

- **NR-001**: Tempo de carregamento da listagem inicial deve ser inferior a 2 segundos.
- **NR-002**: O sistema deve funcionar offline para visualização de eventos já carregados (futuro, não para MVP).
- **NR-003**: Imagens de eventos devem ser redimensionadas para máximo 1MB.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Usuários conseguem completar cadastro em menos de 2 minutos.
- **SC-002**: Usuários conseguem criar um evento em menos de 3 minutos.
- **SC-003**: 90% dos usuários conseguem concluir tarefa principal (criar ou visualizar evento) na primeira tentativa.
- **SC-004**: Sistema suporta pelo menos 500 eventos simultâneos sem degradação perceptível.
- **SC-005**: Usuários podem marcar interesse em evento com um único clique.

## Assumptions

- Usuários têm acesso à internet estável durante uso do aplicativo.
- Imagens de eventos são opcionais - sem imagem, um placeholder visual será exibido.
- A categoria "Outro" cubre casos não previstos (meetups, workshops, etc.).
- Sistema será usado primariamente em navegadores desktop (apresentação na faculdade), mas deve funcionar em mobile.
- Não há necessidade de sistema de busca avançada (por data, preço) no MVP.
- Limite razoável: título até 100 caracteres, descrição até 2000 caracteres.
- Formatos de imagem aceitos: JPG e PNG apenas.