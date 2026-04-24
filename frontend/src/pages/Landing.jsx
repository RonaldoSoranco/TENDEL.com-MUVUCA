import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const FESTAS_IMAGES = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1511578314322-b379e24781db?w=800&h=600&fit=crop',
]

export default function Landing() {
  const navigate = useNavigate()
  const [aba, setAba] = useState('login')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('tendel_token')
    const user = JSON.parse(localStorage.getItem('tendel_user') || 'null')
    if (token && user) {
      navigate('/eventos')
    }
  }, [navigate])

  const [form, setForm] = useState({
    email: '',
    senha: '',
    nome: '',
    confirmarSenha: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)
    try {
      const res = await fetch('/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Email ou senha inválidos')
      const data = await res.json()
      localStorage.setItem('tendel_token', data.token)
      localStorage.setItem('tendel_user', JSON.stringify({
        id: data.id,
        email: data.email,
        nome: data.nome,
        fotoUrl: data.fotoUrl
      }))
      navigate('/eventos')
    } catch (err) {
      setErro('Email ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setErro('')
    
    if (form.senha !== form.confirmarSenha) {
      setErro('As senhas não conferem')
      return
    }
    if (form.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres')
      return
    }
    
    setLoading(true)
    try {
      const res = await fetch('/api/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          senha: form.senha,
          nome: form.nome
        })
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao cadastrar')
      }
      const data = await res.json()
      localStorage.setItem('tendel_token', data.token)
      localStorage.setItem('tendel_user', JSON.stringify({
        id: data.id,
        email: data.email,
        nome: data.nome
      }))
      navigate('/eventos')
    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDemo = async (email) => {
    setLoading(true)
    try {
      const res = await fetch('/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: 'senha123' })
      })
      if (!res.ok) throw new Error('Demo não disponível')
      const data = await res.json()
      localStorage.setItem('tendel_token', data.token)
      localStorage.setItem('tendel_user', JSON.stringify({
        id: data.id,
        email: data.email,
        nome: data.nome,
        fotoUrl: data.fotoUrl
      }))
      navigate('/eventos')
    } catch {
      setErro('Demo não disponível')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.bgGradient}>
        <div style={{...styles.bubble, top:'10%', left:'10%'}} />
        <div style={{...styles.bubble, bottom:'20%', right:'15%', animationDelay:'1s'}} />
        <div style={{...styles.bubble, top:'50%', left:'30%', animationDelay:'2s'}} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        <div style={styles.leftSide}>
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={styles.title}
          >
            <span style={styles.logo}>✨</span> TENDEL
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={styles.subtitle}
          >
            Descubra os melhores eventos!
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={styles.features}
          >
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🎉</span>
              <span>Festas</span>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🎤</span>
              <span>Shows</span>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🎲</span>
              <span>RPG</span>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🎭</span>
              <span>Cultura</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={styles.heroImages}
          >
            {FESTAS_IMAGES.slice(0, 3).map((img, i) => (
              <motion.img
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                src={img}
                alt="Evento"
                style={styles.heroImg}
              />
            ))}
          </motion.div>
        </div>

        <div style={styles.rightSide}>
          <div style={styles.tabs}>
            <button 
              onClick={() => setAba('login')}
              style={aba === 'login' ? styles.tabAtiva : styles.tab}
            >
              Entrar
            </button>
            <button 
              onClick={() => setAba('register')}
              style={aba === 'register' ? styles.tabAtiva : styles.tab}
            >
              Cadastrar
            </button>
          </div>

          <AnimatePresence mode="wait">
            {aba === 'login' ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleLogin}
                style={styles.form}
              >
                {erro && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={styles.erro}
                  >
                    {erro}
                  </motion.div>
                )}

                <div style={styles.campo}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.campo}>
                  <label style={styles.label}>Senha</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="senha"
                    value={form.senha}
                    onChange={handleChange}
                    placeholder="••••••••"
                    style={styles.input}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={styles.botao}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>

                <div style={styles.divider}>
                  <span>ou entre com demo</span>
                </div>

                <div style={styles.demoButtons}>
                  <button 
                    type="button" 
                    onClick={() => handleDemo('alice@exemplo.com')}
                    disabled={loading}
                    style={styles.demoButton}
                  >
                    🎤 Alice
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleDemo('bruno@exemplo.com')}
                    disabled={loading}
                    style={styles.demoButton}
                  >
                    🎲 Bruno
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleRegister}
                style={styles.form}
              >
                {erro && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={styles.erro}
                  >
                    {erro}
                  </motion.div>
                )}

                <div style={styles.campo}>
                  <label style={styles.label}>Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.campo}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.campo}>
                  <label style={styles.label}>Senha</label>
                  <input
                    type="password"
                    name="senha"
                    value={form.senha}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.campo}>
                  <label style={styles.label}>Confirmar Senha</label>
                  <input
                    type="password"
                    name="confirmarSenha"
                    value={form.confirmarSenha}
                    onChange={handleChange}
                    placeholder="Repita a senha"
                    style={styles.input}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={styles.botao}
                >
                  {loading ? 'Cadastrando...' : 'Criar Conta'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <p style={styles.footer}>
        © 2026 TENDEL.COM - Todos os direitos reservados
      </p>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    position: 'relative',
    overflow: 'hidden'
  },
  bgGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
    overflow: 'hidden'
  },
  bubble: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(236, 72, 153, 0.15)',
    filter: 'blur(60px)',
    animation: 'pulse 4s infinite'
  },
  card: {
    display: 'flex',
    width: '100%',
    maxWidth: '900px',
    background: 'white',
    borderRadius: '1.5rem',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
    position: 'relative',
    zIndex: 1
  },
  leftSide: {
    flex: 1,
    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontSize: '3rem',
    fontWeight: 900,
    marginBottom: '0.5rem',
    letterSpacing: '-0.04em',
    background: 'linear-gradient(135deg, #fff 0%, #f0abfc 50%, #c084fc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  logo: {
    fontSize: '2.5rem',
    WebkitTextFillColor: 'initial'
  },
  subtitle: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: '2rem'
  },
  features: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '9999px',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: 500
  },
  featureIcon: {
    fontSize: '1rem'
  },
  heroImages: {
    display: 'flex',
    gap: '0.5rem'
  },
  heroImg: {
    width: '80px',
    height: '80px',
    borderRadius: '0.75rem',
    objectFit: 'cover',
    border: '3px solid rgba(255, 255, 255, 0.3)'
  },
  rightSide: {
    flex: 1,
    padding: '2.5rem',
    background: 'white'
  },
  tabs: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem'
  },
  tab: {
    flex: 1,
    padding: '0.75rem',
    border: 'none',
    background: '#f1f5f9',
    color: '#64748b',
    borderRadius: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  tabAtiva: {
    flex: 1,
    padding: '0.75rem',
    border: 'none',
    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    color: 'white',
    borderRadius: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  erro: {
    padding: '0.75rem',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '0.5rem',
    color: '#b91c1c',
    fontSize: '0.875rem',
    textAlign: 'center'
  },
  campo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#374151'
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s'
  },
  botao: {
    padding: '0.875rem',
    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '0.5rem'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    margin: '0.5rem 0'
  },
  demoButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem'
  },
  demoButton: {
    padding: '0.75rem',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '0.75rem',
    fontWeight: 500,
    cursor: 'pointer'
  },
  footer: {
    marginTop: '2rem',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.875rem'
  }
}