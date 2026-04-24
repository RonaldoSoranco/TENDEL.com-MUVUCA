import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('tendel_user') || 'null'))

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('tendel_user') || 'null'))
  }, [location.pathname])

  function logout() {
    localStorage.removeItem('tendel_token')
    localStorage.removeItem('tendel_user')
    setUser(null)
    navigate('/')
  }

  function resolveImageUrl(url) {
    if (!url) return null
    if (url.startsWith('http')) return url
    if (url.startsWith('/uploads')) return 'http://localhost:8080/api' + url
    return url
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/eventos" style={styles.brand}>
          <span style={styles.logoEmoji}>✨</span> 
          <span style={styles.logoText}>TENDEL</span>
        </Link>
        
        <div style={styles.links}>
          {user ? (
            <>
              <Link to="/eventos" style={styles.link}>Eventos</Link>
              <Link to="/criar" style={styles.botaoCriar}>+ Criar Evento</Link>
              <Link to="/meus-eventos" style={styles.botaoMeus}>Meus Eventos</Link>
              
              <div style={styles.perfilArea}>
                <Link to="/perfil" style={styles.avatarLink}>
                  {user.fotoUrl ? (
                    <img src={resolveImageUrl(user.fotoUrl)} alt={user.nome} style={styles.avatarImg} />
                  ) : (
                    <span style={styles.avatarLetra}>{user.nome?.[0]?.toUpperCase() || '?'}</span>
                  )}
                </Link>
              </div>
              
              <button onClick={logout} style={styles.botaoSair}>Sair</button>
            </>
          ) : (
            <Link to="/" style={styles.botaoEntrar}>Entrar / Cadastrar</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    padding: '0.75rem 0',
    boxShadow: '0 4px 20px rgba(233, 30, 99, 0.25)',
    position: 'sticky',
    top: 0,
    zIndex: 50
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none'
  },
  logoEmoji: {
    fontSize: '1.75rem'
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 900,
    color: 'white',
    letterSpacing: '-0.03em'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  link: {
    color: 'rgba(255,255,255,0.85)',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.9rem',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.5rem',
    transition: 'all 0.2s'
  },
  botaoCriar: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    borderRadius: '0.5rem',
    fontWeight: 600,
    fontSize: '0.85rem',
    textDecoration: 'none'
  },
  botaoMeus: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.3)',
    color: 'white',
    borderRadius: '0.5rem',
    fontWeight: 500,
    fontSize: '0.85rem',
    textDecoration: 'none'
  },
  botaoEntrar: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.6rem 1.25rem',
    background: 'white',
    color: '#ec4899',
    borderRadius: '2rem',
    fontWeight: 700,
    fontSize: '0.9rem',
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  },
  perfilArea: {
    display: 'flex',
    alignItems: 'center'
  },
  avatarLink: {
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: '50%',
    overflow: 'hidden',
    background: 'rgba(255,255,255,0.2)',
    border: '2px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  avatarLetra: {
    color: 'white',
    fontWeight: 700,
    fontSize: '0.9rem',
    textTransform: 'uppercase'
  },
  botaoSair: {
    background: 'rgba(255,255,255,0.15)',
    border: 'none',
    color: 'white',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.85rem'
  }
}