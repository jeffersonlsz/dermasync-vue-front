// src/services/auth.js
import api from '../lib/api'

export async function login(email, password) {
  // adapta ao contrato do seu backend: /auth/login -> { access_token, token_type }
  const res = await api.post('/auth/login', { email, password })
  const token = res.data?.access_token || res.data?.token
  if (!token) throw new Error('Resposta inválida do servidor (sem token)')
  localStorage.setItem('authToken', token) // Using authToken as per new requirements
  return res.data
}

export function logout() {
  localStorage.removeItem('authToken') // Using authToken as per new requirements
  window.location.href = '/login'
}

export function isAuthenticated() {
  const t = localStorage.getItem('authToken') // Using authToken as per new requirements
  return !!t
}

export async function getProfile() {
  // opcional: valida token requisitando /auth/me
  return api.get('/auth/me').then(r => r.data)
}
