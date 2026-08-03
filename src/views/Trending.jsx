import { useMemo } from 'react'
import { CardResep } from '../components/CardResep'
import { mockLike } from '../mock'

export default function Trending({ semuaResep, favoritIds, onToggleFavorit }) {
  const daftar = useMemo(
    () => [...semuaResep].sort((a, b) => mockLike(b.id) - mockLike(a.id)),
    [semuaResep],
  )

  return (
    <main className="page-container mt-10 space-y-8 pb-16">
      <div>
        <span className="section-kicker"><i className="fa-solid fa-fire" />Trending</span>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Masakan yang Sedang Populer</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{daftar.length} resep sedang banyak dimasak hari ini.</p>
      </div>

      {daftar.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {daftar.map((r, i) => (
            <CardResep key={r.id} resep={r} index={i} isFavorit={favoritIds.includes(Number(r.id))} onToggleFavorit={onToggleFavorit} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
          <span className="empty-icon"><i className="fa-solid fa-fire" /></span>
          <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-gray-100">Belum Ada Resep Trending</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Coba buka halaman resep dan jelajahi masakan lainnya.</p>
          <a href="#/resep" className="btn-primary inline-flex mt-5"><i className="fa-solid fa-book-open" />Jelajahi Resep</a>
        </div>
      )}
    </main>
  )
}
