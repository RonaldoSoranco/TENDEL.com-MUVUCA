import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import CompraIngresso from '../components/CompraIngresso'

export default function EventDetail() {
  const { id } = useParams()
  
  const [evento, setEvento] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [marcado, setMarcado] = useState(false)
  const [pessoas, setPessoas] = useState([])
  const [empresa, setEmpresa] = useState(null)
  const [compraAberta, setCompraAberta] = useState(false)

  useEffect(() => {
    loadEvento()
  }, [id])

  async function loadEvento() {
    try {
      setLoading(true)
      setError(null)
      
      const res = await fetch(`/api/eventos/${id}`)
      if (!res.ok) {
        setError('Evento não encontrado')
        setLoading(false)
        return
      }
      const data = await res.json()
      setEvento(data)
      
      const token = localStorage.getItem('tendel_token')
      const userData = JSON.parse(localStorage.getItem('tendel_user') || 'null')
      
      if (token && userData) {
        try {
          const res2 = await fetch(`/api/eventos/${id}/interessados`)
          if (res2.ok) {
            const interests = await res2.json()
            setPessoas(interests || [])
            const tenho = interests?.find(u => u.id === userData.id)
            setMarcado(!!tenho)
          }
        } catch (e) {
          console.warn('Erro interesses:', e)
        }
        
        try {
          if (data.autorId) {
            const res3 = await fetch(`/api/empresa/by-usuario/${data.autorId}`)
            if (res3.ok) {
              const emp = await res3.json()
              setEmpresa(emp)
            }
          }
        } catch (e) {
          console.warn('Erro empresa:', e)
        }
      }
    } catch (err) {
      setError(err.message || 'Erro ao carregar')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{textAlign:'center',padding:'4rem'}}>
        <div style={{
          width:'3rem',height:'3rem',
          border:'3px solid #f1f5f9',borderTopColor:'#ec4899',
          borderRadius:'50%',animation:'spin 0.8s linear infinite',
          margin:'0 auto'
        }} />
        <p style={{color:'#64748b',marginTop:'1rem'}}>Carregando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{padding:'2rem',textAlign:'center'}}>
        <Link to="/eventos" style={styles.voltar}>← Voltar aos Eventos</Link>
        <div style={styles.erro}>{error}</div>
        <button onClick={loadEvento} style={styles.botaoRetry}>Tentar novamente</button>
      </div>
    )
  }

  if (!evento) {
    return (
      <div style={{padding:'2rem',textAlign:'center'}}>
        <Link to="/eventos" style={styles.voltar}>← Voltar aos Eventos</Link>
        <div style={styles.toast}>Evento não encontrado</div>
      </div>
    )
  }

  const dataBR = new Date(evento.data).toLocaleDateString('pt-BR', { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
  const horaBR = evento.hora?.substring(0, 5) || ''

  const corBadge = evento.categoria === 'FESTA' ? '#ec4899' :
                  evento.categoria === 'SHOW' ? '#8b5cf6' :
                  evento.categoria === 'RPG' ? '#f59e0b' : '#64748b'

  return (
    <div style={styles.container}>
      <Link to="/eventos" style={styles.voltar}>← Voltar aos Eventos</Link>

      <div style={styles.cartao}>
        <div style={styles.header}>
          <div style={{...styles.banner, background: corBadge}}>
            <span style={{fontSize:'4rem',opacity:0.3}}>🎉</span>
          </div>
          <div style={styles.tituloArea}>
            <span style={{...styles.badge, background: corBadge}}>{evento.categoria}</span>
            <h1 style={styles.titulo}>{evento.nome}</h1>
          </div>
        </div>

        <div style={styles.corpo}>
          <div style={styles.gridInfo}>
            <div style={styles.info}>
              <span style={styles.infoIcon}>📅</span>
              <span style={styles.label}>Data</span>
              <span style={styles.valor}>{dataBR}</span>
            </div>
            <div style={styles.info}>
              <span style={styles.infoIcon}>🕐</span>
              <span style={styles.label}>Horário</span>
              <span style={styles.valor}>{horaBR}</span>
            </div>
            <div style={styles.info}>
              <span style={styles.infoIcon}>📍</span>
              <span style={styles.label}>Local</span>
              <span style={styles.valor}>{evento.local}</span>
            </div>
            <div style={styles.info}>
              <span style={styles.infoIcon}>🎟️</span>
              <span style={styles.label}>Valor</span>
              <span style={{...styles.valor, color: evento.preco > 0 ? '#ec4899' : '#10b981'}}>
                {evento.preco > 0 ? `R$ ${parseFloat(evento.preco).toFixed(2)}` : 'Grátis'}
              </span>
            </div>

            {evento.preco > 0 && (
              <button onClick={() => setCompraAberta(true)} style={styles.botaoComprar}>
                🎟️ Comprar Ingresso
              </button>
            )}
          </div>

          {empresa && (
            <div style={styles.empresa}>
              {empresa.fotoUrl && (
                <img src={empresa.fotoUrl.startsWith('/uploads') ? 'http://localhost:8080/api' + empresa.fotoUrl : empresa.fotoUrl} alt={empresa.nome} style={styles.empresaImg} />
              )}
              <div style={{flex:1}}>
                <h4 style={{margin:'0 0 0.25rem',color:'#1e293b'}}>{empresa.nome}</h4>
                {empresa.descricao && (
                  <p style={{margin:0,color:'#64748b',fontSize:'0.875rem'}}>{empresa.descricao}</p>
                )}
                {empresa.linkSite && (
                  <a href={empresa.linkSite} target="_blank" rel="noopener" style={styles.link}>
                    Ver Site ↗
                  </a>
                )}
              </div>
            </div>
          )}

          {evento.descricao && (
            <div style={styles.descricao}>
              <h3 style={{margin:'0 0 0.75rem',color:'#1e293b'}}>Descrição</h3>
              <p style={{margin:0,color:'#475569',lineHeight:1.6}}>{evento.descricao}</p>
            </div>
          )}

          <div style={styles.pessoas}>
            <h3 style={{margin:'0 0 0.5rem',color:'#1e293b'}}>👥 Pessoas Interessadas ({pessoas.length})</h3>
            {pessoas.length === 0 ? (
              <p style={{color:'#94a3b8'}}>Seja o primeiro!</p>
            ) : (
              <div style={{display:'flex',flexWrap:'wrap',gap:'0.5rem'}}>
                {pessoas.map(p => (
                  <a 
                    key={p.id} 
                    href={`/perfil/${p.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.pessoaTag}
                  >
                    {p.fotoUrl ? (
                      <img src={p.fotoUrl.startsWith('/uploads') ? 'http://localhost:8080/api' + p.fotoUrl : p.fotoUrl} alt={p.nome} style={styles.pessoaImg} />
                    ) : (
                      <span style={styles.pessoaInicial}>{p.nome?.[0] || '?'}</span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <CompraIngresso 
          evento={evento} 
          isOpen={compraAberta} 
          onClose={() => setCompraAberta(false)} 
        />
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 1rem 2rem'
  },
  voltar: {
    display:'inline-flex',color:'#64748b',textDecoration:'none',
    fontSize:'0.875rem',marginBottom:'1rem',fontWeight:500
  },
  erro: {
    padding:'1rem',borderRadius:'0.75rem',background:'#fef2f2',color:'#b91c1c',
    border:'1px solid #fecaca',marginTop:'1rem'
  },
  toast: {
    padding:'1rem',borderRadius:'0.75rem',background:'#f8fafc',color:'#475569',
    marginTop:'1rem'
  },
  cartao: {
    background:'white',borderRadius:'1.5rem',overflow:'hidden',
    boxShadow:'0 4px 20px rgba(0,0,0,0.08)'
  },
  header: {
    position:'relative',minHeight:'200px',
    background:'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)'
  },
  banner: {
    position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'
  },
  tituloArea: {
    position:'absolute',bottom:0,left:0,right:0,padding:'2rem',color:'white',
    background:'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent)'
  },
  badge: {
    display:'inline-block',padding:'0.25rem 0.75rem',borderRadius:'9999px',
    fontSize:'0.625rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',
    marginBottom:'0.5rem'
  },
  titulo: {
    margin:0,fontSize:'1.75rem',fontWeight:800,lineHeight:1.2
  },
  corpo: { padding:'1.5rem' },
  gridInfo: {
    display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'1rem',padding:'1rem 0',
    borderBottom:'1px solid #e2e8f0',marginBottom:'1rem'
  },
  info: { display:'flex',flexDirection:'column',gap:'0.25rem' },
  infoIcon: { fontSize:'1.25rem' },
  label: {
    fontSize:'0.6875rem',fontWeight:600,color:'#94a3b8',textTransform:'uppercase',
    letterSpacing:'0.05em'
  },
  valor: { fontSize:'0.9375rem',fontWeight:600,color:'#1e293b' },
  botaoComprar: {
    display:'block',width:'100%',padding:'1rem',marginTop:'1rem',
    background:'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    color:'white',border:'none',borderRadius:'0.75rem',
    fontSize:'1rem',fontWeight:700,cursor:'pointer'
  },
  empresa: {
    display:'flex',gap:'1rem',padding:'1rem',background:'#f8fafc',borderRadius:'1rem',
    marginBottom:'1rem'
  },
  empresaImg: {
    width:'4rem',height:'4rem',borderRadius:'0.75rem',objectFit:'cover'
  },
  link: {
    display:'inline-block',marginTop:'0.5rem',color:'#8b5cf6',textDecoration:'none',
    fontSize:'0.875rem'
  },
  descricao: { padding:'1.5rem 0',borderTop:'1px solid #e2e8f0' },
  pessoas: { padding:'1rem 0',borderTop:'1px solid #e2e8f0' },
  pessoaTag: {
    display:'inline-flex',alignItems:'center',justifyContent:'center',
    width:'2.5rem',height:'2.5rem',borderRadius:'50%',
    background:'linear-gradient(135deg, #ec4899, #8b5cf6)',
    textDecoration: 'none',
    overflow: 'hidden'
  },
  pessoaImg: {
    width:'100%',height:'100%',objectFit:'cover'
  },
  pessoaInicial: {
    color:'white',fontSize:'0.9rem',fontWeight:700
  },
  botaoRetry: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #fecaca',
    background: 'white',
    color: '#b91c1c',
    cursor: 'pointer',
    fontWeight: 600
  }
}