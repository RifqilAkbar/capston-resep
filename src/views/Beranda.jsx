import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { CardResep } from '../components/CardResep'
import { kategoriResep } from '../kategoriNusantara'
import { FOTO_DAERAH } from '../fotoMakanan'
import { DAFTAR_USER_POPULER, fotoAvatar, fotoKategori, fotoResep, mockDurasi, mockLike } from '../mock'

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

function ThumbResepKecil({ seed }) {
  const [gagal, setGagal] = useState(false)
  if (gagal) {
    return <span className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400"><i className="fa-solid fa-utensils" /></span>
  }
  return <img src={fotoResep(seed, 200, 200)} alt="" loading="lazy" onError={() => setGagal(true)} className="w-full h-full object-cover" />
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
          <img src={fotoResep(resep.id, 400, 560)} alt={resep.judul} loading="lazy" onError={() => setGagal(true)} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 text-gray-800">{mockDurasi(resep.id)} menit</span>
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

function formatAngka(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace('.', ',') + 'rb' : String(n)
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
      <div className="hero-container">
        <div>
          <span className="hero-badge">
            <i className="fa-solid fa-fire-flame-curved" />
            Rekomendasi Resep Pintar
          </span>
          <h1 className="hero-title">Resep Masakan <span className="hero-highlight">Nusantara</span></h1>
          <p className="hero-subtitle">Temukan resep makanan khas Indonesia berdasarkan bahan yang tersedia di dapurmu.</p>

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
      <div className="trending-container">
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
      <div className="kategori-container">
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
      <div className="kategori-container">
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

      <main className="max-w-5xl mx-auto px-4 mt-10 space-y-6">
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
  bagianBuka, setBagianBuka,
}) {
  // ===== Kategori & kurasi untuk dashboard Freshly =====
  const daftarKategoriPopuler = useMemo(() => {
    const nyata = [...new Set(dataResep.map((r) => r.kategori).filter(Boolean))]
    const kurasi = ['Ayam', 'Daging', 'Sayuran', 'Telur', 'Mie', 'Pasta', 'Western', 'Nusantara', 'Jepang', 'Seafood']
    return [...new Set([...nyata, ...kurasi])].slice(0, 10)
  }, [dataResep])

  const resepPopuler = useMemo(
    () => [...semuaResep].sort((a, b) => mockLike(b.id) - mockLike(a.id)).slice(0, 8),
    [semuaResep],
  )
  const resepCepat = useMemo(
    () => semuaResep.filter((r) => mockDurasi(r.id) <= 30).slice(0, 8),
    [semuaResep],
  )

  // ===== State formulir kontribusi =====
  const [judulResep, setJudulResep] = useState('')
  const [porsiDefault, setPorsiDefault] = useState(2)
  const [langkahResep, setLangkahResep] = useState([{ instruksi: '' }])
  const [bahanResepDipilih, setBahanResepDipilih] = useState([])
  const [pesanResep, setPesanResep] = useState('')
  const [isSubmittingResep, setIsSubmittingResep] = useState(false)

  const [inputNamaBahan, setInputNamaBahan] = useState('')
  const [inputKategori, setInputKategori] = useState('Sayuran')
  const [pesanBahan, setPesanBahan] = useState('')
  const [isSubmittingBahan, setIsSubmittingBahan] = useState(false)

  const [bahanTertunda, setBahanTertunda] = useState([])
  const [pesanAdmin, setPesanAdmin] = useState('')

  const [mengikuti, setMengikuti] = useState(() => new Set())
  const toggleIkuti = (id) => {
    setMengikuti((prev) => {
      const baru = new Set(prev)
      if (baru.has(id)) baru.delete(id); else baru.add(id)
      return baru
    })
  }

  useEffect(() => {
    if (!session || userRole !== 'admin' || !token) return
    let aktif = true
    api.ambilBahanTertunda(token)
      .then(({ bahan }) => { if (aktif) setBahanTertunda(bahan || []) })
      .catch(() => {})
    return () => { aktif = false }
  }, [session, userRole, token])

  const handleUbahLangkah = (index, value) => {
    setLangkahResep(langkahResep.map((l, i) => (i === index ? { instruksi: value } : l)))
  }
  const handleTambahInputLangkah = () => setLangkahResep([...langkahResep, { instruksi: '' }])
  const handleCheckboxBahanResep = (idBahan) => {
    setBahanResepDipilih((prev) => prev.includes(idBahan) ? prev.filter((id) => id !== idBahan) : [...prev, idBahan])
  }

  const handleTambahResepBaru = async (e) => {
    e.preventDefault()
    if (isSubmittingResep) return
    setPesanResep('')

    if (!judulResep.trim() || bahanResepDipilih.length === 0) {
      setPesanResep('Gagal: Judul resep dan minimal 1 bahan wajib diisi!')
      return
    }

    setIsSubmittingResep(true)
    try {
      const langkahValid = langkahResep.filter((l) => l.instruksi.trim() !== '')
      await api.tambahResep(token, {
        judul_resep: judulResep.trim(),
        porsi_default: porsiDefault,
        langkah_memasak: langkahValid,
        ingredient_ids: bahanResepDipilih,
      })
      setPesanResep('Sukses! Resep baru berhasil diterbitkan ke sistem.')
      setJudulResep('')
      setLangkahResep([{ instruksi: '' }])
      setBahanResepDipilih([])
      if (onDataRefresh) await onDataRefresh()
    } catch (error) {
      setPesanResep('Error input resep: ' + error.message)
    } finally {
      setIsSubmittingResep(false)
    }
  }

  const handleTambahBahanBaru = async (e) => {
    e.preventDefault()
    if (isSubmittingBahan) return
    setPesanBahan('')
    if (!inputNamaBahan.trim()) return

    setIsSubmittingBahan(true)
    try {
      await api.tambahBahan(token, {
        nama_bahan: inputNamaBahan.trim(),
        kategori: inputKategori,
      })
      setPesanBahan('Sukses mengusulkan bahan baru!')
      setInputNamaBahan('')
      if (userRole === 'admin') {
        const { bahan } = await api.ambilBahanTertunda(token)
        setBahanTertunda(bahan || [])
      }
    } catch (error) {
      setPesanBahan(error.message)
    } finally {
      setIsSubmittingBahan(false)
    }
  }

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

  const adminPanel = userRole === 'admin' && (
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
      <section className="max-w-6xl mx-auto px-4 lg:px-6 pt-12 md:pt-16 pb-2">
        <span className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-accent text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full">
          <i className="fa-solid fa-fire-flame-curved" /> Rekomendasi Resep Pintar
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
      <section className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
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
      <section id="kategori-populer" className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
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

      {/* ===== Di Bawah 30 Menit ===== */}
      <section className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        {judulSection(
          'Cepat & Mudah', 'fa-bolt', 'Di Bawah 30 Menit',
          <a href="#/resep" className="text-accent font-bold text-sm hover:underline shrink-0">Lihat Semua</a>,
        )}
        {resepCepat.length > 0 && kartuGrid(resepCepat)}
      </section>

      {/* ===== Pengguna Teratas ===== */}
      <section className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        {judulSection('Komunitas', 'fa-users', 'Pengguna Teratas', null)}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DAFTAR_USER_POPULER.map((u) => (
            <div key={u.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                  <img src={fotoAvatar(u.avatar)} alt={u.nama} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 dark:text-gray-100 truncate">{u.nama}</p>
                  <p className="text-xs text-gray-400"><i className="fa-solid fa-users mr-1" />{formatAngka(u.followers)} pengikut</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleIkuti(u.id)}
                  className={`shrink-0 px-5 py-2 rounded-full text-sm font-bold transition ${mengikuti.has(u.id) ? 'bg-accent text-white shadow-md shadow-accent/30' : 'bg-white text-accent border-2 border-accent hover:bg-orange-50'}`}
                >
                  {mengikuti.has(u.id) ? 'Mengikuti' : 'Ikuti'}
                </button>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden">
                    <ThumbResepKecil seed={`${u.avatar}-${i}`} />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-400"><i className="fa-solid fa-bowl-food mr-1" />{u.jumlahResep} resep dibagikan</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Konten untuk pengguna login ===== */}
      <main className="max-w-5xl mx-auto px-4 mt-4 space-y-6">
        {adminPanel}

        <div id="bagikan-resep" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setBagianBuka(bagianBuka === 'resep' ? '' : 'resep')}
            className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
            aria-expanded={bagianBuka === 'resep'}
          >
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Bagikan Resep Masakan Anda</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tulis instruksi memasak secara detail agar sistem bisa merekomendasikannya.</p>
            </div>
            <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 shrink-0">
              <i className={`fa-solid fa-chevron-${bagianBuka === 'resep' ? 'up' : 'down'}`} />
            </span>
          </button>

          {bagianBuka === 'resep' && (
            <div className="px-6 pb-6">
              <form onSubmit={handleTambahResepBaru} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Nama Menu Masakan</label>
                    <input type="text" placeholder="Contoh: Nasi Goreng Kampung, Sup Ayam" value={judulResep} onChange={(e) => setJudulResep(e.target.value)} className="w-full p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Estimasi Porsi</label>
                    <input type="number" min="1" value={porsiDefault} onChange={(e) => setPorsiDefault(e.target.value)} className="w-full p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Pilih Bahan Baku yang Digunakan:</label>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto border dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                    {dataBahan.map((bahan) => (
                      <label key={bahan.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition ${bahanResepDipilih.includes(bahan.id) ? 'bg-orange-100 dark:bg-orange-900/40 border-accent dark:border-accent text-accent' : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300 border-transparent'}`}>
                        <input type="checkbox" checked={bahanResepDipilih.includes(bahan.id)} onChange={() => handleCheckboxBahanResep(bahan.id)} className="hidden" />
                        {bahan.nama_bahan}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Langkah Demi Langkah Memasak:</label>
                  {langkahResep.map((langkah, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0">{index + 1}</span>
                      <input type="text" placeholder={`Langkah ke-${index + 1}...`} value={langkah.instruksi} onChange={(e) => handleUbahLangkah(index, e.target.value)} className="flex-1 p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm" />
                    </div>
                  ))}
                  <button type="button" onClick={handleTambahInputLangkah} className="text-accent dark:text-orange-400 hover:text-accent-dark font-bold text-sm flex items-center gap-1 pt-1 transition">
                    + Tambah Langkah Memasak
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingResep}
                  className="w-full bg-accent disabled:bg-accent/50 hover:bg-accent-dark text-white font-bold p-3.5 rounded-xl transition shadow-sm"
                >
                  {isSubmittingResep ? 'Sedang Menerbitkan...' : 'Terbitkan Buku Resep'}
                </button>
              </form>
              {pesanResep && (
                <p className={`mt-3 font-semibold text-center text-sm ${pesanResep.includes('Sukses') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{pesanResep}</p>
              )}
            </div>
          )}
        </div>

        <div id="tambah-bahan" className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setBagianBuka(bagianBuka === 'bahan' ? '' : 'bahan')}
            className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-amber-100/60 dark:hover:bg-amber-900/30 transition"
            aria-expanded={bagianBuka === 'bahan'}
          >
            <div>
              <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300">Punya Bahan Unik?</h3>
              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">Usulkan bahan baru agar bisa dipakai di resep lain.</p>
            </div>
            <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-300 shrink-0">
              <i className={`fa-solid fa-chevron-${bagianBuka === 'bahan' ? 'up' : 'down'}`} />
            </span>
          </button>

          {bagianBuka === 'bahan' && (
            <div className="px-6 pb-6">
              <form onSubmit={handleTambahBahanBaru} className="flex flex-wrap gap-3 items-center">
                <input type="text" placeholder="Daun Kelor, Jamur..." value={inputNamaBahan} onChange={(e) => setInputNamaBahan(e.target.value)} className="flex-1 min-w-[200px] p-3 bg-white dark:bg-gray-700 border border-amber-300 dark:border-amber-700 rounded-xl outline-none text-sm text-gray-900 dark:text-gray-100" />
                <select value={inputKategori} onChange={(e) => setInputKategori(e.target.value)} className="p-3 bg-white dark:bg-gray-700 border border-amber-300 dark:border-amber-700 rounded-xl text-sm text-gray-900 dark:text-gray-100">
                  <option value="Sayuran">Sayuran</option><option value="Protein">Protein</option><option value="Bumbu">Bumbu</option>
                </select>
                <button
                  type="submit"
                  disabled={isSubmittingBahan}
                  className="bg-amber-500 disabled:bg-amber-300 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-sm transition"
                >
                  {isSubmittingBahan ? 'Mengirim...' : 'Usulkan'}
                </button>
              </form>
              {pesanBahan && (
                <p className={`mt-3 font-semibold text-center text-sm ${pesanBahan.includes('Sukses') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                  {pesanBahan}
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
