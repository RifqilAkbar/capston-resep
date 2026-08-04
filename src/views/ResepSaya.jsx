import { useEffect, useState } from 'react'
import { api } from '../api'

const WARNA_STATUS = {
  pending: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
  approved: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
  rejected: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
}
const LABEL_STATUS = { pending: 'Pending', approved: 'Disetujui', rejected: 'Ditolak' }

export default function ResepSaya({ token, onDataRefresh }) {
  const [resep, setResep] = useState([])
  const [loading, setLoading] = useState(true)
  const [pesan, setPesan] = useState('')

  const muat = async () => {
    try {
      const data = await api.resepMilikSaya(token)
      setResep(data.resep || [])
    } catch (error) {
      setPesan(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let aktif = true
    api.resepMilikSaya(token)
      .then((data) => { if (aktif) setResep(data.resep || []) })
      .catch((error) => { if (aktif) setPesan(error.message) })
      .finally(() => { if (aktif) setLoading(false) })
    return () => { aktif = false }
  }, [token])

  const handleHapus = async (id, judul) => {
    if (!window.confirm(`Hapus resep "${judul}"?`)) return
    try {
      await api.hapusResep(token, id)
      setPesan(`Sukses! Resep "${judul}" berhasil dihapus.`)
      await muat()
      if (onDataRefresh) await onDataRefresh()
    } catch (error) {
      setPesan(error.message)
    }
  }

  return (
    <main className="page-container mt-10 pb-16">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="section-kicker"><i className="fa-solid fa-book-open" />Resep Saya</span>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Resep Milik Saya</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola resep yang telah Anda buat.</p>
        </div>
        <a href="#/tambah-resep" className="btn-primary">
          <i className="fa-solid fa-plus" /> Tambah Resep
        </a>
      </div>

      {pesan && (
        <p className={`mt-4 font-semibold text-center text-sm ${pesan.includes('Sukses') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{pesan}</p>
      )}

      <div className="mt-6 space-y-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm">
                <div className="skeleton-pulse h-5 w-2/3 mb-3" />
                <div className="skeleton-pulse h-4 w-full" />
              </div>
            ))}
          </div>
        ) : resep.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
            <span className="empty-icon"><i className="fa-solid fa-book-open" /></span>
            <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-gray-100">Belum Ada Resep</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Anda belum membuat resep apapun.</p>
            <a href="#/tambah-resep" className="btn-primary inline-flex mt-5"><i className="fa-solid fa-plus" /> Tambah Resep Pertama</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {resep.map((r) => (
              <div key={r.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 leading-snug">{r.judul_resep}</h3>
                  <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${WARNA_STATUS[r.status] || WARNA_STATUS.pending}`}>
                    {LABEL_STATUS[r.status] || r.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  <i className="fa-solid fa-tags mr-1" />{r.kategori}
                  <span className="mx-2">•</span>
                  <i className="fa-solid fa-carrot mr-1" />{r.recipe_ingredients?.length || 0} bahan
                </p>
                {r.status === 'rejected' && (
                  <p className="text-xs text-red-500 mt-2"><i className="fa-solid fa-circle-xmark mr-1" />Ditolak oleh admin. Silakan perbaiki resep.</p>
                )}
                <div className="mt-4 flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => { window.location.hash = `#/edit-resep/${r.id}` }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:border-accent hover:text-accent transition"
                  >
                    <i className="fa-solid fa-pen" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHapus(r.id, r.judul_resep)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-red-200 dark:border-red-800 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                  >
                    <i className="fa-solid fa-trash-can" /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
