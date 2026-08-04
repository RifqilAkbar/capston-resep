import { useEffect, useState } from 'react'
import { api } from '../api'

export default function AdminDashboard({ token }) {
  const [semuaResep, setSemuaResep] = useState([])
  const [semuaUser, setSemuaUser] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let aktif = true
    Promise.all([api.semuaResep(token), api.semuaUser(token)])
      .then(([resep, users]) => {
        if (!aktif) return
        setSemuaResep(resep.resep || [])
        setSemuaUser(users.users || [])
      })
      .catch(() => {})
      .finally(() => { if (aktif) setLoading(false) })
    return () => { aktif = false }
  }, [token])

  const pending = semuaResep.filter((r) => r.status === 'pending')
  const approved = semuaResep.filter((r) => r.status === 'approved')
  const rejected = semuaResep.filter((r) => r.status === 'rejected')
  const admins = semuaUser.filter((u) => u.role === 'admin')

  const stat = [
    { label: 'Total Resep', nilai: semuaResep.length, ikon: 'fa-book-open', warna: 'bg-orange-100 dark:bg-orange-900/40 text-accent' },
    { label: 'Menunggu Persetujuan', nilai: pending.length, ikon: 'fa-hourglass-half', warna: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400' },
    { label: 'Disetujui', nilai: approved.length, ikon: 'fa-check', warna: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400' },
    { label: 'Ditolak', nilai: rejected.length, ikon: 'fa-ban', warna: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' },
    { label: 'Total User', nilai: semuaUser.length, ikon: 'fa-users', warna: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' },
    { label: 'Admin', nilai: admins.length, ikon: 'fa-user-shield', warna: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400' },
  ]

  return (
    <main className="page-container mt-10 pb-16">
      <div>
        <span className="section-kicker"><i className="fa-solid fa-gauge-high" />Dashboard Admin</span>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Ringkasan Aplikasi</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pantau resep, moderasi, dan akun pengguna.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="skeleton-pulse h-24 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {stat.map((s) => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-5">
              <span className={`inline-flex w-11 h-11 rounded-xl items-center justify-center text-lg ${s.warna}`}>
                <i className={`fa-solid ${s.ikon}`} />
              </span>
              <p className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-gray-100">{s.nilai}</p>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {pending.length > 0 && (
        <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 pb-0">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Perlu Persetujuan</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Resep dari user yang menunggu tinjauan Anda.</p>
          </div>
          <div className="p-6 space-y-3">
            {pending.map((r) => (
              <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 dark:text-gray-100 truncate">{r.judul_resep}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    oleh <strong>{r.pembuat_nama || r.pembuat_username || 'Admin'}</strong>
                    <span className="mx-2">•</span>{r.kategori}
                  </p>
                </div>
                <a href={`#/kelola-resep`} className="text-sm font-bold text-accent hover:underline">Tinjau di Kelola Resep →</a>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <a href="#/kelola-resep" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition group">
          <span className="inline-flex w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/40 text-accent items-center justify-center text-xl"><i className="fa-solid fa-book-open" /></span>
          <h3 className="mt-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-accent transition">Kelola Resep</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Setujui, tolak, edit, atau hapus semua resep.</p>
        </a>
        <a href="#/kelola-user" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition group">
          <span className="inline-flex w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 items-center justify-center text-xl"><i className="fa-solid fa-users" /></span>
          <h3 className="mt-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-accent transition">Kelola User</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Atur role dan hapus akun pengguna.</p>
        </a>
      </div>
    </main>
  )
}
