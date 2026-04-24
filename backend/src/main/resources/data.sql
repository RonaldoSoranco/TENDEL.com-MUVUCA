-- Insert seed usuarios (senhas em texto plano para modo desenvolvimento)
INSERT INTO usuarios (email, senha, nome, created_at) VALUES 
('alice@exemplo.com', 'senha123', 'Alice', datetime('now')),
('bruno@exemplo.com', 'senha123', 'Bruno', datetime('now')),
('teste@teste.com', 'teste123', 'Teste', datetime('now'));

-- Insert seed events
INSERT INTO eventos (nome, descricao, data, hora, local, cidade, categoria, preco, autor_id, created_at)
VALUES 
('Rock no Porão', 'Um show de rock clássico com bandas locais. Traga sua energia!', '2026-05-15', '21:00', 'Porão daelastic', 'São Paulo', 'SHOW', 25.00, 1, datetime('now')),
('Encontro RPG', 'Uma sessão de RPG narrada. Todos são bem-vindos, novices Included!', '2026-05-20', '14:00', 'Centro Cultural', 'São Paulo', 'RPG', 0.00, 1, datetime('now')),
('Resenha Muvuca', 'Um rolê informal pra galera se encontrar e bater papo.', '2026-05-25', '19:00', 'Praça Roosevelt', 'São Paulo', 'FESTA', 0.00, 1, datetime('now')),
('Noite de Jazz', 'Uma noite relax com boas músicas e drinks especiais.', '2026-06-01', '20:00', 'Blue Note', 'São Paulo', 'SHOW', 45.00, 1, datetime('now')),
('Feira Geek', 'Quadrinhos, action figures, games e mais!', '2026-06-05', '10:00', 'Pavilhão de Eventos', 'São Paulo', 'OUTRO', 0.00, 1, datetime('now')),
('Festa Junina', 'Comida de junho, forró e muita zabumba!', '2026-06-20', '19:00', 'Clubinho', 'Campinas', 'FESTA', 15.00, 1, datetime('now')),
('Maratona de RPG', '12 horas de RPG contínuo. Prepare sua história!', '2026-06-25', '09:00', 'Espaço dos Aventurheiros', 'Rio de Janeiro', 'RPG', 30.00, 1, datetime('now')),
('Show de Stand-up', 'Risadas garantidas com os melhores comediantes!', '2026-07-01', '21:00', 'Comedy Club', 'São Paulo', 'SHOW', 35.00, 1, datetime('now')),
('Boate Throwback', 'As Hits dos anos 80, 90 e 2000!', '2026-07-10', '22:00', 'Retrô Club', 'São Paulo', 'FESTA', 20.00, 1, datetime('now')),
('Meetup Devs', 'Encontro de desenvolvedores para networking e troca de conhecimento.', '2026-07-15', '19:00', 'TechHub', 'São Paulo', 'OUTRO', 0.00, 1, datetime('now'));

-- Insert empresas de exemplo
INSERT INTO empresas (nome, descricao, endereco, link_site, usuario_id, created_at)
VALUES 
('Porão daelastic', 'O melhor espaço de rock em São Paulo. Shows ao vivo, ambiente rock n roll.', 'Rua Augusta, 1234 - Bela Vista', 'https://porao.com.br', 1, datetime('now')),
('Blue Note', 'Jazz bar com música ao vivo e drinks artesanais.', 'Rua dos pinchers, 567 - Village', 'https://bluenote.com.br', 1, datetime('now')),
('Centro Cultural', 'Espaço multiuso para eventos, exposições e encontros.', 'Av. Paulista, 1000', NULL, 1, datetime('now'));