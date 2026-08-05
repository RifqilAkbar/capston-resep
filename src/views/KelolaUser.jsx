import { useEffect, useState } from 'react'
import { api } from '../api'
import { fotoAvatar } from '../mock'

export default function KelolaUser({ token, session }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [pesan, setPesan] = useState('')
  const userIdSaya = session?.user?.id

  const muat = async () => {
    try {
      const data = await api.semuaUser(token)
      setUsers(data.users || [])
    } catch (error) {
      setPesan(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let aktif = true
    api.semuaUser(token)
      .then((data) => { if (aktif) setUsers(data.users || []) })
      .catch((error) => { if (aktif) setPesan(error.message) })
      .finally(() => { if (aktif) setLoading(false) })
    return () => { aktif = false }
  }, [token])

  const handleRole = async (u, roleBaru) => {
    if (!window.confirm(`Ubah role "${u.nama_lengkap || u.email}" menjadi ${roleBaru}?`)) return
    try {
      await api.ubahRoleUser(token, u.id, roleBaru)
      setPesan(`Sukses! Role ${u.nama_lengkap || u.email} diubah menjadi ${roleBaru}.`)
      await muat()
    } catch (error) {
      setPesan(error.message)
    }
  }

  const handleHapus = async (u) => {
    if (!window.confirm(`Hapus akun "${u.nama_lengkap || u.email}"? Resep miliknya akan tetap ada.`)) return
    try {
      await api.hapusUser(token, u.id)
      setPesan(`Sukses! Akun ${u.nama_lengkap || u.email} berhasil dihapus.`)
      await muat()
    } catch (error) {
      setPesan(error.message)
    }
  }

  return (
    <main className="page-container mt-10 pb-16">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="section-kicker"><i className="fa-solid fa-users" />Kelola User</span>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Daftar Pengguna</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tentukan siapa yang menjadi user dan siapa yang menjadi admin.</p>
        </div>
        <a href="#/dashboard" className="btn-secondary text-sm"><i className="fa-solid fa-arrow-left" /> Dashboard</a>
      </div>

      {pesan && (
        <p className={`mt-4 font-semibold text-center text-sm ${pesan.includes('Sukses') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{pesan}</p>
      )}

      <div className="mt-6 space-y-3">
        {loading ? (
          <div>{[1, 2, 3].map((i) => <div key={i} className="skeleton-pulse h-20 rounded-2xl mb-3" />)}</div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
            <span className="empty-icon"><i className="fa-solid fa-user-slash" /></span>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">Belum ada pengguna.</p>
          </div>
        ) : (
          users.map((u) => {
            const dilindungi = u.role === 'superadmin' || u.id === userIdSaya
            const badgeWarna = u.role === 'superadmin'
              ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
              : u.role === 'admin'
                ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'

            return (
              <div key={u.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-5">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <img src={fotoAvatar(u.username || u.email)} alt={u.nama_lengkap || u.email} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 dark:text-gray-100 truncate">{u.nama_lengkap || '—'}</p>
                    <p className="text-xs text-gray-400 truncate">
                      <i className="fa-solid fa-envelope mr-1" />{u.email}
                      {u.username && <><span className="mx-1.5">•</span>@{u.username}</>}
                      <span className="mx-1.5">•</span><i className="fa-solid fa-book-open mr-1" />{u.jumlah_resep} resep
                    </p>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold capitalize ${badgeWarna}`}>
                    {u.role === 'superadmin' && <i className="fa-solid fa-crown mr-1" />}
                    {u.role}
                    {u.id === userIdSaya && ' (Anda)'}
                  </span>
                  {dilindungi ? (
                    <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1.5 shrink-0">
                      <i className="fa-solid fa-lock" /> Terlindungi
                    </span>
                  ) : (
                    <div className="flex gap-2 shrink-0">
                      <select
                        value={u.role}
                        onChange={(e) => handleRole(u, e.target.value)}
                        className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button type="button" onClick={() => handleHapus(u)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 dark:border-red-800 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition">
                        <i className="fa-solid fa-trash-can" /> Hapus
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </main>
  )
}