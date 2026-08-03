import { useEffect, useState } from 'react'
import { api } from '../api'
import { ICON_HEART_FILLED, ICON_HEART_OUTLINE } from '../components/icons'

export default function DetailResep({ id, kulkasUser, favoritIds, onToggleFavorit }) {
  const [resep, setResep] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [diBelanja, setDiBelanja] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    let aktif = true

    api.detailResep(id)
      .then(({ resep: data }) => {
        if (!aktif) return
        setResep(data)
        if (window.Riwayat) window.Riwayat.tambah(data)
      })
      .catch((err) => { if (aktif) setError(err.message || 'Resep tidak ditemukan.') })
      .finally(() => { if (aktif) setLoading(false) })

    return () => { aktif = false }
  }, [id])

  const kembali = () => { window.location.hash = '#/resep' }

  const handleBagikan = async () => {
    const url = window.location.href
    const teks = `Lihat resep ${resep?.judul_resep} di Buku Resep Nusantara!`

    if (navigator.share) {
      try { await navigator.share({ title: resep?.judul_resep, text: teks, url }) } catch { /* batal */ }
      return
    }

    try {
      await navigator.clipboard.writeText(url)
      if (window.Toast) window.Toast.show('Link resep disalin ke clipboard!', 'success')
    } catch {
      if (window.Toast) window.Toast.show('Gagal menyalin link.', 'error')
    }
  }

  if (loading) {
    return (
      <main className="page-container mt-10 pb-16">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8">
          <div className="skeleton-pulse h-8 w-2/3 mb-4" />
          <div className="skeleton-pulse h-4 w-1/3 mb-6" />
          <div className="skeleton-pulse h-4 w-full mb-3" />
          <div className="skeleton-pulse h-4 w-full mb-3" />
          <div className="skeleton-pulse h-4 w-3/4 mb-6" />
          <div className="skeleton-pulse h-24 w-full" />
        </div>
      </main>
    )
  }

  if (error || !resep) {
    return (
      <main className="page-container mt-10 pb-16">
        <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
          <i className="fa-solid fa-triangle-exclamation text-4xl text-red-400 mb-4" />
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Resep tidak ditemukan</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{error || 'Resep yang Anda cari tidak tersedia.'}</p>
          <button onClick={kembali} className="btn-primary inline-flex mt-6">
            <i className="fa-solid fa-arrow-left" /> Kembali ke Resep
          </button>
        </div>
      </main>
    )
  }

  const bahan = resep.recipe_ingredients || []
  const langkah = Array.isArray(resep.langkah_memasak) ? resep.langkah_memasak : []
  const jumlahDimiliki = bahan.filter((b) => kulkasUser.includes(Number(b.ingredient_id))).length
  const persentase = bahan.length ? Math.round((jumlahDimiliki / bahan.length) * 100) : 0
  const bahanKurang = bahan.filter((b) => !kulkasUser.includes(Number(b.ingredient_id)))
  const isFavorit = favoritIds.includes(Number(id))

  const handleTambahBelanja = () => {
    if (!bahanKurang.length) return
    const items = bahanKurang.map((b) => ({
      id: b.ingredient_id,
      nama: b.nama_bahan,
      kuantitas: b.kuantitas,
      satuan: b.satuan,
    }))
    const ditambah = window.ShoppingList ? window.ShoppingList.tambah(items) : 0
    setDiBelanja(true)
    if (window.Toast) {
      window.Toast.show(
        ditambah > 0
          ? `${ditambah} bahan ditambahkan ke daftar belanja.`
          : 'Semua bahan ini sudah ada di daftar belanja.',
        ditambah > 0 ? 'success' : 'info',
      )
    }
  }

  return (
    <main className="page-container mt-8 pb-16">
      <button onClick={kembali} className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition flex items-center gap-2">
        <i className="fa-solid fa-arrow-left" /> Kembali ke Resep
      </button>

      <div className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="recipe-category">{resep.kategori || 'Makanan'}</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mt-2">{resep.judul_resep}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                <i className="fa-solid fa-carrot mr-1.5" />{bahan.length} bahan
                <i className="fa-solid fa-list-ol ml-4 mr-1.5" />{langkah.length} langkah
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={handleBagikan} className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:border-orange-400 transition">
                <i className="fa-solid fa-share-nodes mr-1.5" />Bagikan
              </button>
              <button
                onClick={() => onToggleFavorit(resep.id)}
                className="w-11 h-11 rounded-xl border border-gray-200 dark:border-gray-600 flex items-center justify-center transition"
                aria-label={isFavorit ? 'Hapus dari favorit' : 'Tambah ke favorit'}
              >
                {isFavorit ? ICON_HEART_FILLED : ICON_HEART_OUTLINE}
              </button>
            </div>
          </div>

          <div className="mt-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-300 font-medium">Kecocokan dengan kulkas Anda</span>
              <strong className="text-orange-600 dark:text-orange-400">{persentase}%</strong>
            </div>
            <div className="recipe-progress">
              <div className="recipe-progress-bar" style={{ width: `${persentase}%` }} />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{jumlahDimiliki} dari {bahan.length} bahan tersedia di kulkas Anda</p>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Bahan-Bahan</h2>
            {bahan.length ? (
              <ul className="divide-y divide-gray-100 dark:divide-gray-700 border border-gray-100 dark:border-gray-700 rounded-xl px-5">
                {bahan.map((b) => {
                  const punya = kulkasUser.includes(Number(b.ingredient_id))
                  return (
                    <li key={b.ingredient_id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <span className="flex items-center gap-3">
                        <span className={`font-bold text-base ${punya ? 'text-green-600' : 'text-red-500'}`}>{punya ? '✓' : '✗'}</span>
                        <span className="text-sm">
                          <span className="font-medium text-gray-700 dark:text-gray-300">{b.nama_bahan}</span>
                          <span className="text-gray-400 dark:text-gray-500 mx-1">—</span>
                          <span className="text-gray-500 dark:text-gray-400">{b.kuantitas} {b.satuan}</span>
                        </span>
                      </span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full capitalize">{b.kategori || ''}</span>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">Tidak ada data bahan.</p>
            )}
          </div>

          <div className="mt-6">
            {bahanKurang.length > 0 ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">Bahan yang belum ada di kulkas:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {bahanKurang.map((b) => (
                    <span key={b.ingredient_id} className="px-3 py-1.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-xl text-sm font-medium">
                      {b.nama_bahan}
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleTambahBelanja}
                  disabled={diBelanja}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  <i className={`fa-solid ${diBelanja ? 'fa-check' : 'fa-cart-plus'}`} />
                  {diBelanja ? 'Sudah di Daftar Belanja' : 'Tambah ke Daftar Belanja'}
                </button>
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <p className="text-sm text-green-700 dark:text-green-300 font-semibold">✓ Semua bahan sudah tersedia di kulkas Anda!</p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Langkah Memasak</h2>
            {langkah.length ? (
              <ol className="space-y-4">
                {langkah.map((l, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300 pt-1">{l.instruksi}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-gray-400 italic">Tidak ada langkah memasak.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
