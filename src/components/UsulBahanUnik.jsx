import { useState } from 'react'
import { api } from '../api'

export default function UsulBahanUnik({ token }) {
  const [buka, setBuka] = useState(false)
  const [namaBahan, setNamaBahan] = useState('')
  const [kategori, setKategori] = useState('Sayuran')
  const [pesan, setPesan] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    if (!namaBahan.trim()) {
      setPesan('Nama bahan wajib diisi.')
      return
    }

    setIsSubmitting(true)
    setPesan('')
    try {
      const res = await api.tambahBahan(token, {
        nama_bahan: namaBahan.trim(),
        kategori,
      })
      if (res.mirip_dengan) {
        setPesan(`Sukses! Usulan hampir sama dengan "${res.mirip_dengan}" dan masuk antrean review admin.`)
      } else {
        setPesan('Sukses! Bahan Anda langsung tersedia dan bisa dipakai di resep.')
      }
      setNamaBahan('')
    } catch (error) {
      setPesan(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setBuka((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-amber-100/60 dark:hover:bg-amber-900/30 transition"
        aria-expanded={buka}
      >
        <div>
          <p className="text-sm font-bold text-amber-900 dark:text-amber-300">Punya Bahan Unik?</p>
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">Usulkan bahan baru agar bisa dipakai di resep lain.</p>
        </div>
        <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-300 shrink-0">
          <i className={`fa-solid fa-chevron-${buka ? 'up' : 'down'}`} />
        </span>
      </button>

      {buka && (
        <form onSubmit={handleSubmit} className="px-4 pb-4 flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Daun Kelor, Jamur..."
            value={namaBahan}
            onChange={(e) => setNamaBahan(e.target.value)}
            className="flex-1 min-w-[180px] p-2.5 bg-white dark:bg-gray-700 border border-amber-300 dark:border-amber-700 rounded-xl outline-none text-sm text-gray-900 dark:text-gray-100"
          />
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="p-2.5 bg-white dark:bg-gray-700 border border-amber-300 dark:border-amber-700 rounded-xl text-sm text-gray-900 dark:text-gray-100"
          >
            <option value="Sayuran">Sayuran</option>
            <option value="Protein">Protein</option>
            <option value="Bumbu">Bumbu</option>
          </select>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-500 disabled:bg-amber-300 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-sm transition"
          >
            {isSubmitting ? 'Mengirim...' : 'Usulkan'}
          </button>
          {pesan && (
            <p className={`w-full font-semibold text-center text-sm ${pesan.includes('Sukses') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
              {pesan}
            </p>
          )}
        </form>
      )}
    </div>
  )
}
