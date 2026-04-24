import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMyEventos, getMyInteresses } from '../services/api'

function Loading() {
  return (
    <div style={styles.loading}>
      <div style={styles.spinner} />
      <p>Carregando...</p>
    </div>
  )
}

function Vazio({ titulo, texto, link, textoLink }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.vazio}>
      <div style={styles.vazioIcon}>🎉</div>
      <h3 style={styles.vazioTitulo}>{titulo}</h3>
      <p style={styles.vazioTexto}>{texto}</p>
      {link && <Link to={link} style={styles.botaoPrimary}>{textoLink}</Link>}
    </motion.div>
  )
}

function CartaoEvento({ evento }) {
  const dataBR = new Date(evento.data).toLocaleDateString('pt-BR', { day:'numeric', month:'short' })
  const preco = evento.preco > 0 ? `R$ ${parseFloat(evento.preco).toFixed(2)}` : 'Grátis'

  return (
    <Link to={`/eventos/${evento.id}`} style={styles.cartaoLink}>
      <div style={styles.cartao}>
        <div style={{
          ...styles.cartaoBanner,
          background: evento.categoria === 'FESTA' ? '#ec4899' :
                     evento.categoria === 'SHOW' ? '#8b5cf6' :
                     evento.categoria === 'RPG' ? '#f59e0b' : '#64748b'
        }}>
          <span style={{fontSize:'2rem',opacity:0.3}}>🎉</span>
        </div>
        <div style={styles.cartaoBody}>
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
          <h3 style={styles.cartaoTitulo}>{evento.nome}</h3>
          <div style={styles.cartaoMeta}>
            <span>📅 {dataBR}</span>
            <span>📍 {evento.cidade}</span>
          </div>
          <div style={{
            ...styles.preco,
            color: evento.preco > 0 ? '#ec4899' : '#10b981'
          }}>
            {preco}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function MyEvents() {
  const [meusEventos, setMeusEventos] = useState([])
  const [interesses, setInteresses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const token = localStorage.getItem('tendel_token')
      if (!token) {
        setLoading(false)
        return
      }
      
      const [meus, interests] = await Promise.all([
        getMyEventos(token),
        getMyInteresses(token)
      ])
      
      setMeusEventos(meus || [])
      setInteresses(interesses || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  const token = localStorage.getItem('tendel_token')
  if (!token) {
    return (
      <div style={styles.container}>
        <Vazio 
          titulo="Área Pessoal" 
          texto="Faça login para ver seus eventos" 
          link="/login" 
          textoLink="Entrar" 
        />
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <h1 style={styles.titulo}>Meus Eventos</h1>
      
      {meusEventos.length === 0 ? (
        <Vazio 
          titulo="Nenhum evento criado" 
          texto="Você ainda não criou nenhum evento" 
          link="/criar" 
          textoLink="Criar Primeiro Evento" 
        />
      ) : (
        <div style={styles.grid}>
          {meusEventos.map(evento => (
            <CartaoEvento key={evento.id} evento={evento} />
          ))}
        </div>
      )}

      <h1 style={{...styles.titulo, marginTop:'3rem'}}>Eventos de Interesse</h1>
      
      {interesses.length === 0 ? (
        <p style={styles.semInteresses}>Nenhum evento marcado como interesse</p>
      ) : (
        <div style={styles.grid}>
          {interesses.map(evento => (
            <CartaoEvento key={evento.id} evento={evento} />
          ))}
        </div>
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
  titulo: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#1e293b',
    marginBottom: '1.5rem'
  },
  loading: {
    textAlign: 'center',
    padding: '4rem'
  },
  spinner: {
    width:'3rem',height:'3rem',
    border:'3px solid #f1f5f9',borderTopColor:'#ec4899',
    borderRadius:'50%',animation:'spin 0.8s linear infinite',
    margin:'0 auto'
  },
  vazio: {
    textAlign: 'center',
    padding: '3rem 1rem',
    background: 'white',
    borderRadius: '1rem'
  },
  vazioIcon: { fontSize: '3rem', marginBottom: '1rem' },
  vazioTitulo: { marginBottom: '0.5rem', color: '#374151' },
  vazioTexto: { color: '#64748b', marginBottom: '1.5rem' },
  botaoPrimary: {
    display:'inline-flex',padding:'0.75rem 1.5rem',
    background:'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    color:'white',borderRadius:'0.75rem',fontWeight:600,
    textDecoration:'none'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  cartaoLink: { textDecoration: 'none', display: 'block' },
  cartao: {
    background: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
  },
  cartaoBanner: {
    height: '8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartaoBody: { padding: '1.25rem' },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.625rem',
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  cartaoTitulo: {
    marginTop: '0.75rem',
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#1e293b'
  },
  cartaoMeta: {
    display: 'flex',
    gap: '0.75rem',
    fontSize: '0.8125rem',
    color: '#64748b',
    marginTop: '0.5rem'
  },
  preco: {
    fontWeight: 700,
    fontSize: '1rem',
    marginTop: '0.5rem'
  },
  semInteresses: {
    color: '#94a3b8',
    textAlign: 'center',
    padding: '2rem'
  }
}