import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMyProfile, getEmpresaByUsuario, getMyInteresses, resolveImageUrl } from '../services/api'

function Loading() {
  return (
    <div style={styles.loading}>
      <div style={styles.spinner} />
    </div>
  )
}

export default function Perfil() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [empresa, setEmpresa] = useState(null)
  const [interesses, setInteresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('tendel_token')
    const userData = JSON.parse(localStorage.getItem('tendel_user') || 'null')
    
    if (!token || !userData) {
      navigate('/login')
      return
    }

    loadData(token, userData.id)
  }, [navigate])

  async function loadData(token, userId) {
    try {
      setLoading(true)
      const [profile, emp, ints] = await Promise.all([
        getMyProfile(token),
        getEmpresaByUsuario(userId).catch(() => null),
        getMyInteresses(token)
      ])
      setUser(profile)
      setEmpresa(emp)
      setInteresses(ints || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.erro}>{error}</div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <div style={styles.cartao}>
        <div style={styles.avatarArea}>
          {user?.fotoUrl ? (
            <img src={resolveImageUrl(user.fotoUrl)} alt={user.nome} style={styles.avatarImg} />
          ) : (
            <div style={styles.avatarPlaceholder}>{user?.nome?.[0] || '?'}</div>
          )}
        </div>
        <div style={styles.perfilInfo}>
          <h1 style={styles.nome}>{user?.nome || 'Usuário'}</h1>
          <p style={styles.email}>{user?.email}</p>
          {user?.bio && <p style={styles.bio}>{user.bio}</p>}
          <Link to="/perfil/editar" style={styles.botaoEditar}>Editar Perfil</Link>
        </div>
      </div>

      {empresa ? (
        <div style={styles.secao}>
          <h2 style={styles.subtitulo}>Minha Empresa</h2>
          <div style={styles.empresaCartao}>
            {empresa.fotoUrl && (
              <img src={resolveImageUrl(empresa.fotoUrl)} alt={empresa.nome} style={styles.empresaImg} />
            )}
            <div style={{flex: 1}}>
              <h3 style={styles.empresaNome}>{empresa.nome}</h3>
              {empresa.descricao && (
                <p style={styles.empresaDesc}>{empresa.descricao}</p>
              )}
              {empresa.linkSite && (
                <a 
                  href={empresa.linkSite} 
                  target="_blank" 
                  rel="noopener"
                  style={styles.link}
                >
                  Ver Site ↗
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.secao}>
          <div style={styles.vazio}>
            <p>Você não tem um perfil de empresa ainda.</p>
            <Link to="/empresa/criar" style={styles.botaoPrimary}>Criar Empresa</Link>
          </div>
        </div>
      )}

      <div style={styles.secao}>
        <h2 style={styles.subtitulo}>Meus Interesses ({interesses.length})</h2>
        {interesses.length === 0 ? (
          <p style={styles.semInteresses}>Você não tem interesses ainda.</p>
        ) : (
          <div style={styles.grid}>
            {interesses.map(evento => (
              <Link key={evento.id} to={`/eventos/${evento.id}`} style={styles.cartaoLink}>
                <div style={styles.eventoCartao}>
                  <div style={{
                    ...styles.eventoBanner,
                    background: evento.categoria === 'FESTA' ? '#ec4899' :
                               evento.categoria === 'SHOW' ? '#8b5cf6' :
                               evento.categoria === 'RPG' ? '#f59e0b' : '#64748b'
                  }}>
                    <span style={{fontSize:'1.5rem',opacity:0.3}}>🎉</span>
                  </div>
                  <div style={styles.eventoBody}>
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
                    <h3 style={styles.eventoNome}>{evento.nome}</h3>
                    <p style={styles.eventoMeta}>
                      {new Date(evento.data).toLocaleDateString('pt-BR')} às {evento.hora?.substring(0, 5)}
                    </p>
                    <p style={styles.eventoLocal}>{evento.local} - {evento.cidade}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem 2rem'
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
  erro: {
    padding:'1rem',borderRadius:'0.75rem',background:'#fef2f2',color:'#b91c1c',
    border:'1px solid #fecaca'
  },
  cartao: {
    background:'white',borderRadius:'1.5rem',overflow:'hidden',
    boxShadow:'0 4px 20px rgba(0,0,0,0.08)',marginBottom:'2rem'
  },
  avatarArea: {
    background:'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
    padding:'3rem',display:'flex',justifyContent:'center'
  },
  avatarImg: {
    width:'6rem',height:'6rem',borderRadius:'50%',objectFit:'cover',
    border:'4px solid white'
  },
  avatarPlaceholder: {
    width:'6rem',height:'6rem',borderRadius:'50%',
    background:'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    display:'flex',alignItems:'center',justifyContent:'center',
    fontSize:'2.5rem',fontWeight:700,color:'white',
    border:'4px solid white'
  },
  perfilInfo: {
    padding:'2rem',textAlign:'center'
  },
  nome: { margin:0,fontSize:'1.75rem',fontWeight:800 },
  email: { color:'#64748b',marginTop:'0.25rem' },
  bio: { color:'#475569',marginTop:'0.75rem' },
  botaoEditar: {
    display:'inline-block',marginTop:'1rem',padding:'0.5rem 1.25rem',
    border:'1px solid #e2e8f0',borderRadius:'0.5rem',
    color:'#475569',textDecoration:'none',fontWeight:500
  },
  secao: { marginBottom:'2rem' },
  subtitulo: { fontSize:'1.25rem',fontWeight:700,color:'#1e293b',marginBottom:'1rem' },
  empresaCartao: {
    display:'flex',gap:'1rem',padding:'1.5rem',background:'white',
    borderRadius:'1rem',boxShadow:'0 2px 8px rgba(0,0,0,0.05)'
  },
  empresaImg: {
    width:'5rem',height:'5rem',borderRadius:'0.75rem',objectFit:'cover'
  },
  empresaNome: { margin:0,fontSize:'1.25rem',fontWeight:700 },
  empresaDesc: { color:'#64748b',marginTop:'0.25rem' },
  link: { display:'inline-block',marginTop:'0.5rem',color:'#8b5cf6',textDecoration:'none' },
  vazio: {
    textAlign:'center',padding:'2rem',background:'white',
    borderRadius:'1rem'
  },
  botaoPrimary: {
    display:'inline-block',marginTop:'1rem',padding:'0.75rem 1.5rem',
    background:'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    color:'white',borderRadius:'0.75rem',fontWeight:600,
    textDecoration:'none'
  },
  semInteresses: { color:'#94a3b8',textAlign:'center',padding:'2rem',background:'white',borderRadius:'1rem' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1rem'
  },
  cartaoLink: { textDecoration: 'none', display: 'block' },
  eventoCartao: {
    background: 'white',borderRadius:'1rem',overflow:'hidden',
    border: '1px solid #f1f5f9',boxShadow:'0 2px 8px rgba(0,0,0,0.05)'
  },
  eventoBanner: { height:'5rem',display:'flex',alignItems:'center',justifyContent:'center' },
  eventoBody: { padding:'1rem' },
  badge: {
    display:'inline-block',padding:'0.2rem 0.5rem',borderRadius:'9999px',
    fontSize:'0.625rem',fontWeight:700,textTransform:'uppercase'
  },
  eventoNome: { marginTop:'0.5rem',fontSize:'1rem',fontWeight:700,color:'#1e293b' },
  eventoMeta: { fontSize:'0.8125rem',color:'#64748b',marginTop:'0.25rem' },
  eventoLocal: { fontSize:'0.75rem',color:'#94a3b8' }
}