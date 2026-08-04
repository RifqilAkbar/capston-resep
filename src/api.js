const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
const TOKEN_KEY = 'skripsi_masak_token'

// Token JWT disimpan di browser agar session tetap ada setelah refresh halaman.
export function ambilTokenTersimpan() {
  return localStorage.getItem(TOKEN_KEY)
}

export function simpanToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function hapusToken() {
  localStorage.removeItem(TOKEN_KEY)
}

// Wrapper fetch ini menyatukan base URL, JSON body, auth header, dan format error API.
async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || 'Request API gagal.')
  }

  return data
}

export const api = {
  ambilDataPublik: () => request('/public/data'),
  detailResep: (id) => request(`/public/recipes/${id}`),
  komentarResep: (id) => request(`/recipes/${id}/comments`),

  // Auth dipisah dari komponen supaya App.jsx fokus pada state dan tampilan.
  daftar: (payload) => request('/auth/register', {
    method: 'POST',
    body: payload,
  }),
  login: (email, password) => request('/auth/login', {
    method: 'POST',
    body: { email, password },
  }),
  cekSession: (token) => request('/auth/session', { token }),

  // Profil
  ambilProfil: (token) => request('/profile', { token }),
  ubahProfil: (token, payload) => request('/profile', {
    method: 'PATCH',
    token,
    body: payload,
  }),
  ubahPassword: (token, payload) => request('/profile/password', {
    method: 'PATCH',
    token,
    body: payload,
  }),

  // Endpoint data menggantikan query Supabase ke ingredients, recipes, dan relasi resep.
  ambilDataAwal: (token) => request('/initial-data', { token }),
  ambilBahanTertunda: (token) => request('/ingredients/pending', { token }),
  tambahBahan: (token, payload) => request('/ingredients', {
    method: 'POST',
    token,
    body: payload,
  }),
  setujuiBahan: (token, idBahan) => request(`/ingredients/${idBahan}/approve`, {
    method: 'PATCH',
    token,
  }),

  // Resep
  tambahResep: (token, payload) => request('/recipes', {
    method: 'POST',
    token,
    body: payload,
  }),
  resepMilikSaya: (token) => request('/recipes/mine', { token }),
  ambilResep: (token, id) => request(`/recipes/${id}`, { token }),
  ubahResep: (token, id, payload) => request(`/recipes/${id}`, {
    method: 'PATCH',
    token,
    body: payload,
  }),
  hapusResep: (token, id) => request(`/recipes/${id}`, {
    method: 'DELETE',
    token,
  }),
  beriRating: (token, id, nilai) => request(`/recipes/${id}/rating`, {
    method: 'POST',
    token,
    body: { nilai },
  }),
  kirimKomentar: (token, id, isi) => request(`/recipes/${id}/comments`, {
    method: 'POST',
    token,
    body: { isi },
  }),

  // Favorit
  ambilFavorit: (token) => request('/favorites', { token }),
  tambahFavorit: (token, idResep) => request(`/favorites/${idResep}`, {
    method: 'POST',
    token,
  }),
  hapusFavorit: (token, idResep) => request(`/favorites/${idResep}`, {
    method: 'DELETE',
    token,
  }),

  // Admin
  semuaResep: (token) => request('/admin/recipes', { token }),
  ubahStatusResep: (token, id, status) => request(`/admin/recipes/${id}/status`, {
    method: 'PATCH',
    token,
    body: { status },
  }),
  semuaUser: (token) => request('/admin/users', { token }),
  ubahRoleUser: (token, id, role) => request(`/admin/users/${id}`, {
    method: 'PATCH',
    token,
    body: { role },
  }),
  hapusUser: (token, id) => request(`/admin/users/${id}`, {
    method: 'DELETE',
    token,
  }),
}
