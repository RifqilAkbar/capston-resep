`import { useEffect, useState } from 'react'
import { api } from '../api'
import ResepForm from '../components/ResepForm'

export default function EditResep({ token, dataBahan, id, onDataRefresh }) {
  const [resep, setResep] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pesan, setPesan] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let aktif = true
    api.ambilResep(token, id)
      .then(({ resep: data }) => { if (aktif) setResep(data) })
      .catch((err) => { if (aktif) setError(err.message) })
      .finally(() => { if (aktif) setLoading(false) })
    return () => { aktif = false }
  }, [token, id])

  const handleSubmit = async (payload) => {
    setPesan('')
    if (!payload.judul_resep || payload.ingredient_ids.length === 0) {
      setPesan('Gagal: Judul resep dan minimal 1 bahan wajib diisi!')
      return
    }

    setIsSubmitting(true)
    try {
      const { resep: hasil } = await api.ubahResep(token, id, payload)
      setPesan(`Sukses! Resep "${hasil.judul_resep}" berhasil diperbarui.`)
      if (onDataRefresh) await onDataRefresh()
    } catch (err) {
      setPesan(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="page-container mt-10 pb-16">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8">
          <div className="skeleton-pulse h-8 w-1/2 mb-4" />
          <div className="skeleton-pulse h-4 w-full mb-3" />
          <div className="skeleton-pulse h-40 w-full" />
        </div>
      </main>
    )
  }

  if (error || !resep) {
    return (
      <main className="page-container mt-10 pb-16">
        <div className="max-w-3xl mx-auto text-center py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
          <i className="fa-solid fa-triangle-exclamation text-4xl text-red-400 mb-4" />
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Tidak dapat memuat resep</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{error || 'Resep tidak ditemukan.'}</p>
          <a href="#/resep-saya" className="btn-primary inline-flex mt-6"><i className="fa-solid fa-arrow-left" /> Kembali</a>
        </div>
      </main>
    )
  }

  return (
    <main className="page-container mt-10 pb-16">
      <div className="max-w-3xl mx-auto">
        <div>
          <span className="section-kicker"><i className="fa-solid fa-pen" />Edit Resep</span>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Perbarui Resep</h1>
        </div>

        <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 md:p-8">
          <ResepForm
            dataBahan={dataBahan}
            initial={resep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            pesan={pesan}
            submitLabel="Simpan Perubahan"
          />
        </div>
      </div>
    </main>
  )
}