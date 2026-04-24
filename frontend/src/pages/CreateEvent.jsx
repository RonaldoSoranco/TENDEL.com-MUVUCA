import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { createEvento } from '../services/api'

const CATEGORIAS = [
  { valor: 'FESTA', label: 'Festa', cor: '#ec4899' },
  { valor: 'SHOW', label: 'Show', cor: '#8b5cf6' },
  { valor: 'RPG', label: 'RPG', cor: '#f59e0b' },
  { valor: 'OUTRO', label: 'Outro', cor: '#64748b' }
]

export default function CreateEvent() {
  const navigate = useNavigate()
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    data: '',
    hora: '',
    local: '',
    cidade: '',
    categoria: 'FESTA',
    preco: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)
    
    try {
      const token = localStorage.getItem('tendel_token')
      if (!token) {
        navigate('/login')
        return
      }
      
      await createEvento({
        ...form,
        preco: form.preco ? parseFloat(form.preco) : 0
      }, token)
      
      navigate('/meus-eventos')
    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getCategoriaCor = (cat) => CATEGORIAS.find(c => c.valor === cat)?.cor || '#64748b'

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <Link to="/meus-eventos" style={styles.voltar}>← Voltar</Link>

      <div style={styles.cartao}>
        <div style={styles.header}>
          <h1 style={styles.titulo}>Criar Novo Evento</h1>
          <p style={styles.subtitulo}>Preencha os dados do seu evento</p>
        </div>

        <div style={styles.corpo}>
          {erro && <div style={styles.erro}>{erro}</div>}
          
          <form onSubmit={handleSubmit}>
            <div style={styles.grupo}>
              <label style={styles.label}>Nome do Evento *</label>
              <input
                style={styles.input}
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Ex: Festa de Aniversário"
                required
              />
            </div>
            
            <div style={styles.grupo}>
              <label style={styles.label}>Descrição</label>
              <textarea
                style={{...styles.input, minHeight: '100px', resize: 'vertical'}}
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                placeholder="Conteúdo sobre o evento..."
              />
            </div>

            <div style={styles.grid2}>
              <div style={styles.grupo}>
                <label style={styles.label}>Data *</label>
                <input
                  style={styles.input}
                  type="date"
                  name="data"
                  value={form.data}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div style={styles.grupo}>
                <label style={styles.label}>Hora *</label>
                <input
                  style={styles.input}
                  type="time"
                  name="hora"
                  value={form.hora}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={styles.grupo}>
              <label style={styles.label}>Local *</label>
              <input
                style={styles.input}
                name="local"
                value={form.local}
                onChange={handleChange}
                placeholder="Ex: Salão de Festas"
                required
              />
            </div>

            <div style={styles.grupo}>
              <label style={styles.label}>Cidade *</label>
              <input
                style={styles.input}
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
                placeholder="Ex: São Paulo"
                required
              />
            </div>

            <div style={styles.grupo}>
              <label style={styles.label}>Categoria *</label>
              <div style={styles.cats}>
                {CATEGORIAS.map(cat => (
                  <button
                    key={cat.valor}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, categoria: cat.valor }))}
                    style={{
                      ...styles.catBotao,
                      background: form.categoria === cat.valor ? cat.cor : 'white',
                      color: form.categoria === cat.valor ? 'white' : '#64748b',
                      borderColor: cat.cor
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.grupo}>
              <label style={styles.label}>Preço (R$)</label>
              <input
                style={styles.input}
                type="number"
                step="0.01"
                name="preco"
                value={form.preco}
                onChange={handleChange}
                placeholder="0 = Grátis"
              />
            </div>
            
            <button type="submit" style={styles.botao} disabled={loading}>
              {loading ? 'Criando...' : 'Criar Evento'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '0 1rem 2rem'
  },
  voltar: {
    display:'inline-flex',color:'#64748b',textDecoration:'none',
    fontSize:'0.875rem',marginBottom:'1rem',fontWeight:500
  },
  cartao: {
    background:'white',borderRadius:'1.5rem',overflow:'hidden',
    boxShadow:'0 4px 20px rgba(0,0,0,0.08)'
  },
  header: {
    padding:'2rem','textAlign':'center',
    background:'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
    color:'white'
  },
  titulo: { margin:0,fontSize:'1.75rem',fontWeight:800 },
  subtitulo: { margin:'0.5rem 0 0',opacity:0.8 },
  corpo: { padding:'2rem' },
  erro: {
    padding:'1rem',borderRadius:'0.75rem',background:'#fef2f2',color:'#b91c1c',
    border:'1px solid #fecaca',marginBottom:'1rem'
  },
  grupo: { marginBottom:'1.25rem' },
  label: {
    display:'block',fontSize:'0.875rem',fontWeight:600,color:'#374151',marginBottom:'0.5rem'
  },
  input: {
    width:'100%',padding:'0.75rem 1rem',borderRadius:'0.75rem',
    border:'1px solid #e2e8f0',fontSize:'1rem',outline:'none',
    transition:'border-color 0.2s'
  },
  grid2: {
    display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'1rem'
  },
  cats: { display:'flex',gap:'0.5rem',flexWrap:'wrap' },
  catBotao: {
    padding:'0.5rem 1rem',borderRadius:'9999px',
    border:'1px solid',fontSize:'0.875rem',fontWeight:600,
    cursor:'pointer'
  },
  botao: {
    width:'100%',padding:'1rem',borderRadius:'0.75rem',
    background:'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    color:'white',border:'none',fontSize:'1rem',fontWeight:700,
    cursor:'pointer',marginTop:'1rem'
  }
}