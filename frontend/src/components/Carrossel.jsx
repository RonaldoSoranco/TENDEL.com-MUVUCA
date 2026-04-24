import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import CompraIngresso from './CompraIngresso'

const IMAGES = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1511578314322-b379e24781db?w=1200&h=600&fit=crop',
]

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop'

const DEFAULT_BG = 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'

export default function Carrossel({ eventos }) {
  const [indice, setIndice] = useState(0)
  const [pausado, setPausado] = useState(false)
  const [imgErro, setImgErro] = useState({})
  const [compraAberta, setCompraAberta] = useState(false)
  const [eventoCompra, setEventoCompra] = useState(null)

  useEffect(() => {
    if (pausado || !eventos?.length) return
    const intervalo = setInterval(() => {
      setIndice(i => (i + 1) % eventos.length)
    }, 5000)
    return () => clearInterval(intervalo)
  }, [pausado, eventos?.length])

  const anterior = () => {
    setIndice(i => (i - 1 + eventos.length) % eventos.length)
    setPausado(true)
    setTimeout(() => setPausado(false), 8000)
  }

  const proximo = () => {
    setIndice(i => (i + 1) % eventos.length)
    setPausado(true)
    setTimeout(() => setPausado(false), 8000)
  }

  const getImagem = (evt, i) => {
    if (evt.imagemUrl && !imgErro[evt.id]) return evt.imagemUrl
    return IMAGES[i % IMAGES.length]
  }

  const handleImgErro = (evtId) => {
    setImgErro(prev => ({ ...prev, [evtId]: true }))
  }

  const handleImgLoadError = (e) => {
    e.target.src = DEFAULT_IMG
  }

  const getCategoriaCor = (cat) => {
    return cat === 'FESTA' ? '#ec4899' :
           cat === 'SHOW' ? '#8b5cf6' :
           cat === 'RPG' ? '#f59e0b' : '#64748b'
  }

  if (!eventos?.length) return null

  const evento = eventos[indice]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={styles.container}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={evento.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          style={styles.slide}
        >
          <img 
            src={getImagem(evento, indice)} 
            alt={evento.nome} 
            style={styles.image}
            onError={handleImgLoadError}
          />
          <div style={styles.overlay} />
          
          <div style={styles.content}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{...styles.badge, background: getCategoriaCor(evento.categoria)}}
            >
              {evento.categoria}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={styles.title}
            >
              {evento.nome}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={styles.meta}
            >
              <span>📅 {new Date(evento.data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}</span>
              <span>📍 {evento.cidade}</span>
              <span>🎟️ {evento.preco > 0 ? `R$ ${parseFloat(evento.preco).toFixed(2)}` : 'Grátis'}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={styles.actions}
            >
              <Link to={`/eventos/${evento.id}`} style={styles.botaoPrimary}>
                Ver Detalhes
              </Link>
              {evento.preco > 0 && (
                <button 
                  onClick={() => { setEventoCompra(evento); setCompraAberta(true) }}
                  style={styles.botaoComprar}
                >
                  🎟️ Comprar
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={anterior} style={styles.navButton}>&#10094;</button>
      <button onClick={proximo} style={styles.navButtonRight}>&#10095;</button>

      <div style={styles.dots}>
        {eventos.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIndice(i); setPausado(true); setTimeout(() => setPausado(false), 8000) }}
            style={i === indice ? styles.dotAtivo : styles.dot}
          />
        ))}
      </div>

      <CompraIngresso 
        evento={eventoCompra} 
        isOpen={compraAberta} 
        onClose={() => setCompraAberta(false)} 
      />
    </motion.div>
  )
}

const styles = {
  container: {
    position: 'relative',
    borderRadius: '1.5rem',
    overflow: 'hidden',
    marginBottom: '2rem',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
  },
  slide: {
    position: 'relative',
    height: '350px'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '2rem',
    color: 'white'
  },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.625rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.75rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 800,
    marginBottom: '0.5rem',
    lineHeight: 1.2
  },
  meta: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.875rem',
    opacity: 0.9,
    marginBottom: '1rem'
  },
  actions: {
    display: 'flex',
    gap: '1rem'
  },
  botaoPrimary: {
    display: 'inline-flex',
    padding: '0.75rem 1.5rem',
    background: 'white',
    color: '#1e293b',
    borderRadius: '0.75rem',
    fontWeight: 600,
    textDecoration: 'none'
  },
  botaoComprar: {
    display: 'inline-flex',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer'
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    left: '1rem',
    transform: 'translateY(-50%)',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    backdropFilter: 'blur(4px)'
  },
  navButtonRight: {
    position: 'absolute',
    top: '50%',
    right: '1rem',
    transform: 'translateY(-50%)',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    backdropFilter: 'blur(4px)'
  },
  dots: {
    position: 'absolute',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '0.5rem'
  },
  dot: {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.5)',
    border: 'none',
    cursor: 'pointer'
  },
  dotAtivo: {
    width: '2rem',
    height: '0.5rem',
    borderRadius: '9999px',
    background: 'white',
    border: 'none',
    cursor: 'pointer'
  }
}