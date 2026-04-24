const API_BASE = '/api'
const BACKEND_URL = 'http://localhost:8080'

export function resolveImageUrl(url) {
  if (!url) return null
  if (url.startsWith('http')) return url
  if (url.startsWith('/uploads')) return BACKEND_URL + '/api' + url
  return url
}

export async function fetchEventos(params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${API_BASE}/eventos${query ? '?' + query : ''}`)
  if (!res.ok) throw new Error('Failed to fetch eventos')
  return res.json()
}

export async function fetchEvento(id) {
  const res = await fetch(`${API_BASE}/eventos/${id}`)
  if (!res.ok) throw new Error('Failed to fetch evento')
  return res.json()
}

export async function createEvento(data, token) {
  const res = await fetch(`${API_BASE}/eventos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create evento')
  return res.json()
}

export async function register(data) {
  const res = await fetch(`${API_BASE}/usuarios/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to register')
  return res.json()
}

export async function login(data) {
  const res = await fetch(`${API_BASE}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to login')
  return res.json()
}

export async function toggleInteresse(eventoId, token) {
  const res = await fetch(`${API_BASE}/interesse/${eventoId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to toggle interesse')
  return res.json()
}

export async function removeInteresse(eventoId, token) {
  const res = await fetch(`${API_BASE}/interesse/${eventoId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to remove interesse')
  return res.json()
}

export async function getMyEventos(token) {
  const res = await fetch(`${API_BASE}/usuarios/me/eventos`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch my eventos')
  return res.json()
}

export async function getMyInteresses(token) {
  const res = await fetch(`${API_BASE}/usuarios/me/interesses`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch my interesses')
  return res.json()
}

export async function getMyProfile(token) {
  const res = await fetch(`${API_BASE}/usuarios/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch profile')
  return res.json()
}

export async function updateMyProfile(data, token) {
  const res = await fetch(`${API_BASE}/usuarios/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update profile')
  return res.json()
}

export async function createEmpresa(data, token) {
  const res = await fetch(`${API_BASE}/empresa`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create empresa')
  return res.json()
}

export async function updateEmpresa(id, data, token) {
  const res = await fetch(`${API_BASE}/empresa/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update empresa')
  return res.json()
}

export async function getEmpresa(id) {
  const res = await fetch(`${API_BASE}/empresa/${id}`)
  if (!res.ok) throw new Error('Failed to fetch empresa')
  return res.json()
}

export async function getEmpresaByUsuario(usuarioId) {
  const res = await fetch(`${API_BASE}/empresa/by-usuario/${usuarioId}`)
  if (!res.ok) throw new Error('Failed to fetch empresa')
  return res.json()
}

export async function getInteressados(eventoId) {
  const res = await fetch(`${API_BASE}/eventos/${eventoId}/interessados`)
  if (!res.ok) throw new Error('Failed to fetch interessados')
  return res.json()
}

export async function uploadFile(file, token) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API_BASE}/uploads`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  })
  if (!res.ok) throw new Error('Failed to upload file')
  return res.text()
}