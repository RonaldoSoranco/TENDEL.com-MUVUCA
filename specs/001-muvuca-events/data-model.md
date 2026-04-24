# Data Model: MUVUCA

## Entidades

### Usuario

| Campo | Tipo | Restrições |
|-------|------|-----------|
| id | Long | PK, auto-increment |
| email | String | ÚNICO, não nulo, formato email |
| senha | String | hash BCrypt, não nulo |
| nome | String | opcional |
| createdAt | LocalDateTime | auto-definido |

---

### Evento

| Campo | Tipo | Restrições |
|-------|------|-----------|
| id | Long | PK, auto-increment |
| nome | String | não nulo, máx 100 chars |
| descricao | String | máx 2000 chars |
| data | LocalDate | não nulo |
| hora | LocalTime | não nulo |
| local | String | não nulo |
| cidade | String | não nulo |
| categoria | Enum | FESTA, SHOW, RPG, OUTRO |
| preco | BigDecimal | default 0 |
| imagemUrl | String | opcional |
| autorId | Long | FK para Usuario |
| createdAt | LocalDateTime | auto-definido |

---

### Interesse

| Campo | Tipo | Restrições |
|-------|------|-----------|
| id | Long | PK, auto-increment |
| eventoId | Long | FK para Evento |
| usuarioId | Long | FK para Usuario |
| createdAt | LocalDateTime | auto-definido |

**Unique Constraint**: (eventoId, usuarioId) único

---

## Relacionamentos

```
Usuario 1--n Evento (autor)
Usuario 1--n Interesse
Evento 1--n Interesse
```

---

## Validações (Constraints)

- Email: formato válido (@ contem)
- Senha: mínimo 6 caracteres
- Nome Evento: obrigatório, máx 100
- Descrição: máx 2000
- Data: não pode ser no passado
- Preço: não negativo
- Categoria: valores permitidos apenas

---

## Índices

- idx_evento_categoria (categoria)
- idx_evento_cidade (cidade)
- idx_evento_data (data)
- idx_interesse_usuario (usuarioId)