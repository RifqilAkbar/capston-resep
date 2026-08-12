import { useState } from 'react'
import { ICON_HEART_FILLED, ICON_HEART_OUTLINE } from './icons'
import { fotoMakanan } from '../fotoMakanan'
import { mockDurasi } from '../mock'

export function CardResep({ resep, index, isFavorit, onToggleFavorit }) {
  const [gagal, setGagal] = useState(false)
  const rating = (4.5 + (Number(resep.id) % 5) * 0.1).toFixed(1)
  const waktu = resep.durasi || mockDurasi(resep.id)
  const bukaResep = () => { window.location.hash = `#/resep/${resep.id}` }

  return (
    <div
      data-id={resep.id}
      onClick={bukaResep}
      className="recipe-card reveal"
      style={{ '--reveal-delay': `${Math.min(index, 8) * 90}ms` }}
    >
      <div className="recipe-photo">
        <span className="recipe-photo-deco recipe-photo-deco-a" />
        <span className="recipe-photo-deco recipe-photo-deco-b" />
        {gagal ? (
          <div className="recipe-photo-plate">
            <i className="fa-solid fa-utensils" />
          </div>
        ) : (
          <img
            src={resep.foto || fotoMakanan(resep.judul)}
            alt={resep.judul}
            loading="lazy"
            onError={() => setGagal(true)}
            className="recipe-photo-img"
          />
        )}
        <span className="recipe-photo-overlay" aria-hidden="true" />

        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorit(resep.id)
          }}
          className="recipe-fav-btn"
          aria-label={isFavorit ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        >
          {isFavorit ? ICON_HEART_FILLED : ICON_HEART_OUTLINE}
        </button>

        {resep.persentase > 0 && (
          <span className="recipe-match-badge">Cocok {resep.persentase}%</span>
        )}
      </div>

      <div className="recipe-body">
        <div className="recipe-meta">
          <span><i className="fa-solid fa-star text-amber-400" />{rating}</span>
          <span><i className="fa-solid fa-clock" />{waktu} mnt</span>
        </div>

        <h4 className="recipe-title">{resep.judul}</h4>
        <span className="recipe-category"><i className="fa-solid fa-location-dot" /> {resep.kategori}</span>

        {resep.persentase > 0 && (
          <div>
            <div className="recipe-progress-label">
              <span>Kecocokan</span>
              <strong>{resep.persentase}%</strong>
            </div>
            <div className="recipe-progress">
              <div className="recipe-progress-bar" style={{ width: `${resep.persentase}%` }} />
            </div>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation()
            bukaResep()
          }}
          className="recipe-btn"
        >
          <i className="fa-solid fa-utensils mr-1" /> Lihat Detail
        </button>
      </div>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] overflow-hidden shadow-sm">
      <div className="skeleton-pulse h-[150px] md:h-[210px] w-full" />
      <div className="p-4 md:p-5 space-y-3">
        <div className="flex gap-4">
          <div className="skeleton-pulse h-4 w-12" />
          <div className="skeleton-pulse h-4 w-16" />
        </div>
        <div className="skeleton-pulse h-5 w-3/4" />
        <div className="skeleton-pulse h-4 w-16" />
        <div className="space-y-1.5">
          <div className="skeleton-pulse h-3 w-full" />
          <div className="skeleton-pulse h-2.5 w-full" />
        </div>
        <div className="skeleton-pulse h-10 w-full" />
      </div>
    </div>
  )
}
