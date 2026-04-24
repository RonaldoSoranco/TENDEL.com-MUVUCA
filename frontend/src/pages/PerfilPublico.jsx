import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const IMAGES = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=400&fit=crop',
]

export default function PerfilPublico() {
  const { id } = useParams()
  
  const [usuario, setUsuario] = useState(null)
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadPerfil()
  }, [id])

  async function loadPerfil() {
    try {
      setLoading(true)
      setError(null)
      
      const res = await fetch(`/api/usuarios/${id}`)
      if (!res.ok) {
        setError('Usuário não encontrado')
        setLoading(false)
        return
      }
      const data = await res.json()
      setUsuario(data)
      
      const res2 = await fetch(`/api/usuarios/${id}/eventos`)
      if (res2.ok) {
        const evts = await res2.json()
        setEventos(evts || [])
      }
    } catch (err) {
      setError('Erro ao carregar perfil')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingBox}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>Carregando perfil...</p>
        </div>
      </div>
    )
  }

  if (error || !usuario) {
    return (
      <div style={styles.container}>
        <Link to="/eventos" style={styles.backLink}>← Voltar aos Eventos</Link>
        <div style={styles.errorBox}>{error || 'Usuário não encontrado'}</div>
      </div>
    )
  }

  function resolveImageUrl(url) {
    if (!url) return null
    if (url.startsWith('http')) return url
    if (url.startsWith('/uploads')) return 'http://localhost:8080/api' + url
    return url
  }

  return (
    <div style={styles.container}>
      <Link to="/eventos" style={styles.backLink}>← Voltar aos Eventos</Link>
      
      <div style={styles.profileCard}>
        <div style={styles.cover} />
        
        <div style={styles.avatarWrapper}>
          {usuario.fotoUrl ? (
            <img src={resolveImageUrl(usuario.fotoUrl)} alt={usuario.nome} style={styles.avatar} />
          ) : (
            <div style={styles.avatarPlaceholder}>
              {usuario.nome?.[0]?.toUpperCase() || '?'}
            </div>
          )}
        </div>
        
        <div style={styles.content}>
          <h1 style={styles.name}>{usuario.nome}</h1>
          
          {usuario.bio && (
            <p style={styles.bio}>{usuario.bio}</p>
          )}
          
          <div style={styles.stats}>
            <div style={styles.stat}>
              <span style={styles.statNumber}>{eventos.length}</span>
              <span style={styles.statLabel}>eventos criados</span>
            </div>
          </div>
          
          {eventos.length > 0 && (
            <div style={styles.eventsSection}>
              <h3 style={styles.eventsTitle}>🎉 Eventos organizados por {usuario.nome}</h3>
              <div style={styles.eventsGrid}>
                {eventos.map((evt, i) => (
                  <Link key={evt.id} to={`/eventos/${evt.id}`} style={styles.eventCard}>
                    <img 
                      src={evt.imagemUrl || IMAGES[i % IMAGES.length]} 
                      alt={evt.nome}
                      style={styles.eventImg}
                      onError={(e) => { e.target.src = IMAGES[0] }}
                    />
                    <div style={styles.eventInfo}>
                      <span style={styles.eventBadge}>{evt.categoria}</span>
                      <h4 style={styles.eventName}>{evt.nome}</h4>
                      <p style={styles.eventMeta}>
                        📅 {new Date(evt.data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} • 📍 {evt.cidade}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {eventos.length === 0 && (
            <div style={styles.noEvents}>
              <span style={styles.noEventsEmoji}>📭</span>
              <p style={styles.noEventsText}>Este usuário ainda não criou nenhum evento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '0 1rem 2rem'
  },
  backLink: {
    display: 'inline-block',
    color: '#64748b',
    textDecoration: 'none',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    fontWeight: 500
  },
  loadingBox: {
    textAlign: 'center',
    padding: '4rem 2rem'
  },
  spinner: {
    width: '3rem',
    height: '3rem',
    border: '3px solid #f1f5f9',
    borderTopColor: '#ec4899',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto 1rem'
  },
  loadingText: {
    color: '#64748b',
    fontSize: '0.9rem'
  },
  errorBox: {
    padding: '1.5rem',
    background: '#fef2f2',
    color: '#b91c1c',
    borderRadius: '0.75rem',
    textAlign: 'center'
  },
  profileCard: {
    background: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  },
  cover: {
    height: '120px',
    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #06b6d4 100%)'
  },
  avatarWrapper: {
    marginTop: '-60px',
    padding: '0 1.5rem'
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '4px solid white',
    objectFit: 'cover',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  avatarPlaceholder: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '4px solid white',
    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '3rem',
    fontWeight: 700,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  content: {
    padding: '1rem 1.5rem 2rem',
    textAlign: 'center'
  },
  name: {
    margin: '0.5rem 0 0.25rem',
    fontSize: '1.75rem',
    fontWeight: 800,
    color: '#1e293b'
  },
  bio: {
    color: '#64748b',
    marginBottom: '1rem',
    lineHeight: 1.6,
    fontSize: '0.95rem'
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem 0',
    borderTop: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0'
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#ec4899'
  },
  statLabel: {
    fontSize: '0.75rem',
    color: '#64748b',
    textTransform: 'uppercase'
  },
  eventsSection: {
    marginTop: '1.5rem',
    textAlign: 'left'
  },
  eventsTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '1rem'
  },
  eventsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  eventCard: {
    display: 'flex',
    gap: '1rem',
    background: '#f8fafc',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  eventImg: {
    width: '100px',
    height: '80px',
    objectFit: 'cover'
  },
  eventInfo: {
    flex: 1,
    padding: '0.5rem 0.5rem 0.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  eventBadge: {
    display: 'inline-block',
    padding: '0.125rem 0.5rem',
    background: '#ede9fe',
    color: '#7c3aed',
    borderRadius: '9999px',
    fontSize: '0.625rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    width: 'fit-content',
    marginBottom: '0.25rem'
  },
  eventName: {
    margin: 0,
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#1e293b'
  },
  eventMeta: {
    margin: '0.25rem 0 0',
    fontSize: '0.75rem',
    color: '#64748b'
  },
  noEvents: {
    marginTop: '2rem',
    padding: '2rem',
    textAlign: 'center'
  },
  noEventsEmoji: {
    fontSize: '2.5rem',
    display: 'block',
    marginBottom: '0.5rem'
  },
  noEventsText: {
    color: '#64748b',
    margin: 0
  }
}