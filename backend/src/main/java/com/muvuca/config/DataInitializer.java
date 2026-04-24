package com.muvuca.config;

import com.muvuca.model.*;
import com.muvuca.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(
            UsuarioRepository usuarioRepo,
            EmpresaRepository empresaRepo,
            EventoRepository eventoRepo,
            InteresseRepository interesseRepo
    ) {
        return args -> {
            if (usuarioRepo.count() > 0) {
                return;
            }

            Usuario u1 = new Usuario();
            u1.setEmail("alice@exemplo.com");
            u1.setSenha("senha123");
            u1.setNome("Alice Santos");
            u1.setBio("Apaixonada por rock e eventos culturais. Organizadora de eventos há 5 anos!");
            u1.setFotoUrl("https://i.pravatar.cc/150?img=5");
            u1.setCreatedAt(LocalDateTime.now());

            Usuario u2 = new Usuario();
            u2.setEmail("bruno@exemplo.com");
            u2.setSenha("senha123");
            u2.setNome("Bruno Oliveira");
            u2.setBio("Mestre de RPG e contador de histórias. Criando mundos há 10 anos!");
            u2.setFotoUrl("https://i.pravatar.cc/150?img=3");
            u2.setCreatedAt(LocalDateTime.now());

            Usuario u3 = new Usuario();
            u3.setEmail("carla@exemplo.com");
            u3.setSenha("senha123");
            u3.setNome("Carla Mendes");
            u3.setBio("DJ e produtora cultural. Trazendo a melhor música para você!");
            u3.setFotoUrl("https://i.pravatar.cc/150?img=9");
            u3.setCreatedAt(LocalDateTime.now());

            Usuario u4 = new Usuario();
            u4.setEmail("daniel@exemplo.com");
            u4.setSenha("senha123");
            u4.setNome("Daniel Ferreira");
            u4.setBio("Desenvolvedor e organizador de meetups tech. Conectando pessoas!");
            u4.setFotoUrl("https://i.pravatar.cc/150?img=8");
            u4.setCreatedAt(LocalDateTime.now());

            Usuario u5 = new Usuario();
            u5.setEmail("evaluate@exemplo.com");
            u5.setSenha("senha123");
            u5.setNome("Evaluate Silva");
            u5.setBio("Geek, gamer e amante de quadrinhos. Sempre pronto para uma aventura!");
            u5.setFotoUrl("https://i.pravatar.cc/150?img=16");
            u5.setCreatedAt(LocalDateTime.now());

            u1 = usuarioRepo.save(u1);
            u2 = usuarioRepo.save(u2);
            u3 = usuarioRepo.save(u3);
            u4 = usuarioRepo.save(u4);
            u5 = usuarioRepo.save(u5);

            Empresa emp1 = new Empresa();
            emp1.setNome("Muvuca Club");
            emp1.setDescricao("O melhor espaço de eventos geek em São Paulo. Shows, RPG, convenções e muito mais!");
            emp1.setEndereco("Rua Augusta, 1234 - Bela Vista, São Paulo");
            emp1.setLinkSite("https://muvucaclub.com.br");
            emp1.setFotoUrl("https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400");
            emp1.setUsuarioId(u1.getId());
            emp1.setCreatedAt(LocalDateTime.now());

            Empresa emp2 = new Empresa();
            emp2.setNome("Taverna Geek");
            emp2.setDescricao("Bar temático com mesas de RPG, boardgames e noites de quiz!");
            emp2.setEndereco("Rua dos Pinheiros, 567 - Pinheiros, São Paulo");
            emp2.setLinkSite("https://tavernageek.com.br");
            emp2.setFotoUrl("https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400");
            emp2.setUsuarioId(u2.getId());
            emp2.setCreatedAt(LocalDateTime.now());

            Empresa emp3 = new Empresa();
            emp3.setNome("Arena Eventos");
            emp3.setDescricao("Espaço multiuso para shows, festas e corporativos.");
            emp3.setEndereco("Av. Paulista, 1000 - Bela Vista, São Paulo");
            emp3.setLinkSite("https://arenaeventos.com.br");
            emp3.setFotoUrl("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400");
            emp3.setUsuarioId(u3.getId());
            emp3.setCreatedAt(LocalDateTime.now());

            emp1 = empresaRepo.save(emp1);
            emp2 = empresaRepo.save(emp2);
            emp3 = empresaRepo.save(emp3);

            u1.setEmpresaId(emp1.getId());
            u2.setEmpresaId(emp2.getId());
            u3.setEmpresaId(emp3.getId());
            usuarioRepo.save(u1);
            usuarioRepo.save(u2);
            usuarioRepo.save(u3);

            Evento e1 = new Evento();
            e1.setNome("Rock no Porão");
            e1.setDescricao("Um show de rock clássico com bandas locais. Traga sua energia! Guitarras, baixos e muita distorção.");
            e1.setData(LocalDate.of(2026, 5, 15));
            e1.setHora(LocalTime.of(21, 0));
            e1.setLocal("Muvuca Club");
            e1.setCidade("São Paulo");
            e1.setCategoria(Categoria.SHOW);
            e1.setPreco(new BigDecimal("25.00"));
            e1.setAutorId(u1.getId());
            e1.setCreatedAt(LocalDateTime.now());

            Evento e2 = new Evento();
            e2.setNome("Encontro RPG");
            e2.setDescricao("Uma sessão de RPG narrada. Todos são bem-vindos, novices Included! Traga seu personagem ou crie um novo.");
            e2.setData(LocalDate.of(2026, 5, 20));
            e2.setHora(LocalTime.of(14, 0));
            e2.setLocal("Taverna Geek");
            e2.setCidade("São Paulo");
            e2.setCategoria(Categoria.RPG);
            e2.setPreco(BigDecimal.ZERO);
            e2.setAutorId(u2.getId());
            e2.setCreatedAt(LocalDateTime.now());

            Evento e3 = new Evento();
            e3.setNome("Resenha Muvuca");
            e3.setDescricao("Um rolê informal pra galera se encontrar e bater papo. Sem compromisso, só vibes!");
            e3.setData(LocalDate.of(2026, 5, 25));
            e3.setHora(LocalTime.of(19, 0));
            e3.setLocal("Praça Roosevelt");
            e3.setCidade("São Paulo");
            e3.setCategoria(Categoria.FESTA);
            e3.setPreco(BigDecimal.ZERO);
            e3.setAutorId(u1.getId());
            e3.setCreatedAt(LocalDateTime.now());

            Evento e4 = new Evento();
            e4.setNome("Noite de Jazz");
            e4.setDescricao("Uma noite relax com boas músicas e drinks especiais. Jazz ao vivo com a banda局部!");
            e4.setData(LocalDate.of(2026, 6, 1));
            e4.setHora(LocalTime.of(20, 0));
            e4.setLocal("Muvuca Club");
            e4.setCidade("São Paulo");
            e4.setCategoria(Categoria.SHOW);
            e4.setPreco(new BigDecimal("45.00"));
            e4.setAutorId(u3.getId());
            e4.setCreatedAt(LocalDateTime.now());

            Evento e5 = new Evento();
            e5.setNome("Feira Geek");
            e5.setDescricao("Quadrinhos, action figures, games e mais! A maior feira nerd da cidade.");
            e5.setData(LocalDate.of(2026, 6, 5));
            e5.setHora(LocalTime.of(10, 0));
            e5.setLocal("Arena Eventos");
            e5.setCidade("São Paulo");
            e5.setCategoria(Categoria.OUTRO);
            e5.setPreco(BigDecimal.ZERO);
            e5.setAutorId(u4.getId());
            e5.setCreatedAt(LocalDateTime.now());

            Evento e6 = new Evento();
            e6.setNome("Festa Junina");
            e6.setDescricao("Comida de junho, forró e zabumba! Arroz doce, pipoca e muito forró!");
            e6.setData(LocalDate.of(2026, 6, 20));
            e6.setHora(LocalTime.of(19, 0));
            e6.setLocal("Arena Eventos");
            e6.setCidade("Campinas");
            e6.setCategoria(Categoria.FESTA);
            e6.setPreco(new BigDecimal("15.00"));
            e6.setAutorId(u1.getId());
            e6.setCreatedAt(LocalDateTime.now());

            Evento e7 = new Evento();
            e7.setNome("Maratona de RPG");
            e7.setDescricao("12 horas de RPG contínuo. Prepare sua história! Múltiplas mesas, múltiplas aventuras.");
            e7.setData(LocalDate.of(2026, 6, 25));
            e7.setHora(LocalTime.of(9, 0));
            e7.setLocal("Taverna Geek");
            e7.setCidade("São Paulo");
            e7.setCategoria(Categoria.RPG);
            e7.setPreco(new BigDecimal("30.00"));
            e7.setAutorId(u2.getId());
            e7.setCreatedAt(LocalDateTime.now());

            Evento e8 = new Evento();
            e8.setNome("Show de Stand-up");
            e8.setDescricao("Risadas garantidas com os melhores comediantes! Humor brasileiro no melhor estilo.");
            e8.setData(LocalDate.of(2026, 7, 1));
            e8.setHora(LocalTime.of(21, 0));
            e8.setLocal("Arena Eventos");
            e8.setCidade("São Paulo");
            e8.setCategoria(Categoria.SHOW);
            e8.setPreco(new BigDecimal("35.00"));
            e8.setAutorId(u3.getId());
            e8.setCreatedAt(LocalDateTime.now());

            Evento e9 = new Evento();
            e9.setNome("Boate Throwback");
            e9.setDescricao("As Hits dos anos 80, 90 e 2000! Nostalgia garantida.");
            e9.setData(LocalDate.of(2026, 7, 10));
            e9.setHora(LocalTime.of(22, 0));
            e9.setLocal("Muvuca Club");
            e9.setCidade("São Paulo");
            e9.setCategoria(Categoria.FESTA);
            e9.setPreco(new BigDecimal("20.00"));
            e9.setAutorId(u1.getId());
            e9.setCreatedAt(LocalDateTime.now());

            Evento e10 = new Evento();
            e10.setNome("Meetup Devs");
            e10.setDescricao("Encontro de desenvolvedores para networking e troca de conhecimento. Talks, code e conexões!");
            e10.setData(LocalDate.of(2026, 7, 15));
            e10.setHora(LocalTime.of(19, 0));
            e10.setLocal("Arena Eventos");
            e10.setCidade("São Paulo");
            e10.setCategoria(Categoria.OUTRO);
            e10.setPreco(BigDecimal.ZERO);
            e10.setAutorId(u4.getId());
            e10.setCreatedAt(LocalDateTime.now());

            eventoRepo.save(e1);
            eventoRepo.save(e2);
            eventoRepo.save(e3);
            eventoRepo.save(e4);
            eventoRepo.save(e5);
            eventoRepo.save(e6);
            eventoRepo.save(e7);
            eventoRepo.save(e8);
            eventoRepo.save(e9);
            eventoRepo.save(e10);

            List<Long[]> interests = List.of(
                new Long[]{u1.getId(), e2.getId()},
                new Long[]{u1.getId(), e3.getId()},
                new Long[]{u1.getId(), e5.getId()},
                new Long[]{u1.getId(), e7.getId()},
                new Long[]{u1.getId(), e10.getId()},
                new Long[]{u2.getId(), e1.getId()},
                new Long[]{u2.getId(), e3.getId()},
                new Long[]{u2.getId(), e4.getId()},
                new Long[]{u2.getId(), e9.getId()},
                new Long[]{u3.getId(), e1.getId()},
                new Long[]{u3.getId(), e2.getId()},
                new Long[]{u3.getId(), e7.getId()},
                new Long[]{u3.getId(), e10.getId()},
                new Long[]{u4.getId(), e1.getId()},
                new Long[]{u4.getId(), e2.getId()},
                new Long[]{u4.getId(), e6.getId()},
                new Long[]{u4.getId(), e7.getId()},
                new Long[]{u4.getId(), e8.getId()},
                new Long[]{u5.getId(), e1.getId()},
                new Long[]{u5.getId(), e2.getId()},
                new Long[]{u5.getId(), e3.getId()},
                new Long[]{u5.getId(), e4.getId()},
                new Long[]{u5.getId(), e5.getId()},
                new Long[]{u5.getId(), e6.getId()},
                new Long[]{u5.getId(), e7.getId()},
                new Long[]{u5.getId(), e8.getId()},
                new Long[]{u5.getId(), e9.getId()},
                new Long[]{u5.getId(), e10.getId()}
            );

            for (Long[] pair : interests) {
                Interesse interesse = new Interesse();
                interesse.setEventoId(pair[1]);
                interesse.setUsuarioId(pair[0]);
                interesse.setCreatedAt(LocalDateTime.now());
                interesseRepo.save(interesse);
            }

            System.out.println("=== Dados de exemplo criados com sucesso! ===");
            System.out.println("Usuários: " + usuarioRepo.count());
            System.out.println("Empresas: " + empresaRepo.count());
            System.out.println("Eventos: " + eventoRepo.count());
            System.out.println("Interesses: " + interesseRepo.count());
        };
    }
}