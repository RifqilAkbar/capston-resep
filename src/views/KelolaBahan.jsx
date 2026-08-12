import { useEffect, useState } from 'react'
import { api } from '../api'
import { SearchBar } from '../components/SearchBar'

export default function KelolaBahan({ token, onDataRefresh }) {
  const [bahanTertunda, setBahanTertunda] = useState([])
  const [semuaBahan, setSemuaBahan] = useState([])
  const [cari, setCari] = useState('')
  const [loading, setLoading] = useState(true)
  const [pesan, setPesan] = useState('')
  const [terbuka, setTerbuka] = useState(() => new Set())

  useEffect(() => { setTerbuka(new Set()) }, [cari])

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
  const DAFTAR_GRUP = ['Protein', 'Sayuran', 'Buah', 'Karbohidrat', 'Rempah', 'Bumbu Dasar', 'Bahan Cair', 'Penyedap', 'Pelengkap']
  const ikonGrup = {
    Protein: 'fa-drumstick-bite', Sayuran: 'fa-leaf', Buah: 'fa-apple-whole',
    Karbohidrat: 'fa-bowl-rice', Rempah: 'fa-mortar-pestle', 'Bumbu Dasar': 'fa-blender',
    'Bahan Cair': 'fa-droplet', Penyedap: 'fa-spoon', Pelengkap: 'fa-cookie-bite',
  }
  const warnaGrup = {
    Protein: 'bg-orange-100 dark:bg-orange-900/40 text-accent',
    Sayuran: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400',
    Buah: 'bg-red-100 dark:bg-red-900/40 text-red-500 dark:text-red-400',
    Karbohidrat: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
    Rempah: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
    'Bumbu Dasar': 'bg-lime-100 dark:bg-lime-900/40 text-lime-600 dark:text-lime-400',
    'Bahan Cair': 'bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400',
    Penyedap: 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400',
    Pelengkap: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
  }
  const cocok = (b) => !teksCari || String(b.nama_bahan).toLowerCase().includes(teksCari)
  const grupDariData = new Map()
  for (const b of semuaBahan.filter(cocok)) {
    const nama = b.kategori || 'Lainnya'
    if (!grupDariData.has(nama)) grupDariData.set(nama, [])
    grupDariData.get(nama).push(b)
  }
  const urut = (daftar) => daftar.sort((x, y) => String(x.nama_bahan).localeCompare(String(y.nama_bahan)))
  const kelompokBahan = [
    ...DAFTAR_GRUP.map((nama) => ({ nama, daftar: urut(grupDariData.get(nama) || []) })),
    ...[...grupDariData.keys()]
      .filter((nama) => !DAFTAR_GRUP.includes(nama))
      .sort((a, b) => a.localeCompare(b))
      .map((nama) => ({ nama, daftar: urut(grupDariData.get(nama)) })),
  ]
  const totalHasil = kelompokBahan.reduce((n, g) => n + g.daftar.length, 0)

  const toggleGrup = (nama) => {
    setTerbuka((prev) => {
      const baru = new Set(prev)
      if (baru.has(nama)) baru.delete(nama)
      else baru.add(nama)
      return baru
    })
  }
  const semuaTerbuka = kelompokBahan.length > 0 && kelompokBahan.every((g) => terbuka.has(g.nama))
  const setSemua = (buka) => setTerbuka(new Set(buka ? kelompokBahan.map((g) => g.nama) : []))

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
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => setSemua(!semuaTerbuka)} className="text-xs font-bold text-accent hover:text-accent-dark transition">
              <i className={`fa-solid ${semuaTerbuka ? 'fa-compress' : 'fa-expand'} mr-1`} />{semuaTerbuka ? 'Tutup Semua' : 'Buka Semua'}
            </button>
            <div className="w-full md:w-72">
              <SearchBar value={cari} onChange={setCari} placeholder="Cari bahan..." />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton-pulse h-14 rounded-xl" />)}
          </div>
        ) : totalHasil === 0 ? (
          <div className="text-center py-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
            <span className="empty-icon"><i className="fa-solid fa-carrot" /></span>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">Tidak ada bahan pada pencarian ini.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {kelompokBahan.map((g) => {
                const buka = teksCari ? true : terbuka.has(g.nama)
                return (
                  <button
                    key={g.nama}
                    onClick={() => toggleGrup(g.nama)}
                    className={`bg-white dark:bg-gray-800 border rounded-2xl shadow-sm p-3 text-left transition hover:shadow-md hover:-translate-y-0.5 ${buka ? 'border-accent dark:border-accent' : 'border-gray-200 dark:border-gray-700'}`}
                    aria-expanded={buka}
                  >
                    <span className="flex items-center justify-between">
                      <span className={`inline-flex w-9 h-9 rounded-lg items-center justify-center text-sm ${warnaGrup[g.nama] || 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                        <i className={`fa-solid ${ikonGrup[g.nama] || 'fa-carrot'}`} />
                      </span>
                      <i className={`fa-solid fa-chevron-${buka ? 'up' : 'down'} text-[10px] text-gray-400`} />
                    </span>
                    <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">{g.nama}</p>
                    <p className="text-[11px] font-semibold text-gray-400 mt-0.5">{g.daftar.length} bahan</p>
                  </button>
                )
              })}
            </div>

            {kelompokBahan.filter((g) => (teksCari ? true : terbuka.has(g.nama))).length > 0 && (
              <div className="space-y-6">
                {kelompokBahan.map((g) => {
                  const buka = teksCari ? true : terbuka.has(g.nama)
                  if (!buka) return null
                  return (
                    <div key={g.nama}>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        <span className={`inline-flex w-7 h-7 rounded-lg items-center justify-center text-xs ${warnaGrup[g.nama] || 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                          <i className={`fa-solid ${ikonGrup[g.nama] || 'fa-carrot'}`} />
                        </span>
                        {g.nama}
                        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{g.daftar.length} bahan</span>
                      </h4>
                      <div className="space-y-2">
                        {g.daftar.length === 0 ? (
                          <p className="text-sm text-gray-400 italic">Belum ada bahan pada kategori ini.</p>
                        ) : g.daftar.map((b) => (
                          <div key={b.id} className="flex flex-wrap justify-between items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-3">
                            <div className="min-w-0 flex items-center gap-2">
                              <i className={`fa-solid text-accent ${ikonGrup[b.kategori] || 'fa-leaf'}`} />
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
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}