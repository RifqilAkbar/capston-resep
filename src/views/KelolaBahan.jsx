import { useEffect, useState } from 'react'
import { api } from '../api'
import { SearchBar } from '../components/SearchBar'

export default function KelolaBahan({ token, onDataRefresh }) {
  const [bahanTertunda, setBahanTertunda] = useState([])
  const [semuaBahan, setSemuaBahan] = useState([])
  const [cari, setCari] = useState('')
  const [loading, setLoading] = useState(true)
  const [pesan, setPesan] = useState('')

  const muat = async () => {
    const [pending, publik] = await Promise.all([
      api.ambilBahanTertunda(token),
      api.ambilDataPublik(),
    ])
    setBahanTertunda(pending.bahan || [])
    setSemuaBahan(publik.bahan || [])
  }

  useEffect(() => {
    let aktif = true
    Promise.all([api.ambilBahanTertunda(token), api.ambilDataPublik()])
      .then(([pending, publik]) => {
        if (!aktif) return
        setBahanTertunda(pending.bahan || [])
        setSemuaBahan(publik.bahan || [])
      })
      .catch((error) => { if (aktif) setPesan(error.message) })
      .finally(() => { if (aktif) setLoading(false) })
    return () => { aktif = false }
  }, [token])

  const handleSetujui = async (idBahan, namaBahan) => {
    setPesan('')
    try {
      await api.setujuiBahan(token, idBahan)
      await muat()
      if (onDataRefresh) await onDataRefresh()
      setPesan(`Sukses menyetujui bahan "${namaBahan}"!`)
    } catch (error) {
      setPesan(error.message)
    }
  }

  const handleEdit = async (bahan) => {
    const namaBaru = window.prompt('Nama bahan baru:', bahan.nama_bahan)
    if (namaBaru === null) return
    if (!namaBaru.trim()) {
      setPesan('Nama bahan wajib diisi.')
      return
    }
    setPesan('')
    try {
      await api.ubahBahan(token, bahan.id, { nama_bahan: namaBaru.trim(), kategori: bahan.kategori })
      await muat()
      if (onDataRefresh) await onDataRefresh()
      setPesan(`Sukses mengubah bahan menjadi "${namaBaru.trim()}".`)
    } catch (error) {
      setPesan(error.message)
    }
  }

  const handleHapus = async (idBahan, namaBahan, pesanSukses) => {
    if (!window.confirm(`Hapus bahan "${namaBahan}" secara permanen?`)) return
    setPesan('')
    try {
      await api.hapusBahan(token, idBahan)
      await muat()
      if (onDataRefresh) await onDataRefresh()
      setPesan(pesanSukses || `Sukses menghapus bahan "${namaBahan}".`)
    } catch (error) {
      setPesan(error.message)
    }
  }

  const teksCari = cari.trim().toLowerCase()
  const daftarAktif = semuaBahan
    .filter((b) => !teksCari || String(b.nama_bahan).toLowerCase().includes(teksCari))
    .sort((a, b) => String(a.nama_bahan).localeCompare(String(b.nama_bahan)))

  return (
    <main className="page-container mt-10 pb-16">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="section-kicker"><i className="fa-solid fa-carrot" />Kelola Bahan</span>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Semua Bahan</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Setujui usulan bahan baru dan pantau daftar bahan yang tersedia.</p>
        </div>
        <a href="#/dashboard" className="btn-secondary text-sm"><i className="fa-solid fa-arrow-left" /> Dashboard</a>
      </div>

      {pesan && (
        <p className={`mt-4 font-semibold text-center text-sm ${pesan.includes('Sukses') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{pesan}</p>
      )}

      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-2xl shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300">
            Antrean Review Bahan
            {bahanTertunda.length > 0 && (
              <span className="ml-2 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white">{bahanTertunda.length} perlu konfirmasi</span>
            )}
          </h3>
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">
            <i className="fa-solid fa-wand-magic-sparkles mr-1" />Usulan unik disetujui otomatis. Hanya yang mirip masuk di sini.
          </span>
        </div>
        {loading ? (
          <p className="text-sm text-blue-600 dark:text-blue-400 italic">Memuat...</p>
        ) : bahanTertunda.length === 0 ? (
          <p className="text-sm text-blue-600 dark:text-blue-400 italic">Tidak ada usulan yang menunggu review.</p>
        ) : (
          <div className="space-y-2">
            {bahanTertunda.map((b) => (
              <div key={b.id} className={`flex flex-wrap justify-between items-center gap-3 p-3 rounded-xl border shadow-xs bg-white dark:bg-gray-800 ${b.mirip_dengan ? 'border-amber-300 dark:border-amber-700' : 'border-blue-100 dark:border-blue-800'}`}>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold dark:text-gray-100">{b.nama_bahan}</span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500 dark:text-gray-400">{b.kategori}</span>
                  </div>
                  {b.mirip_dengan ? (
                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                      <i className="fa-solid fa-triangle-exclamation mr-1" />Mirip dengan bahan aktif: <strong>{b.mirip_dengan}</strong> — cek apakah ini duplikat yang tak perlu.
                    </p>
                  ) : (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1"><i className="fa-solid fa-check mr-1" />Tidak ditemukan bahan mirip.</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  {b.mirip_dengan ? (
                    <>
                      <button onClick={() => handleHapus(b.id, b.nama_bahan, `Sukses. Usulan "${b.nama_bahan}" ditolak — bahan "${b.mirip_dengan}" yang ada tetap dipakai.`)} className="border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 text-xs font-bold px-3 py-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/30 transition">
                        Gabung ke "{b.mirip_dengan}"
                      </button>
                      <button onClick={() => handleEdit(b)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-xs font-bold text-gray-600 dark:text-gray-300 hover:border-accent hover:text-accent transition">
                        <i className="fa-solid fa-pen" /> Edit Nama
                      </button>
                      <button onClick={() => handleSetujui(b.id, b.nama_bahan)} className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Tetap Setujui
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleSetujui(b.id, b.nama_bahan)} className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Setujui
                      </button>
                      <button onClick={() => handleHapus(b.id, b.nama_bahan)} className="border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition">
                        Hapus
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Bahan Aktif</h3>
          <div className="w-full md:w-72">
            <SearchBar value={cari} onChange={setCari} placeholder="Cari bahan..." />
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton-pulse h-14 rounded-xl" />)}
          </div>
        ) : daftarAktif.length === 0 ? (
          <div className="text-center py-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
            <span className="empty-icon"><i className="fa-solid fa-carrot" /></span>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">Tidak ada bahan pada pencarian ini.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {daftarAktif.map((b) => (
              <div key={b.id} className="flex flex-wrap justify-between items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-3">
                <div className="min-w-0 flex items-center gap-2">
                  <i className={`fa-solid text-accent ${b.kategori?.toLowerCase().includes('bumbu') ? 'fa-mortar-pestle' : b.kategori?.toLowerCase().includes('protein') ? 'fa-drumstick-bite' : 'fa-leaf'}`} />
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">{b.nama_bahan}</p>
                    <p className="text-xs text-gray-400">{b.kategori}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEdit(b)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-xs font-bold text-gray-600 dark:text-gray-300 hover:border-accent hover:text-accent transition">
                    <i className="fa-solid fa-pen" /> Edit
                  </button>
                  <button onClick={() => handleHapus(b.id, b.nama_bahan)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 dark:border-red-800 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition">
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