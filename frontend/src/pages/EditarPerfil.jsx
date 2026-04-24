import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMyProfile, updateMyProfile, uploadFile } from '../services/api'
import { UserIcon, PhotoIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function EditarPerfil() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [nome, setNome] = useState('')
  const [bio, setBio] = useState('')
  const [fotoUrl, setFotoUrl] = useState('')
  const [fotoPreview, setFotoPreview] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('tendel_token')
    if (!token) {
      navigate('/login')
      return
    }

    getMyProfile(token)
      .then(data => {
        setUser(data)
        setNome(data.nome || '')
        setBio(data.bio || '')
        setFotoUrl(data.fotoUrl || '')
        if (data.fotoUrl) setFotoPreview(data.fotoUrl)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [navigate])

  async function handleFotoChange(e) {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem')
      return
    }

    const preview = URL.createObjectURL(file)
    setFotoPreview(preview)
    setFotoUrl('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const token = localStorage.getItem('tendel_token')
    
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      let finalFotoUrl = fotoUrl

      const fotoInput = document.getElementById('foto')
      if (fotoInput && fotoInput.files[0]) {
        finalFotoUrl = await uploadFile(fotoInput.files[0], token)
      }

      if (!finalFotoUrl) {
        throw new Error('Falha ao fazer upload da imagem')
      }

      const data = { nome, bio, fotoUrl: finalFotoUrl }
      const updated = await updateMyProfile(data, token)
      
      const resolvedUrl = finalFotoUrl.startsWith('/uploads') 
        ? 'http://localhost:8080' + finalFotoUrl 
        : finalFotoUrl
      
      localStorage.setItem('tendel_user', JSON.stringify({
        ...updated,
        fotoUrl: resolvedUrl
      }))
      setUser(updated)
      setFotoUrl(resolvedUrl)
      setSuccess('Perfil atualizado com sucesso!')
    } catch (err) {
      console.error('Erro ao salvar:', err)
      setError(err.message || 'Erro ao salvar perfil')
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
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        style={styles.card}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={styles.header}
        >
          <h1 style={styles.title}>Editar Perfil</h1>
          <p style={styles.subtitle}>Atualize suas informações</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            style={styles.error}
          >
            <p style={{color: '#dc2626', fontSize: '0.875rem', textAlign: 'center'}}>{error}</p>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            style={styles.success}
          >
            <CheckCircleIcon style={{width: 20, height: 20, color: '#16a34a'}} />
            <p style={{color: '#16a34a', fontSize: '0.875rem'}}>{success}</p>
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: 12, textAlign: 'center'}}>
              Foto de Perfil
            </label>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{position: 'relative'}}>
                <div style={{width: 112, height: 112, borderRadius: '50%', overflow: 'hidden', border: '4px solid white', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}>
                  {fotoPreview ? (
                    <img src={fotoPreview} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <div style={{width: '100%', height: '100%', background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <UserIcon style={{width: 48, height: 48, color: 'white'}} />
                    </div>
                  )}
                </div>
                <label 
                  htmlFor="foto"
                  style={{position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, background: '#ec4899', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)'}}
                >
                  <PhotoIcon style={{width: 20, height: 20, color: 'white'}} />
                </label>
                <input 
                  type="file" 
                  id="foto" 
                  accept="image/*"
                  onChange={handleFotoChange}
                  style={{display: 'none'}}
                />
              </div>
              <p style={{fontSize: '0.75rem', color: '#9ca3af', marginTop: 8}}>Clique na câmera para alterar</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: 8}}>
              Nome
            </label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Seu nome"
              style={styles.input}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: 8}}>
              Bio
            </label>
            <textarea 
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Conte um pouco sobre você..."
              rows={4}
              maxLength={500}
              style={{...styles.input, resize: 'none', minHeight: 100}}
            />
            <p style={{fontSize: '0.75rem', color: '#9ca3af', marginTop: 4, textAlign: 'right'}}>{bio.length}/500 caracteres</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            style={{display: 'flex', gap: 12}}
          >
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(233, 30, 99, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              style={styles.buttonPrimary}
            >
              {loading ? (
                <span style={{display: 'flex', alignItems: 'center', gap: 8}}>
                  <svg style={{width: 20, height: 20, animation: 'spin 1s linear infinite'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path style={{opacity: 0.75}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Salvando...
                </span>
              ) : 'Salvar'}
            </motion.button>
            <Link 
              to="/perfil"
              style={styles.buttonSecondary}
            >
              <ArrowLeftIcon style={{width: 20, height: 20}} />
              Voltar
            </Link>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    padding: '2rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  bgGradient: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #db2777 0%, #7c3aed 0%, #4f46e5 100%)',
    zIndex: -1
  },
  bubble: {
    position: 'absolute',
    width: 384,
    height: 384,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    filter: 'blur(64px)',
    animation: 'pulse 3s ease-in-out infinite'
  },
  card: {
    position: 'relative',
    width: '100%',
    maxWidth: 480,
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(16px)',
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '2rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #db2777 0%, #7c3aed 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  },
  subtitle: {
    color: '#6b7280',
    marginTop: '0.5rem'
  },
  error: {
    marginBottom: '1.5rem',
    padding: '1rem',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '0.75rem'
  },
  success: {
    marginBottom: '1.5rem',
    padding: '1rem',
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  input: {
    width: '100%',
    padding: '0.875rem 1rem',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.2s'
  },
  buttonPrimary: {
    flex: 1,
    padding: '0.875rem 1.5rem',
    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    color: 'white',
    fontWeight: 600,
    borderRadius: '0.75rem',
    boxShadow: '0 10px 25px -5px rgba(233, 30, 99, 0.4)',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  buttonSecondary: {
    padding: '0.875rem 1.5rem',
    background: '#f3f4f6',
    color: '#374151',
    fontWeight: 600,
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
    fontSize: '1rem'
  }
}