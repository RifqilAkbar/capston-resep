import { CardResep } from '../components/CardResep'

export default function Favorit({ semuaResep, favoritIds, onToggleFavorit }) {
  const daftar = semuaResep.filter((r) => favoritIds.includes(Number(r.id)))

  return (
    <main className="max-w-5xl mx-auto px-4 mt-10 space-y-8 pb-16">
      <div>
        <span className="section-kicker"><i className="fa-solid fa-heart" />Favorit</span>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Resep Favorit</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{daftar.length} resep yang Anda tandai.</p>
      </div>

      {daftar.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {daftar.map((r, i) => (
            <CardResep key={r.id} resep={r} index={i} isFavorit onToggleFavorit={onToggleFavorit} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
          <span className="empty-icon"><i className="fa-solid fa-heart" /></span>
          <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-gray-100">Belum Ada Resep Favorit</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ketuk ikon hati pada resep untuk menyimpannya di sini.</p>
          <a href="#/resep" className="btn-primary inline-flex mt-5"><i className="fa-solid fa-book-open" />Jelajahi Resep</a>
        </div>
      )}
    </main>
  )
}
