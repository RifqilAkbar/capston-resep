import { useState } from 'react'
import { api } from '../api'
import ResepForm from '../components/ResepForm'

export default function TambahResep({ token, dataBahan, onDataRefresh }) {
  const [pesan, setPesan] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (payload) => {
    setPesan('')
    if (!payload.judul_resep || payload.ingredient_ids.length === 0) {
      setPesan('Gagal: Judul resep dan minimal 1 bahan wajib diisi!')
      return
    }

    setIsSubmitting(true)
    try {
      const { resep } = await api.tambahResep(token, payload)
      setPesan(`Sukses! Resep "${resep.judul_resep}" dikirim. ${resep.status === 'pending' ? 'Menunggu persetujuan admin.' : ''}`)
      if (onDataRefresh) await onDataRefresh()
    } catch (error) {
      setPesan(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page-container mt-10 pb-16">
      <div className="max-w-3xl mx-auto">
        <div>
          <span className="section-kicker"><i className="fa-solid fa-plus" />Tambah Resep</span>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Bagikan Resep Baru</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tulis resep Anda dengan lengkap. Resep akan tampil setelah disetujui admin.</p>
        </div>

        <div className="mt-4 flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <i className="fa-solid fa-hourglass-half text-amber-500 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Resep yang Anda buat berstatus <strong>Pending</strong> dan tidak langsung tampil. Admin akan menyetujuinya terlebih dahulu.
          </p>
        </div>

        <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 md:p-8">
          <ResepForm
            dataBahan={dataBahan}
            token={token}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            pesan={pesan}
            submitLabel="Kirim Resep"
          />
        </div>
      </div>
    </main>
  )
}
