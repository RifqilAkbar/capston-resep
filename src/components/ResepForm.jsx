import { useEffect, useState } from 'react'
import UsulBahanUnik from './UsulBahanUnik'
import { DAFTAR_GRUP, ikonGrup, warnaGrup } from '../kategoriGrup'
import { ikonLink } from '../linkMedia'

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
    initial?.recipe_ingredients?.map((ri) => ({
      id: Number(ri.ingredient_id),
      kuantitas: ri.kuantitas ?? 1,
      satuan: ri.satuan || 'secukupnya',
    })) || [],
  )
  const [cariBahan, setCariBahan] = useState('')
  const [grupTerbuka, setGrupTerbuka] = useState(() => new Set(DAFTAR_GRUP))
  const [foto, setFoto] = useState(initial?.foto || '')
  const [modaFoto, setModaFoto] = useState(initial?.foto?.startsWith('data:') ? 'upload' : 'link')
  const [linkMedia, setLinkMedia] = useState(initial?.link_media?.length ? initial.link_media : [])

  const handlePilihFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const maks = 1024
        const skala = Math.min(1, maks / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * skala)
        canvas.height = Math.round(img.height * skala)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        setFoto(canvas.toDataURL('image/jpeg', 0.75))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }
  const ubahLink = (index, value) => setLinkMedia(linkMedia.map((u, i) => (i === index ? value : u)))
  const hapusLink = (index) => setLinkMedia(linkMedia.filter((_, i) => i !== index))

  useEffect(() => {
    const idSet = new Set(bahanResepDipilih.map((b) => b.id))
    const perluBuka = new Set()
    for (const b of dataBahan) if (idSet.has(b.id) && b.kategori) perluBuka.add(b.kategori)
    if (perluBuka.size) {
      setGrupTerbuka((prev) => new Set([...prev, ...perluBuka]))
    }
  }, [dataBahan, bahanResepDipilih])

  const handleUbahLangkah = (index, value) => {
    setLangkahResep(langkahResep.map((l, i) => (i === index ? { instruksi: value } : l)))
  }
  const handleTambahInputLangkah = () => setLangkahResep([...langkahResep, { instruksi: '' }])
  const handleHapusInputLangkah = (index) => setLangkahResep(langkahResep.filter((_, i) => i !== index))
  const handleCheckboxBahanResep = (idBahan) => {
    setBahanResepDipilih((prev) =>
      prev.some((b) => b.id === idBahan)
        ? prev.filter((b) => b.id !== idBahan)
        : [...prev, { id: idBahan, kuantitas: 1, satuan: 'secukupnya' }],
    )
  }
  const ubahKuantitas = (idBahan, kuantitas) => {
    setBahanResepDipilih((prev) => prev.map((b) => (b.id === idBahan ? { ...b, kuantitas } : b)))
  }
  const ubahSatuan = (idBahan, satuan) => {
    setBahanResepDipilih((prev) => prev.map((b) => (b.id === idBahan ? { ...b, satuan } : b)))
  }
  const hapusBahan = (idBahan) => {
    setBahanResepDipilih((prev) => prev.filter((b) => b.id !== idBahan))
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
      ingredient_ids: bahanResepDipilih.map((b) => b.id),
      bahan_resep: bahanResepDipilih.map((b) => ({ id: b.id, kuantitas: Number(b.kuantitas) || 1, satuan: b.satuan.trim() || 'secukupnya' })),
      foto: foto.trim(),
      link_media: linkMedia.map((u) => u.trim()).filter(Boolean),
    })
  }

  const teksCariBahan = cariBahan.trim().toLowerCase()
  const isDipilih = (id) => bahanResepDipilih.some((b) => b.id === id)
  const namaBahan = (id) => dataBahan.find((b) => b.id === id)?.nama_bahan || `#${id}`
  const chipBahan = (bahan) => (
    <label key={bahan.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition ${isDipilih(bahan.id) ? 'bg-orange-100 dark:bg-orange-900/40 border-accent dark:border-accent text-accent' : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300 border-transparent'}`}>
      <input type="checkbox" checked={isDipilih(bahan.id)} onChange={() => handleCheckboxBahanResep(bahan.id)} className="hidden" />
      {bahan.nama_bahan}
    </label>
  )
  const bahanCocok = dataBahan.filter((b) => !teksCariBahan || String(b.nama_bahan).toLowerCase().includes(teksCariBahan))
  const urutBahan = (daftar) => [...daftar].sort((a, b) =>
    Number(isDipilih(b.id)) - Number(isDipilih(a.id)) || String(a.nama_bahan).localeCompare(String(b.nama_bahan)))
  const kelompokBahan = [...DAFTAR_GRUP, 'Lainnya']
    .map((nama) => ({ nama, daftar: urutBahan(bahanCocok.filter((b) => (b.kategori || 'Lainnya') === nama)) }))
    .filter((g) => g.daftar.length > 0)
  const toggleGrup = (nama) => {
    setGrupTerbuka((prev) => {
      const baru = new Set(prev)
      if (baru.has(nama)) baru.delete(nama)
      else baru.add(nama)
      return baru
    })
  }

  const input = 'w-full p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm'
  const label = 'block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2'
  const SATUAN_UMUM = ['secukupnya', 'buah', 'butir', 'siung', 'lembar', 'ikat', 'potong', 'iris', 'sdm', 'sdt', 'ml', 'liter', 'gr', 'gram', 'kg', 'piring', 'gelas', 'bungkus']

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
        <label className={label}>Foto Masakan</label>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setModaFoto('upload')} className={`px-4 py-2 rounded-full text-xs font-bold border transition ${modaFoto === 'upload' ? 'bg-accent text-white border-accent' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'}`}>
            <i className="fa-solid fa-upload mr-1.5" />Upload Gambar
          </button>
          <button type="button" onClick={() => setModaFoto('link')} className={`px-4 py-2 rounded-full text-xs font-bold border transition ${modaFoto === 'link' ? 'bg-accent text-white border-accent' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'}`}>
            <i className="fa-solid fa-link mr-1.5" />Pakai Link
          </button>
          {foto && (
            <button type="button" onClick={() => setFoto('')} className="text-xs font-bold text-red-500 hover:text-red-600 transition">
              <i className="fa-solid fa-trash-can mr-1" />Hapus Foto
            </button>
          )}
        </div>
        {modaFoto === 'upload' ? (
          <input type="file" accept="image/*" onChange={handlePilihFile} className="mt-3 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-3 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-accent file:text-white file:text-xs file:font-bold file:cursor-pointer" />
        ) : (
          <input
            type="text"
            placeholder="https://... (URL gambar masakan)"
            value={foto.startsWith('data:') ? '' : foto}
            onChange={(e) => setFoto(e.target.value)}
            className={`${input} mt-3`}
          />
        )}
        {foto && (
          <img src={foto} alt="Pratinjau foto masakan" className="mt-3 w-40 h-28 object-cover rounded-xl border border-gray-200 dark:border-gray-600" />
        )}
      </div>

      <div>
        <label className={label}>Tautan Media Sosial</label>
        <div className="space-y-2">
          {linkMedia.map((u, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-600 flex items-center justify-center shrink-0">
                <i className={ikonLink(u)} />
              </span>
              <input
                type="text"
                placeholder="https://youtube.com/... (YouTube, Instagram, Facebook, TikTok)"
                value={u}
                onChange={(e) => ubahLink(index, e.target.value)}
                className="flex-1 min-w-0 p-2.5 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100"
              />
              <button type="button" onClick={() => hapusLink(index)} aria-label="Hapus tautan" className="w-8 h-8 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center justify-center shrink-0 transition">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setLinkMedia([...linkMedia, ''])} className="text-accent dark:text-orange-400 hover:text-accent-dark font-bold text-sm flex items-center gap-1 pt-2 transition">
          <i className="fa-solid fa-plus" /> Tambah Tautan
        </button>
      </div>

      <div>
        <label className={label}>Pilih Bahan Baku yang Digunakan ({bahanResepDipilih.length} dipilih):</label>
        <input
          type="text"
          placeholder="Cari bahan... (mis. cabai, daun)"
          value={cariBahan}
          onChange={(e) => setCariBahan(e.target.value)}
          className="w-full p-3 mb-2 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
        />
        <div className="max-h-60 overflow-y-auto border dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
          {bahanCocok.length === 0 ? (
            <p className="text-sm text-gray-400 italic">Belum ada bahan yang tersedia.</p>
          ) : teksCariBahan ? (
            <div className="flex flex-wrap gap-2">{urutBahan(bahanCocok).map(chipBahan)}</div>
          ) : (
            <div className="space-y-3">
              {kelompokBahan.map((g) => {
                const buka = grupTerbuka.has(g.nama)
                return (
                  <div key={g.nama} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                    <button type="button" onClick={() => toggleGrup(g.nama)} className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition">
                      <span className={`inline-flex w-7 h-7 rounded-lg items-center justify-center text-xs ${warnaGrup[g.nama] || 'bg-gray-200 dark:bg-gray-500 text-gray-600 dark:text-gray-300'}`}>
                        <i className={`fa-solid ${ikonGrup[g.nama] || 'fa-carrot'}`} />
                      </span>
                      <span className="flex-1 text-left text-sm font-bold text-gray-700 dark:text-gray-200">
                        {g.nama} <span className="text-xs font-normal text-gray-400">({g.daftar.length})</span>
                      </span>
                      <i className={`fa-solid fa-chevron-${buka ? 'up' : 'down'} text-xs text-gray-400`} />
                    </button>
                    {buka && <div className="flex flex-wrap gap-2 p-3">{g.daftar.map(chipBahan)}</div>}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <UsulBahanUnik token={token} />

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={label} style={{ marginBottom: 0 }}>Bahan yang Dipilih ({bahanResepDipilih.length})</label>
          {bahanResepDipilih.length > 0 && (
            <button type="button" onClick={() => setBahanResepDipilih([])} className="text-xs font-bold text-red-500 hover:text-red-600 transition">
              <i className="fa-solid fa-trash-can mr-1" />Hapus Semua
            </button>
          )}
        </div>
        <div className={`${bahanResepDipilih.length ? '' : 'hidden'} max-h-56 overflow-y-auto border dark:border-gray-600 p-3 rounded-xl bg-amber-50/50 dark:bg-amber-900/10 space-y-2`}>
          {bahanResepDipilih.map((b) => (
            <div key={b.id} className="flex flex-wrap items-center gap-2">
              <span className="flex-1 min-w-[120px] text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{namaBahan(b.id)}</span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={b.kuantitas}
                onChange={(e) => ubahKuantitas(b.id, e.target.value)}
                className="w-20 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100"
              />
              <select
                value={b.satuan}
                onChange={(e) => ubahSatuan(b.id, e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100"
              >
                {[...new Set([...SATUAN_UMUM, b.satuan])].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button type="button" onClick={() => hapusBahan(b.id)} aria-label={`Hapus ${namaBahan(b.id)}`} className="w-8 h-8 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center justify-center shrink-0 transition">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          ))}
        </div>
      </div>

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
