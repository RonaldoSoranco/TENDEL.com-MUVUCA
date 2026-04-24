import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { getEmpresaByUsuario, getEmpresa, createEmpresa, updateEmpresa, uploadFile } from '../services/api'

export default function Empresa() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const [loading, setLoading] = useState(false)
  const [empresa, setEmpresa] = useState(null)
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [endereco, setEndereco] = useState('')
  const [linkSite, setLinkSite] = useState('')
  const [fotoUrl, setFotoUrl] = useState('')
  const [fotoPreview, setFotoPreview] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

function resolveImageUrl(url) {
    if (!url) return null
    if (url.startsWith('http')) return url
    if (url.startsWith('/uploads')) return 'http://localhost:8080' + url
    return url
  }

  useEffect(() => {
    const token = localStorage.getItem('tendel_token')
    const userData = JSON.parse(localStorage.getItem('tendel_user') || 'null')
    
    if (!token || !userData) {
      navigate('/login')
      return
    }

    if (id && id !== 'criar') {
      getEmpresa(id)
        .then(data => {
          setEmpresa(data)
          setNome(data.nome || '')
          setDescricao(data.descricao || '')
          setEndereco(data.endereco || '')
          setLinkSite(data.linkSite || '')
          setFotoUrl(data.fotoUrl || '')
          if (data.fotoUrl) setFotoPreview(resolveImageUrl(data.fotoUrl))
        })
        .catch(err => setError(err.message))
    } else if (userData?.id) {
      getEmpresaByUsuario(userData.id)
        .then(data => {
          navigate(`/empresa/${data.id}`)
        })
        .catch(() => {})
    }
  }, [navigate, id, isEdit])

  async function handleFotoChange(e) {
    const file = e.target.files[0]
    if (!file) return
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
        throw new Error('Falha ao fazer upload')
      }

      const resolvedUrl = finalFotoUrl.startsWith('/uploads') 
        ? 'http://localhost:8080' + finalFotoUrl 
        : finalFotoUrl

      const data = { nome, descricao, endereco, linkSite, fotoUrl: finalFotoUrl }
      
      if (isEdit) {
        await updateEmpresa(id, data, token)
      } else {
        await createEmpresa(data, token)
      }

      setSuccess(isEdit ? 'Empresa atualizada!' : 'Empresa criada!')
      setTimeout(() => navigate('/perfil'), 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>{isEdit ? 'Editar Empresa' : 'Criar Empresa'}</h1>
      
      {error && <div className="toast toast-error mb-2">{error}</div>}
      {success && <div className="toast toast-success mb-2">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Foto do Local</label>
          <div className="empresa-foto-edit">
            {fotoPreview ? (
              <img src={fotoPreview} alt="Preview" className="foto-preview" />
            ) : (
              <div className="foto-placeholder">?</div>
            )}
            <input 
              type="file" 
              id="foto" 
              accept="image/*"
              onChange={handleFotoChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Nome do Local/Empresa</label>
          <input 
            type="text" 
            className="form-input"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Nome do seu espaço ou empresa"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Descrição</label>
          <textarea 
            className="form-input"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            placeholder="Descreva seu espaço, ambiente, história..."
            rows={4}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Endereço</label>
          <input 
            type="text" 
            className="form-input"
            value={endereco}
            onChange={e => setEndereco(e.target.value)}
            placeholder="Endereço completo"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Site (opcional)</label>
          <input 
            type="url" 
            className="form-input"
            value={linkSite}
            onChange={e => setLinkSite(e.target.value)}
            placeholder="https://"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <Link to="/perfil" className="btn btn-link ml-2">Cancelar</Link>
        </div>
      </form>
    </div>
  )
}