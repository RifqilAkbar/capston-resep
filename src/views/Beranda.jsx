import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { CardResep } from '../components/CardResep'
import { kategoriResep } from '../kategoriNusantara'
import { FOTO_DAERAH, fotoMakanan } from '../fotoMakanan'
import { fotoAvatar, fotoKategori, mockDurasi, mockLike } from '../mock'

function isAdminRole(role) {
  return role === 'admin' || role === 'superadmin'
}

function ThumbKategori({ nama }) {
  const [gagal, setGagal] = useState(false)
  if (gagal) {
    return (
      <span className="w-full h-full flex items-center justify-center bg-orange-100 dark:bg-orange-900/40 text-orange-500">
        <i className="fa-solid fa-bowl-food" />
      </span>
    )
  }
  return <img src={fotoKategori(nama)} alt="" loading="lazy" onError={() => setGagal(true)} className="w-full h-full object-cover" />
}

function ThumbResepKecil({ judul }) {
  const [gagal, setGagal] = useState(false)
  if (gagal) {
    return <span className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400"><i className="fa-solid fa-utensils" /></span>
  }
  return <img src={fotoMakanan(judul)} alt="" loading="lazy" onError={() => setGagal(true)} className="w-full h-full object-cover" />
}

function KartuResepFreshly({ resep, isFavorit, onToggleFavorit }) {
  const [gagal, setGagal] = useState(false)
  const inisial = resep.judul?.charAt(0)?.toUpperCase() || '?'
  const buka = () => { window.location.hash = `#/resep/${resep.id}` }

  return (
    <article
      onClick={buka}
      className="group relative cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
    >
      <div className="relative aspect-[3/4]">
        {gagal ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-400 to-accent text-white text-5xl font-extrabold">{inisial}</div>
        ) : (
          <img src={fotoMakanan(resep.judul)} alt={resep.judul} loading="lazy" onError={() => setGagal(true)} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 text-gray-800">{resep.durasi || mockDurasi(resep.id)} menit</span>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleFavorit(resep.id) }}
            className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shrink-0"
            aria-label={isFavorit ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          >
            <i className={`fa-solid fa-heart ${isFavorit ? 'text-accent' : 'text-gray-400'}`} />
          </button>
        </div>

        <span className="absolute top-14 left-3 flex items-center gap-1 text-xs font-bold text-white bg-black/40 backdrop-blur px-2 py-1 rounded-full">
          <i className="fa-solid fa-fire text-orange-400" /> {mockLike(resep.id)}
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-accent px-2 py-0.5 rounded-full mb-2">{resep.kategori}</span>
          <h3 className="font-bold text-lg leading-snug line-clamp-2">{resep.judul}</h3>
          {resep.persentase > 0 && (
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="text-white/80">Kecocokan</span>
              <div className="flex-1 h-1.5 bg-white/25 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${resep.persentase}%` }} />
              </div>
              <strong>{resep.persentase}%</strong>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

function SkeletonFreshly() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="aspect-[3/4] skeleton-pulse" />
    </div>
  )
}

function formatRating(n) {
  return Number(n || 0).toFixed(1).replace('.', ',')
}

// Contoh makanan khas per daerah (tampilan kartu, bukan logika database).
const CONTOH_MAKANAN = {
  'Jawa Tengah': 'Gudeg • Soto Kudus',
  'Yogyakarta': 'Gudeg • Sate Klathak',
  'Jawa Timur': 'Rawon • Soto Lamongan',
  'Jawa Barat': 'Karedok • Lotek',
  'Padang': 'Rendang • Dendeng Balado',
  'Betawi': 'Soto Betawi • Kerak Telor',
  'Bali': 'Ayam Betutu • Sate Lilit',
  'Sumatera': 'Pempek • Mie Aceh',
  'Sulawesi': 'Coto Makassar • Sop Konro',
  'Kalimantan': 'Soto Banjar • Ketupat Kandangan',
}

function GuestView({ dataResep, dataBahan, loading, semuaResep, favoritIds, onToggleFavorit, onPilihKategori }) {
  const daftarDaerah = useMemo(() => kategoriResep(dataResep), [dataResep])

  const heroSection = (
    <section className="hero">
      <div className="page-container hero-container">
        <div>
          <span className="hero-badge">
            <i className="fa-solid fa-fire-flame-curved" />
Rekomendasi Resep Nusantara
          </span>
          <h1 className="hero-title">Resep Masakan <span className="hero-highlight">Nusantara</span></h1>
          <p className="hero-subtitle">Temukan resep masakan khas Nusantara dari bahan yang tersedia di dapur Anda.</p>

          <div className="hero-actions">
            <a href="#/resep" className="btn-primary btn-lg">
              <i className="fa-solid fa-magnifying-glass" />
              Cari Resep
            </a>
            <a href="#/resep" className="btn-secondary">
              <i className="fa-solid fa-book-open" />
              Lihat Semua Resep
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <i className="fa-solid fa-bowl-rice hero-stat-icon" />
              <span className="hero-stat-number">{loading ? '–' : dataResep.length}</span>
              <span className="hero-stat-label">Resep</span>
            </div>
            <div className="hero-stat">
              <i className="fa-solid fa-carrot hero-stat-icon" />
              <span className="hero-stat-number">{loading ? '–' : dataBahan.length}</span>
              <span className="hero-stat-label">Bahan</span>
            </div>
            <div className="hero-stat">
              <i className="fa-solid fa-tags hero-stat-icon" />
              <span className="hero-stat-number">{loading ? '–' : daftarDaerah.length}</span>
              <span className="hero-stat-label">Kategori</span>
            </div>
          </div>
        </div>

        <div className="hero-image" aria-hidden="true">
          <span className="hero-blob hero-blob-1" />
          <span className="hero-blob hero-blob-2" />
          <div className="hero-float">
            <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff9a52" />
                  <stop offset="100%" stopColor="#ff6b00" />
                </linearGradient>
              </defs>

              <circle cx="210" cy="210" r="190" fill="url(#heroGrad)" opacity="0.1" />
              <circle cx="210" cy="210" r="150" fill="url(#heroGrad)" opacity="0.16" />

              <g className="hero-steam">
                <path d="M150 108q8 -22 0 -44" stroke="#ffb57e" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                <path d="M210 92q8 -22 0 -44" stroke="#ffb57e" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                <path d="M268 108q8 -22 0 -44" stroke="#ffb57e" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
              </g>

              <ellipse cx="210" cy="302" rx="134" ry="36" fill="#ffffff" />
              <ellipse cx="210" cy="302" rx="134" ry="36" stroke="#f6e3d5" strokeWidth="3" />
              <ellipse cx="210" cy="296" rx="104" ry="27" fill="#fff8f2" />

              <path d="M152 292q24 -40 60 -40q40 0 60 36q12 20 -22 28q-22 8 -46 4q-52 -8 -52 -28Z" fill="#ffffff" stroke="#ffe0cd" strokeWidth="3" />
              <circle cx="212" cy="286" r="28" fill="url(#heroGrad)" />
              <circle cx="188" cy="272" r="6" fill="#34d399" />
              <circle cx="236" cy="302" r="6" fill="#34d399" />
              <circle cx="170" cy="298" r="5" fill="#fbbf24" />

              <g stroke="#e2e8f0" strokeWidth="7" strokeLinecap="round" fill="none">
                <line x1="92" y1="140" x2="92" y2="252" />
              </g>
              <path d="M84 100v30M92 92v38M100 100v30" stroke="#e2e8f0" strokeWidth="7" strokeLinecap="round" />
              <line x1="328" y1="140" x2="328" y2="252" stroke="#e2e8f0" strokeWidth="7" strokeLinecap="round" />
              <ellipse cx="328" cy="114" rx="16" ry="21" fill="#e2e8f0" />

              <circle cx="72" cy="330" r="10" fill="#ff6b00" opacity="0.25" />
              <circle cx="352" cy="92" r="8" fill="#ff9a52" opacity="0.5" />
              <circle cx="342" cy="340" r="7" fill="#34d399" opacity="0.35" />
            </svg>
          </div>

          <div className="hero-card hero-card-rating">
            <span className="hero-card-icon"><i className="fa-solid fa-heart" /></span>
            <div>
              <strong>Cocok!</strong>
              <small>dengan bahan kulkas</small>
            </div>
          </div>
          <div className="hero-card hero-card-ingredients">
            <span className="hero-card-icon"><i className="fa-solid fa-carrot" /></span>
            <div>
              <strong>Mudah</strong>
              <small>langkah demi langkah</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  const trendingSection = (
    <section className="trending-section reveal">
      <div className="page-container trending-container">
        <div className="trending-header">
          <div>
            <span className="section-kicker"><i className="fa-solid fa-fire" />Trending</span>
            <h2 className="trending-title">🔥 Trending Resep Nusantara</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Resep khas Indonesia yang sedang populer dan banyak dicari.</p>
          </div>
          <a href="#/resep" className="btn-secondary shrink-0"><i className="fa-solid fa-arrow-right" /> Lihat Semua</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {semuaResep.slice(0, 6).map((r, i) => (
            <CardResep key={r.id} resep={r} index={i} isFavorit={favoritIds.includes(Number(r.id))} onToggleFavorit={onToggleFavorit} />
          ))}
        </div>
      </div>
    </section>
  )

  const caraKerjaSection = (
    <section className="kategori-section">
      <div className="page-container kategori-container">
        <span className="section-kicker"><i className="fa-solid fa-lightbulb" />Cara Menggunakan</span>
        <h2 className="kategori-title">Cara Menggunakan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {[
            { icon: 'fa-kitchen-set', judul: 'Pilih Bahan', teks: 'Pilih bahan yang tersedia di kulkas atau dapurmu.' },
            { icon: 'fa-wand-magic-sparkles', judul: 'Sistem Mencari Resep', teks: 'Sistem mencocokkan bahanmu dengan resep khas Nusantara yang cocok.' },
            { icon: 'fa-fire', judul: 'Mulai Memasak', teks: 'Ikuti langkah demi langkah dan sajikan hidangan lezat.' },
          ].map((s, i) => (
            <div key={s.judul} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center shadow-sm">
              <span className="inline-flex w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 items-center justify-center text-xl mb-4">
                <i className={`fa-solid ${s.icon}`} />
              </span>
              <h3 className="font-bold text-gray-900 dark:text-gray-100">{i + 1}. {s.judul}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{s.teks}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const kategoriSection = (
    <section className="kategori-section reveal">
      <div className="page-container kategori-container">
        <div>
          <span className="section-kicker"><i className="fa-solid fa-map-location-dot" />Jelajahi</span>
          <h2 className="kategori-title">🗺 Jelajahi Kuliner Nusantara</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Pilih daerah untuk menemukan berbagai makanan khas Indonesia.</p>
        </div>
        <div className="kategori-scroll">
          {daftarDaerah.map((kategori, i) => (
            <button
              key={kategori.nama}
              type="button"
              className="kategori-card reveal"
              style={{ '--reveal-delay': `${Math.min(i, 8) * 60}ms` }}
              onClick={() => onPilihKategori(kategori.nama)}
            >
              <div className="kategori-card-photo">
                <img
                  src={FOTO_DAERAH[kategori.nama]}
                  alt={kategori.nama}
                  loading="lazy"
                  className="kategori-card-img"
                />
                <span className="kategori-card-photo-overlay" aria-hidden="true" />
              </div>
              <div className="kategori-card-body">
                <span className="kategori-card-name">{kategori.nama}</span>
                <span className="kategori-card-contoh">{CONTOH_MAKANAN[kategori.nama] || 'Hidangan khas daerah'}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )

  const ctaBeranda = (
    <div className="text-center py-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
      <span className="empty-icon"><i className="fa-solid fa-book-open" /></span>
      <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-gray-100">Siap Memasak?</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Buka halaman Resep untuk memilih bahan di kulkas Anda dan temukan rekomendasi masakan.</p>
      <a href="#/resep" className="btn-primary inline-flex mt-4"><i className="fa-solid fa-book-open" />Buka Halaman Resep</a>
    </div>
  )

  return (
    <>
      {heroSection}
      {trendingSection}
      {kategoriSection}
      {caraKerjaSection}

      <main className="page-container mt-10 space-y-6">
        {ctaBeranda}
      </main>
    </>
  )
}

export default function Beranda({
  session, userRole, token,
  dataResep, dataBahan, loading,
  semuaResep, favoritIds, onToggleFavorit,
  onPilihKategori, onDataRefresh,
}) {
  // ===== Kategori & kurasi untuk dashboard Freshly =====
  // Daerah yang benar-benar punya resep, diurutkan dari menu terbanyak.
  const daftarKategoriPopuler = useMemo(
    () => kategoriResep(dataResep)
      .filter((k) => k.jumlah > 0)
      .sort((a, b) => b.jumlah - a.jumlah)
      .map((k) => k.nama),
    [dataResep],
  )

  const resepPopuler = useMemo(
    () => [...semuaResep].sort((a, b) => mockLike(b.id) - mockLike(a.id)).slice(0, 8),
    [semuaResep],
  )
  const resepCepat = useMemo(
    () => semuaResep.filter((r) => (r.durasi || mockDurasi(r.id)) <= 30).slice(0, 8),
    [semuaResep],
  )

  // Pengguna teratas: real dari data resep, peringkat = jumlah resep × rating rata-rata.
  const penggunaTeratas = useMemo(() => {
    const akumulasi = new Map()
    for (const r of dataResep) {
      if (r.user_id == null) continue
      const nama = r.pembuat_nama || r.pembuat_username || 'Pengguna'
      if (!akumulasi.has(r.user_id)) {
        akumulasi.set(r.user_id, { id: r.user_id, nama, username: r.pembuat_username || '', jumlahResep: 0, totalRating: 0, jumlahBerRating: 0, judulResep: [] })
      }
      const u = akumulasi.get(r.user_id)
      u.jumlahResep += 1
      const ratingAvg = Number(r.rating_avg || 0)
      const ratingCount = Number(r.rating_count || 0)
      if (ratingCount > 0) {
        u.totalRating += ratingAvg
        u.jumlahBerRating += 1
      }
      if (u.judulResep.length < 4) u.judulResep.push(r.judul_resep)
    }

    return [...akumulasi.values()]
      .map((u) => ({
        ...u,
        ratingRata: u.jumlahBerRating > 0 ? u.totalRating / u.jumlahBerRating : 3.0,
      }))
      .sort((a, b) => (b.jumlahResep * b.ratingRata) - (a.jumlahResep * a.ratingRata))
      .slice(0, 4)
  }, [dataResep])

  // ===== State formulir kontribusi =====
  const [bahanTertunda, setBahanTertunda] = useState([])
  const [pesanAdmin, setPesanAdmin] = useState('')

  useEffect(() => {
    if (!session || !isAdminRole(userRole) || !token) return
    let aktif = true
    api.ambilBahanTertunda(token)
      .then(({ bahan }) => { if (aktif) setBahanTertunda(bahan || []) })
      .catch(() => {})
    return () => { aktif = false }
  }, [session, userRole, token])

  const handleSetujuiBahan = async (idBahan) => {
    setPesanAdmin('')
    try {
      await api.setujuiBahan(token, idBahan)
      if (onDataRefresh) await onDataRefresh()
      const { bahan } = await api.ambilBahanTertunda(token)
      setBahanTertunda(bahan || [])
      setPesanAdmin('Sukses menyetujui bahan!')
    } catch (error) {
      setPesanAdmin(error.message)
    }
  }

  if (!session) {
    return (
      <GuestView
        dataResep={dataResep}
        dataBahan={dataBahan}
        loading={loading}
        semuaResep={semuaResep}
        favoritIds={favoritIds}
        onToggleFavorit={onToggleFavorit}
        onPilihKategori={onPilihKategori}
      />
    )
  }

  // ===== Dashboard Freshly (setelah login) =====
  const judulSection = (kicker, ikon, judul, aksi) => (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        <span className="section-kicker"><i className={`fa-solid ${ikon}`} />{kicker}</span>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">{judul}</h2>
      </div>
      {aksi}
    </div>
  )

  const kartuGrid = (daftar) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {daftar.map((r) => (
        <KartuResepFreshly key={r.id} resep={r} isFavorit={favoritIds.includes(Number(r.id))} onToggleFavorit={onToggleFavorit} />
      ))}
    </div>
  )

  const adminPanel = isAdminRole(userRole) && (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">Panel Moderasi Admin: Peninjauan Bahan Baru</h3>
      {bahanTertunda.length === 0 ? (
        <p className="text-sm text-blue-600 dark:text-blue-400 italic">Tidak ada usulan bahan.</p>
      ) : (
        <div className="space-y-2">
          {bahanTertunda.map((b) => (
            <div key={b.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-xl border border-blue-100 dark:border-blue-800 shadow-xs">
              <div>
                <span className="font-semibold dark:text-gray-100">{b.nama_bahan}</span>
                <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500 dark:text-gray-400">{b.kategori}</span>
              </div>
              <button onClick={() => handleSetujuiBahan(b.id)} className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg">Setujui</button>
            </div>
          ))}
        </div>
      )}
      {pesanAdmin && (
        <p className={`mt-3 font-semibold text-center text-sm ${pesanAdmin.includes('Sukses') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
          {pesanAdmin}
        </p>
      )}
    </div>
  )

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="page-container pt-12 md:pt-16 pb-2">
        <span className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-accent text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full">
          <i className="fa-solid fa-fire-flame-curved" /> Rekomendasi Resep Nusantara
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
          Mau Masak Apa <span className="text-accent">Hari Ini?</span>
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400 max-w-xl">
          Pilih bahan yang tersedia di kulkas dan dapatkan rekomendasi resep yang paling cocok.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#/resep" className="btn-primary btn-lg">
            <i className="fa-solid fa-kitchen-set" /> Pilih Bahan di Kulkas
          </a>
          <a href="#/resep" className="btn-secondary">
            <i className="fa-solid fa-book-open" /> Lihat Semua Resep
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-8">
          {[
            { jumlah: loading ? '–' : dataResep.length, label: 'Resep' },
            { jumlah: loading ? '–' : dataBahan.length, label: 'Bahan' },
            { jumlah: loading ? '–' : daftarKategoriPopuler.length, label: 'Kategori' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">{s.jumlah}</p>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Resep Populer ===== */}
      <section className="page-container py-8">
        {judulSection(
          'Populer', 'fa-fire', 'Resep Populer',
          <a href="#/resep" className="btn-secondary text-sm !px-4 !py-2"><i className="fa-solid fa-arrow-right" /> Lihat Semua</a>,
        )}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => <SkeletonFreshly key={i} />)}
          </div>
        ) : !loading && semuaResep.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm">
            <span className="empty-icon"><i className="fa-solid fa-book-open" /></span>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Belum ada resep untuk ditampilkan.</p>
          </div>
        ) : kartuGrid(resepPopuler)}
      </section>

      {/* ===== Kategori Populer ===== */}
      {daftarKategoriPopuler.length > 0 && (
        <section id="kategori-populer" className="page-container py-8">
          {judulSection('Kategori', 'fa-tags', 'Kategori Populer', null)}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {daftarKategoriPopuler.map((nama) => (
              <button
                key={nama}
                type="button"
                onClick={() => onPilihKategori(nama)}
                className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-2.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition text-left group"
              >
                <span className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <ThumbKategori nama={nama} />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-gray-900 dark:text-gray-100 text-sm truncate">{nama}</span>
                  <span className="block text-[11px] text-gray-400">Lihat resep <i className="fa-solid fa-arrow-right ml-1" /></span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ===== Di Bawah 30 Menit ===== */}
      <section className="page-container py-8">
        {judulSection(
          'Cepat & Mudah', 'fa-bolt', 'Di Bawah 30 Menit',
          <a href="#/resep" className="text-accent font-bold text-sm hover:underline shrink-0">Lihat Semua</a>,
        )}
        {resepCepat.length > 0 && kartuGrid(resepCepat)}
      </section>

      {/* ===== Pengguna Teratas ===== */}
      <section className="page-container py-8">
        {judulSection('Komunitas', 'fa-users', 'Pengguna Teratas', null)}
        {penggunaTeratas.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm">
            <span className="empty-icon"><i className="fa-solid fa-users" /></span>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Belum ada pengguna yang berbagi resep. Daftar akan muncul setelah ada yang membagikan resep.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {penggunaTeratas.map((u) => (
              <div key={u.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <img src={fotoAvatar(u.username || u.nama)} alt={u.nama} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 dark:text-gray-100 truncate">{u.nama}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <p className="text-xs text-gray-400"><i className="fa-solid fa-bowl-food mr-1" />{u.jumlahResep} resep</p>
                      <p className="text-xs text-gray-400"><i className="fa-solid fa-star text-amber-400 mr-1" />{formatRating(u.ratingRata)}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {u.judulResep.map((judul, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden">
                      <ThumbResepKecil judul={judul} />
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-gray-400"><i className="fa-solid fa-star mr-1" />Rata-rata rating dari resep dibagikan</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== Konten untuk pengguna login ===== */}
      <main className="page-container mt-4 space-y-6">
        {adminPanel}
      </main>
    </>
  )
}
