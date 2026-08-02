import { useMemo } from 'react'
import { CardResep } from '../components/CardResep'

export default function Riwayat({ semuaResep, favoritIds, onToggleFavorit }) {
  const daftar = useMemo(() => {
    const riwayat = window.Riwayat ? window.Riwayat.getAll() : []
    return riwayat.map((e) => semuaResep.find((r) => r.id === e.id)).filter(Boolean)
  }, [semuaResep])

  return (
    <main className="max-w-5xl mx-auto px-4 mt-10 space-y-8 pb-16">
      <div>
        <span className="section-kicker"><i className="fa-solid fa-clock-rotate-left" />Riwayat</span>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Riwayat Buka Resep</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Resep yang terakhir Anda buka.</p>
      </div>

      {daftar.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {daftar.map((r, i) => (
            <CardResep key={r.id} resep={r} index={i} isFavorit={favoritIds.includes(Number(r.id))} onToggleFavorit={onToggleFavorit} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
          <span className="empty-icon"><i className="fa-solid fa-clock-rotate-left" /></span>
          <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-gray-100">Belum Ada Riwayat</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Buka detail sebuah resep untuk menambahkannya ke riwayat.</p>
          <a href="#/resep" className="btn-primary inline-flex mt-5"><i className="fa-solid fa-book-open" />Jelajahi Resep</a>
        </div>
      )}
    </main>
  )
}
