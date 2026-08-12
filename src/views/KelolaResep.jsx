import { useEffect, useState } from 'react'
import { api } from '../api'
import { SearchBar } from '../components/SearchBar'

const WARNA_STATUS = {
  pending: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
  approved: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
  rejected: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
}
const LABEL_STATUS = { pending: 'Pending', approved: 'Disetujui', rejected: 'Ditolak' }

const FILTER = [
  { value: 'semua', label: 'Semua' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Disetujui' },
  { value: 'rejected', label: 'Ditolak' },
]

const URUTAN_KATEGORI = ['Nusantara', 'Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali', 'Betawi', 'Ayam', 'Daging', 'Ikan', 'Sayuran', 'Telur', 'Mie', 'Seafood', 'Lainnya']
const IKON_KATEGORI = {
  Nusantara: 'fa-utensils', Jawa: 'fa-crown', Sumatera: 'fa-volcano', Kalimantan: 'fa-tree', Sulawesi: 'fa-mountain',
  Bali: 'fa-palette', Betawi: 'fa-city', Ayam: 'fa-drumstick-bite', Daging: 'fa-bacon', Ikan: 'fa-fish',
  Sayuran: 'fa-leaf', Telur: 'fa-egg', Mie: 'fa-bowl-food', Seafood: 'fa-shrimp', Lainnya: 'fa-tags',
}

export default function KelolaResep({ token, onDataRefresh }) {
  const [resep, setResep] = useState([])
  const [filter, setFilter] = useState('semua')
  const [cari, setCari] = useState('')
  const [loading, setLoading] = useState(true)
  const [pesan, setPesan] = useState('')
  const [terbuka, setTerbuka] = useState(() => new Set(URUTAN_KATEGORI))

  const muat = async () => {
    try {
      const data = await api.semuaResep(token)
      setResep(data.resep || [])
    } catch (error) {
      setPesan(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let aktif = true
    api.semuaResep(token)
      .then((data) => { if (aktif) setResep(data.resep || []) })
      .catch((error) => { if (aktif) setPesan(error.message) })
      .finally(() => { if (aktif) setLoading(false) })
    return () => { aktif = false }
  }, [token])

  const handleUbahStatus = async (id, judul, status) => {
    const label = status === 'approved' ? 'menyetujui' : status === 'rejected' ? 'menolak' : 'mengembalikan'
    if (!window.confirm(`${label} resep "${judul}"?`)) return
    try {
      await api.ubahStatusResep(token, id, status)
      setPesan(`Sukses! Resep "${judul}" ditandai ${LABEL_STATUS[status]}.`)
      await muat()
      if (onDataRefresh) await onDataRefresh()
    } catch (error) {
      setPesan(error.message)
    }
  }

  const handleHapus = async (id, judul) => {
    if (!window.confirm(`Hapus resep "${judul}" secara permanen?`)) return
    try {
      await api.hapusResep(token, id)
      setPesan(`Sukses! Resep "${judul}" berhasil dihapus.`)
      await muat()
      if (onDataRefresh) await onDataRefresh()
    } catch (error) {
      setPesan(error.message)
    }
  }

  const teksCari = cari.trim().toLowerCase()
  const daftar = (filter === 'semua' ? resep : resep.filter((r) => r.status === filter))
    .filter((r) => !teksCari || [r.judul_resep, r.pembuat_nama, r.pembuat_username, r.kategori]
      .some((x) => String(x || '').toLowerCase().includes(teksCari)))

  const belumDisetujui = daftar.filter((r) => r.status !== 'approved')
  const disetujui = daftar.filter((r) => r.status === 'approved')

  const grupDariData = new Map()
  for (const r of disetujui) {
    const nama = r.kategori || 'Lainnya'
    if (!grupDariData.has(nama)) grupDariData.set(nama, [])
    grupDariData.get(nama).push(r)
  }
  const kelompok = [
    ...URUTAN_KATEGORI.map((nama) => ({ nama, daftar: grupDariData.get(nama) || [] })),
    ...[...grupDariData.keys()]
      .filter((nama) => !URUTAN_KATEGORI.includes(nama))
      .sort((a, b) => a.localeCompare(b))
      .map((nama) => ({ nama, daftar: grupDariData.get(nama) })),
  ].filter((g) => g.daftar.length > 0)

  const namaKelompok = kelompok.map((g) => g.nama)
  useEffect(() => {
    if (kelompok.length) setTerbuka(new Set(namaKelompok))
  }, [cari, kelompok.length])

  const semuaTerbuka = kelompok.length > 0 && kelompok.every((g) => terbuka.has(g.nama))
  const toggleGrup = (nama) => {
    setTerbuka((prev) => {
      const baru = new Set(prev)
      if (baru.has(nama)) baru.delete(nama)
      else baru.add(nama)
      return baru
    })
  }
  const bukaTutupSemua = () => {
    setTerbuka(new Set(semuaTerbuka ? [] : namaKelompok))
  }

  const kartu = (r) => (
    <div key={r.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 leading-snug">{r.judul_resep}</h3>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${WARNA_STATUS[r.status] || WARNA_STATUS.pending}`}>
              {LABEL_STATUS[r.status] || r.status}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">
            oleh <strong className="text-gray-600 dark:text-gray-300">{r.pembuat_nama || r.pembuat_username || 'Admin'}</strong>
            <span className="mx-2">•</span><i className="fa-solid fa-tags mr-1" />{r.kategori}
            <span className="mx-2">•</span><i className="fa-solid fa-carrot mr-1" />{r.recipe_ingredients?.length || 0} bahan
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {r.status !== 'approved' && (
            <button type="button" onClick={() => handleUbahStatus(r.id, r.judul_resep, 'approved')} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition">
              <i className="fa-solid fa-check" /> Setujui
            </button>
          )}
          {r.status !== 'rejected' && (
            <button type="button" onClick={() => handleUbahStatus(r.id, r.judul_resep, 'rejected')} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition">
              <i className="fa-solid fa-xmark" /> Tolak
            </button>
          )}
          <a href={`#/edit-resep/${r.id}`} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-xs font-bold text-gray-600 dark:text-gray-300 hover:border-accent hover:text-accent transition">
            <i className="fa-solid fa-pen" /> Edit
          </a>
          <button type="button" onClick={() => handleHapus(r.id, r.judul_resep)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 dark:border-red-800 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition">
            <i className="fa-solid fa-trash-can" /> Hapus
          </button>
        </div>
      </div>
    </div>
  )

  const kelompokTampak = kelompok.filter((g) => (teksCari ? true : terbuka.has(g.nama)))

  const blokDisetujui = (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          <i className="fa-solid fa-check-circle mr-2 text-green-500" />Resep Disetujui
          <span className="ml-2 text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">{disetujui.length}</span>
        </h3>
        <button type="button" onClick={bukaTutupSemua} className="text-xs font-bold text-accent hover:text-accent-dark transition">
          <i className={`fa-solid ${semuaTerbuka ? 'fa-compress' : 'fa-expand'} mr-1`} />{semuaTerbuka ? 'Tutup Semua' : 'Buka Semua'}
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        {kelompok.map((g) => {
          const buka = teksCari ? true : terbuka.has(g.nama)
          return (
            <button
              key={g.nama}
              type="button"
              onClick={() => toggleGrup(g.nama)}
              aria-expanded={buka}
              className={`bg-white dark:bg-gray-800 border rounded-2xl shadow-sm p-3 text-left transition hover:shadow-md hover:-translate-y-0.5 ${buka ? 'border-accent dark:border-accent' : 'border-gray-200 dark:border-gray-700'}`}
            >
              <span className="flex items-center justify-between">
                <span className="inline-flex w-9 h-9 rounded-lg items-center justify-center text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  <i className={`fa-solid ${IKON_KATEGORI[g.nama] || 'fa-utensils'}`} />
                </span>
                <i className={`fa-solid fa-chevron-${buka ? 'up' : 'down'} text-[10px] text-gray-400`} />
              </span>
              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{g.nama}</p>
              <p className="text-[11px] font-semibold text-gray-400 mt-0.5">{g.daftar.length} resep</p>
            </button>
          )
        })}
      </div>
      {kelompokTampak.length > 0 && (
        <div className="mt-6 space-y-6">
          {kelompokTampak.map((g) => (
            <div key={g.nama}>
              <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <span className="inline-flex w-7 h-7 rounded-lg items-center justify-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  <i className={`fa-solid ${IKON_KATEGORI[g.nama] || 'fa-utensils'}`} />
                </span>
                <span>{g.nama} <span className="text-xs font-normal text-gray-400">({g.daftar.length} resep)</span></span>
              </h4>
              <div className="grid grid-cols-1 gap-4">{g.daftar.map(kartu)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <main className="page-container mt-10 pb-16">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="section-kicker"><i className="fa-solid fa-book-open" />Kelola Resep</span>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Semua Resep</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Setujui, tolak, edit, atau hapus resep dari pengguna.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="#/dashboard" className="btn-secondary text-sm"><i className="fa-solid fa-arrow-left" /> Dashboard</a>
          <a href="#/kelola-bahan" className="btn-secondary text-sm"><i className="fa-solid fa-carrot" /> Kelola Bahan</a>
        </div>
      </div>

      {pesan && (
        <p className={`mt-4 font-semibold text-center text-sm ${pesan.includes('Sukses') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{pesan}</p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="w-full md:w-72 shrink-0">
          <SearchBar value={cari} onChange={setCari} placeholder="Cari judul, pembuat, atau kategori..." />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTER.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${filter === f.value ? 'bg-accent text-white border-accent' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton-pulse h-28 rounded-2xl" />)}
          </div>
        ) : daftar.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
            <span className="empty-icon"><i className="fa-solid fa-book-open" /></span>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">Tidak ada resep pada filter ini.</p>
          </div>
        ) : filter === 'approved' ? (
          blokDisetujui
        ) : filter === 'semua' ? (
          <>
            {belumDisetujui.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  <i className="fa-solid fa-hourglass-half text-amber-500" />Perlu Persetujuan
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">{belumDisetujui.length}</span>
                </h3>
                <div className="grid grid-cols-1 gap-4">{belumDisetujui.map(kartu)}</div>
              </div>
            )}
            {disetujui.length > 0 && blokDisetujui}
          </>
        ) : (
          <div className="grid grid-cols-1 gap-4">{daftar.map(kartu)}</div>
        )}
      </div>
    </main>
  )
}