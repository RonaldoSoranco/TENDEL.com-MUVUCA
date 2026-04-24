import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Carrossel from '../components/Carrossel'

const CATEGORIAS = [
  { valor: '', label: 'Todos' },
  { valor: 'FESTA', label: 'Festas' },
  { valor: 'SHOW', label: 'Shows' },
  { valor: 'RPG', label: 'RPG' },
  { valor: 'OUTRO', label: 'Outros' }
]

const CIDADES = ['', 'São Paulo', 'Campinas', 'Rio de Janeiro']

const IMAGES = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511578314322-b379e24781db?w=600&h=400&fit=crop',
]

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop'

function getImagem(evento) {
  if (evento.imagemUrl) return evento.imagemUrl
  return IMAGES[(evento.id - 1) % IMAGES.length]
}

function Loading() {
  return (
    <div style={styles.grid}>
      {[1,2,3,4,5,6].map(i => (
        <div key={i} style={styles.card}>
          <div style={styles.skeleton} />
          <div style={styles.cardBody}>
            <div style={{...styles.skeletonRow, width:'40%'}} />
            <div style={{...styles.skeletonRow, width:'80%'}} />
            <div style={{...styles.skeletonRow, width:'60%'}} />
          </div>
        </div>
      ))}
    </div>
  )
}

function Vazio({ onLimpar }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={styles.vazio}
    >
      <div style={{fontSize:'4rem'}}>🎉</div>
      <h3 style={{marginBottom:'0.5rem',color:'#475569'}}>Nenhum evento encontrado</h3>
      <p style={{color:'#94a3b8',marginBottom:'1rem'}}>Tente ajustar seus filtros</p>
      <button onClick={onLimpar} style={styles.botaoPrimary}>Limpar Filtros</button>
    </motion.div>
  )
}

