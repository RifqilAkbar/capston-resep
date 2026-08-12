import { useState } from 'react'
import UsulBahanUnik from './UsulBahanUnik'

export default function ResepForm({
  dataBahan,
  initial = null,
  token,
  onSubmit,
  isSubmitting,
  pesan,
  submitLabel,
}) {
  const [judulResep, setJudulResep] = useState(initial?.judul_resep || '')
  const [kategori, setKategori] = useState(initial?.kategori || 'Nusantara')
  const [porsiDefault, setPorsiDefault] = useState(initial?.porsi_default || 2)
  const [durasiMenit, setDurasiMenit] = useState(initial?.durasi_menit || 15)
  const [langkahResep, setLangkahResep] = useState(
    (initial?.langkah_memasak?.length ? initial.langkah_memasak : [{ instruksi: '' }]),
  )
  const [bahanResepDipilih, setBahanResepDipilih] = useState(
    initial?.recipe_ingredients?.map((ri) => Number(ri.ingredient_id)) || [],
  )

  const handleUbahLangkah = (index, value) => {
    setLangkahResep(langkahResep.map((l, i) => (i === index ? { instruksi: value } : l)))
  }
  const handleTambahInputLangkah = () => setLangkahResep([...langkahResep, { instruksi: '' }])
  const handleHapusInputLangkah = (index) => setLangkahResep(langkahResep.filter((_, i) => i !== index))
  const handleCheckboxBahanResep = (idBahan) => {
    setBahanResepDipilih((prev) => prev.includes(idBahan) ? prev.filter((id) => id !== idBahan) : [...prev, idBahan])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSubmitting) return

    const langkahValid = langkahResep.filter((l) => l.instruksi.trim() !== '')
    onSubmit({
      judul_resep: judulResep.trim(),
      kategori,
      porsi_default: Number(porsiDefault) || 1,
      durasi_menit: Number(durasiMenit) || 15,
      langkah_memasak: langkahValid,
      ingredient_ids: bahanResepDipilih,
    })
  }

  const input = 'w-full p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm'
  const label = 'block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className={label}>Nama Resep</label>
          <input type="text" placeholder="Contoh: Nasi Goreng Kampung" value={judulResep} onChange={(e) => setJudulResep(e.target.value)} className={input} />
        </div>
        <div>
          <label className={label}>Durasi Masak (menit)</label>
          <input type="number" min="1" max="600" value={durasiMenit} onChange={(e) => setDurasiMenit(e.target.value)} className={input} />
        </div>
        <div>
          <label className={label}>Estimasi Porsi</label>
          <input type="number" min="1" value={porsiDefault} onChange={(e) => setPorsiDefault(e.target.value)} className={input} />
        </div>
      </div>

      <div>
        <label className={label}>Kategori</label>
        <select value={kategori} onChange={(e) => setKategori(e.target.value)} className={input}>
          {['Nusantara', 'Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali', 'Betawi', 'Ayam', 'Daging', 'Ikan', 'Sayuran', 'Telur', 'Mie', 'Seafood', 'Lainnya'].map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={label}>Pilih Bahan Baku yang Digunakan:</label>
        <div className="flex flex-wrap gap-2 max-h-44 overflow-y-auto border dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
          {dataBahan.length === 0 ? (
            <p className="text-sm text-gray-400 italic">Belum ada bahan yang tersedia.</p>
          ) : dataBahan.map((bahan) => (
            <label key={bahan.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition ${bahanResepDipilih.includes(bahan.id) ? 'bg-orange-100 dark:bg-orange-900/40 border-accent dark:border-accent text-accent' : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300 border-transparent'}`}>
              <input type="checkbox" checked={bahanResepDipilih.includes(bahan.id)} onChange={() => handleCheckboxBahanResep(bahan.id)} className="hidden" />
              {bahan.nama_bahan}
            </label>
          ))}
        </div>
      </div>

      <UsulBahanUnik token={token} />

      <div className="space-y-3">
        <label className={label}>Langkah Demi Langkah Memasak:</label>
        {langkahResep.map((langkah, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0">{index + 1}</span>
            <input type="text" placeholder={`Langkah ke-${index + 1}...`} value={langkah.instruksi} onChange={(e) => handleUbahLangkah(index, e.target.value)} className="flex-1 p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm" />
            {langkahResep.length > 1 && (
              <button type="button" onClick={() => handleHapusInputLangkah(index)} className="w-8 h-8 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center justify-center shrink-0 transition" aria-label="Hapus langkah">
                <i className="fa-solid fa-trash-can" />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleTambahInputLangkah} className="text-accent dark:text-orange-400 hover:text-accent-dark font-bold text-sm flex items-center gap-1 pt-1 transition">
          + Tambah Langkah Memasak
        </button>
      </div>

      {pesan && (
        <p className={`font-semibold text-center text-sm ${pesan.includes('Sukses') || pesan.includes('berhasil') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
          {pesan}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent disabled:bg-accent/50 hover:bg-accent-dark text-white font-bold p-3.5 rounded-xl transition shadow-sm"
      >
        {isSubmitting ? 'Menyimpan...' : submitLabel}
      </button>
    </form>
  )
}
