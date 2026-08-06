import { useEffect, useState } from 'react'
import { api } from '../api'
import { ICON_HEART_FILLED, ICON_HEART_OUTLINE } from '../components/icons'
import { fotoMakanan } from '../fotoMakanan'
import { fotoAvatar, mockDurasi } from '../mock'

export default function DetailResep({ id, kulkasUser, favoritIds, onToggleFavorit, token, session, onNeedLogin }) {
  const [resep, setResep] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [diBelanja, setDiBelanja] = useState(false)
  const [gagalFoto, setGagalFoto] = useState(false)

  const [komentar, setKomentar] = useState([])
  const [isiKomentar, setIsiKomentar] = useState('')
  const [isSubmittingKomentar, setIsSubmittingKomentar] = useState(false)
  const [pesanKomentar, setPesanKomentar] = useState('')

  const [nilaiRating, setNilaiRating] = useState(0)
  const [isSubmittingRating, setIsSubmittingRating] = useState(false)
  const [pesanRating, setPesanRating] = useState('')

  useEffect(() => {
    let aktif = true
    api.komentarResep(id)
      .then(({ komentar: data }) => { if (aktif) setKomentar(data || []) })
      .catch(() => {})
    return () => { aktif = false }
  }, [id])

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

  const handleKirimKomentar = async (e) => {
    e.preventDefault()
    if (isSubmittingKomentar) return
    setPesanKomentar('')

    if (!session) {
      onNeedLogin?.()
      return
    }

    if (!isiKomentar.trim()) {
      setPesanKomentar('Isi komentar tidak boleh kosong.')
      return
    }

    setIsSubmittingKomentar(true)
    try {
      const { komentar: data } = await api.kirimKomentar(token, id, isiKomentar)
      setKomentar((prev) => [data, ...prev])
      setIsiKomentar('')
    } catch (error) {
      setPesanKomentar(error.message)
    } finally {
      setIsSubmittingKomentar(false)
    }
  }

  const handleKirimRating = async (nilai) => {
    if (isSubmittingRating) return
    setPesanRating('')

    if (!session) {
      onNeedLogin?.()
      return
    }

    setIsSubmittingRating(true)
    try {
      const { rating } = await api.beriRating(token, id, nilai)
      setNilaiRating(nilai)
      setResep((prev) => ({ ...prev, rating_avg: rating.rating_avg, rating_count: rating.rating_count }))
    } catch (error) {
      setPesanRating(error.message)
    } finally {
      setIsSubmittingRating(false)
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
  const ratingAvg = Number(resep.rating_avg || 0)
  const ratingCount = Number(resep.rating_count || 0)
  const pembuat = resep.pembuat_nama || resep.pembuat_username || 'Pembuat Resep'
  const avatarPembuat = fotoAvatar(resep.pembuat_username || resep.pembuat_nama || 'chef')
  const waktuMasak = resep.durasi_menit || mockDurasi(resep.id)

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

      <div className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden p-6 md:p-8">
        {/* Blok 1 & 2: Kategori + nama + rating */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100">{resep.judul_resep}</h1>
            <span className="recipe-category mt-2 inline-block">{resep.kategori || 'Makanan'}</span>
          </div>
          {ratingCount > 0 ? (
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1.5 justify-end">
                <i className="fa-solid fa-star text-amber-400" />
                <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">{ratingAvg}</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{ratingCount} rating</p>
            </div>
          ) : (
            <div className="text-right shrink-0">
              <i className="fa-solid fa-star text-gray-300 dark:text-gray-600 text-lg" />
              <p className="text-xs text-gray-400 mt-0.5">Belum ada rating</p>
            </div>
          )}
        </div>

        {/* Blok 3: Foto */}
        <div className="mt-6 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
          {gagalFoto ? (
            <div className="w-full h-64 md:h-96 flex items-center justify-center text-gray-400">
              <i className="fa-solid fa-utensils text-5xl" />
            </div>
          ) : (
            <img
              src={fotoMakanan(resep.judul_resep)}
              alt={resep.judul_resep}
              onError={() => setGagalFoto(true)}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}
        </div>

        {/* Blok 4: Pembuat + aksi */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
              <img src={avatarPembuat} alt={pembuat} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-gray-100">{pembuat}</p>
              <p className="text-xs text-gray-400">Pembuat Resep</p>
            </div>
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

        {/* Blok 5: Details */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { ikon: 'fa-clock', label: 'Waktu Masak', nilai: `${waktuMasak} menit` },
            { ikon: 'fa-users', label: 'Porsi', nilai: `${resep.porsi_default || 1} porsi` },
            { ikon: 'fa-carrot', label: 'Bahan', nilai: `${bahan.length} bahan` },
            { ikon: 'fa-list-ol', label: 'Langkah', nilai: `${langkah.length} langkah` },
          ].map((d) => (
            <div key={d.label} className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 text-center">
              <i className={`fa-solid ${d.ikon} text-accent`} />
              <p className="mt-1.5 text-sm font-extrabold text-gray-900 dark:text-gray-100">{d.nilai}</p>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{d.label}</p>
            </div>
          ))}
        </div>

        {/* Blok 6: Bahan */}
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

        {/* Kecocokan kulkas + daftar belanja */}
        <div className="mt-6">
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-300 font-medium">Kecocokan dengan kulkas Anda</span>
              <strong className="text-orange-600 dark:text-orange-400">{persentase}%</strong>
            </div>
            <div className="recipe-progress">
              <div className="recipe-progress-bar" style={{ width: `${persentase}%` }} />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{jumlahDimiliki} dari {bahan.length} bahan tersedia di kulkas Anda</p>
          </div>

          {bahanKurang.length > 0 ? (
            <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
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
            <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <p className="text-sm text-green-700 dark:text-green-300 font-semibold">✓ Semua bahan sudah tersedia di kulkas Anda!</p>
            </div>
          )}
        </div>

        {/* Blok 7: Langkah */}
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

      {/* Blok 8: Komentar & Rating */}
      <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Rating & Komentar</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{komentar.length} komentar</p>
          </div>
          {ratingCount > 0 && (
            <div className="text-center">
              <p className="text-3xl font-extrabold text-amber-500">{ratingAvg}</p>
              <p className="text-xs text-gray-400">{ratingCount} rating</p>
            </div>
          )}
        </div>

        <div className="mt-5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Beri Rating Resep Ini</p>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => handleKirimRating(n)}
                disabled={isSubmittingRating}
                className="text-2xl transition hover:scale-110 disabled:opacity-50"
                aria-label={`Rating ${n} dari 5`}
              >
                <i className={`fa-solid fa-star ${n <= (nilaiRating || Math.round(ratingAvg)) ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />
              </button>
            ))}
          </div>
          {pesanRating && <p className="text-sm text-red-500 mt-2">{pesanRating}</p>}
        </div>

        <form onSubmit={handleKirimKomentar} className="mt-5 space-y-3">
          <textarea
            rows="3"
            placeholder={session ? 'Tulis komentar Anda...' : 'Masuk dulu untuk berkomentar.'}
            value={isiKomentar}
            onChange={(e) => setIsiKomentar(e.target.value)}
            className="w-full p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
          />
          <div className="flex items-center justify-between gap-3">
            {pesanKomentar && <p className="text-sm text-red-500">{pesanKomentar}</p>}
            <button
              type="submit"
              disabled={isSubmittingKomentar}
              className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-accent disabled:bg-accent/50 hover:bg-accent-dark transition"
            >
              <i className="fa-solid fa-paper-plane" /> {isSubmittingKomentar ? 'Mengirim...' : 'Kirim Komentar'}
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-4">
          {komentar.length === 0 ? (
            <p className="text-sm text-gray-400 italic text-center py-6">Belum ada komentar. Jadilah yang pertama!</p>
          ) : komentar.map((k) => (
            <div key={k.id} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-accent font-bold">
                  {(k.penulis || '?').charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{k.penulis || 'Pengguna'}</p>
                  <p className="text-[11px] text-gray-400">{new Date(k.created_at).toLocaleString('id-ID')}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">{k.isi}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}