export default function Home() {
  const [eventos, setEventos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [categoria, setCategoria] = useState('')
  const [cidade, setCidade] = useState('')
  const [busca, setBusca] = useState('')

  useEffect(() => {
    carregar()
  }, [categoria, cidade, busca])

  async function carregar() {
    setCarregando(true)
    setErro(null)
    try {
      const params = new URLSearchParams()
      if (categoria) params.append('categoria', categoria)
      if (cidade) params.append('cidade', cidade)
      if (busca) params.append('busca', busca)
      
      const res = await fetch(`/api/eventos${params.toString() ? '?' + params.toString() : ''}`)
      if (!res.ok) throw new Error('Falha ao carregar')
      const data = await res.json()
      setEventos(data || [])
    } catch (err) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }

  function limpar() {
    setCategoria('')
    setCidade('')
    setBusca('')
  }

  const temFiltros = categoria || cidade || busca
  const eventosDestaque = eventos.slice(0, 5)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <Carrossel eventos={eventosDestaque} />

      <div style={styles.filtros}>
        <div style={styles.tabs}>
          {CATEGORIAS.map(cat => (
            <button
              key={cat.valor}
              onClick={() => setCategoria(cat.valor)}
              style={categoria === cat.valor ? styles.tabAtiva : styles.tab}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.busca}>
        <input
          type="text"
          placeholder="Buscar eventos..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={styles.input}
        />
        <select value={cidade} onChange={e => setCidade(e.target.value)} style={styles.select}>
          <option value="">Todas cidades</option>
          {CIDADES.filter(c => c).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {temFiltros && <button onClick={limpar} style={styles.botaoLimpar}>✕ Limpar</button>}
      </div>

      {carregando ? (
        <Loading />
      ) : erro ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.erro}>
          <p>Erro ao carregar eventos</p>
          <button onClick={carregar} style={styles.botaoRetry}>Tentar novamente</button>
        </motion.div>
      ) : eventos.length === 0 ? (
        <Vazio onLimpar={limpar} />
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={styles.grid}
        >
          {eventos.map(evento => (
            <motion.div key={evento.id} variants={itemVariants}>
              <Link to={`/eventos/${evento.id}`} style={styles.cardLink}>
                <div style={styles.card}>
                  <img 
                    src={getImagem(evento)} 
                    alt={evento.nome} 
                    style={styles.cardImg}
                    onError={(e) => { e.target.src = DEFAULT_IMG }}
                  />
                  <div style={styles.cardBody}>
                    <span style={{
                      ...styles.badge,
                      background: evento.categoria === 'FESTA' ? '#fce7f3' :
                                 evento.categoria === 'SHOW' ? '#ede9fe' :
                                 evento.categoria === 'RPG' ? '#fef3c7' : '#f1f5f9',
                      color: evento.categoria === 'FESTA' ? '#be1857' :
                             evento.categoria === 'SHOW' ? '#7c3aed' :
                             evento.categoria === 'RPG' ? '#d97706' : '#475569'
                    }}>
                      {evento.categoria}
                    </span>
                    <h3 style={styles.cardTitulo}>{evento.nome}</h3>
                    <div style={styles.cardMeta}>
                      <span>📅 {new Date(evento.data).toLocaleDateString('pt-BR', { day:'numeric', month:'short' })}</span>
                      <span>📍 {evento.cidade}</span>
                    </div>
                    <div style={{
                      ...styles.preco,
                      color: evento.preco > 0 ? '#ec4899' : '#10b981'
                    }}>
                      {evento.preco > 0 ? `R$ ${parseFloat(evento.preco).toFixed(2)}` : 'Grátis'}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {eventos.length > 0 && (
        <p style={styles.mostrando}>
          Mostrando {eventos.length} evento{eventos.length !== 1 ? 's' : ''}
        </p>
      )}
    </motion.div>
  )
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem 2rem'
  },
  filtros: {
    overflowX: 'auto',
    marginBottom: '1rem'
  },
  tabs: {
    display: 'flex',
    gap: '0.5rem',
    padding: '0.5rem 0'
  },
  tab: {
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontSize: '0.8125rem',
    fontWeight: 600,
    background: 'white',
    border: '1px solid #e2e8f0',
    color: '#64748b',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  tabAtiva: {
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontSize: '0.8125rem',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  busca: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap'
  },
  input: {
    flex: 1,
    minWidth: '200px',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    border: '1px solid #e2e8f0',
    fontSize: '0.875rem'
  },
  select: {
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    border: '1px solid #e2e8f0',
    fontSize: '0.875rem',
    background: 'white'
  },
  botaoLimpar: {
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    border: '1px solid #e2e8f0',
    background: 'white',
    cursor: 'pointer'
  },
  botaoPrimary: {
    padding: '0.625rem 1.25rem',
    borderRadius: '0.75rem',
    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  card: {
    background: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s, box-shadow 0.3s'
  },
  cardLink: {
    textDecoration: 'none',
    display: 'block'
  },
  cardImg: {
    width: '100%',
    height: '10rem',
    objectFit: 'cover'
  },
  cardBody: {
    padding: '1.25rem'
  },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.625rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  cardTitulo: {
    margin: '0.5rem 0',
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#1e293b',
    lineHeight: 1.3
  },
  cardMeta: {
    display: 'flex',
    gap: '0.75rem',
    fontSize: '0.8125rem',
    color: '#64748b',
    marginBottom: '0.375rem'
  },
  preco: {
    fontWeight: 700,
    fontSize: '1rem'
  },
  skeleton: {
    height: '10rem',
    background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite'
  },
  skeletonRow: {
    height: '1rem',
    background: '#e2e8f0',
    borderRadius: '0.25rem',
    marginBottom: '0.5rem'
  },
  vazio: {
    textAlign: 'center',
    padding: '4rem 2rem'
  },
  erro: {
    padding: '1rem',
    borderRadius: '0.75rem',
    background: '#fef2f2',
    color: '#b91c1c',
    textAlign: 'center'
  },
  botaoRetry: {
    marginTop: '0.75rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #fecaca',
    background: 'white',
    color: '#b91c1c',
    cursor: 'pointer',
    fontWeight: 600
  },
  mostrando: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: '2rem'
  }
}