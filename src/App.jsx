import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ambilTokenTersimpan, api, hapusToken, simpanToken } from './api'
import './index.css'

// Fungsi tema untuk React — baca dari window.Theme jika tersedia
function getTheme() {
  if (window.Theme) return window.Theme.get()
  return localStorage.getItem('skripsi_theme') || 'light'
}

// Ikon SVG 2D (bukan emoji)
const ICON_HEART_OUTLINE = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.04 3 5.5l7 7Z" /></svg>
)
const ICON_HEART_FILLED = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.04 3 5.5l7 7Z" /></svg>
)
const ICON_MOON = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
)
const ICON_SUN = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
)

function CardResep({ resep, index, isFavorit, onToggleFavorit }) {
  const inisial = resep.judul?.charAt(0)?.toUpperCase() || '?'
  const progressColor =
    resep.persentase > 75 ? 'from-emerald-400 to-emerald-500' :
    resep.persentase > 50 ? 'from-orange-400 to-orange-500' :
    resep.persentase > 0 ? 'from-yellow-400 to-yellow-500' :
    'from-gray-300 to-gray-400'
  const badgeColor =
    resep.persentase > 75 ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' :
    resep.persentase > 50 ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300' :
    resep.persentase > 0 ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300' :
    'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'

  return (
    <div
      data-id={resep.id}
      onClick={() => window.location.href = `detail.html?id=${resep.id}`}
      className="card-enter bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                 rounded-2xl shadow-sm overflow-hidden
                 hover:shadow-lg dark:hover:shadow-gray-900/50
                 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer
                 transition-all duration-300"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative h-44 bg-gradient-to-br from-orange-100 dark:from-orange-900/40 to-orange-200 dark:to-orange-800/40 flex items-center justify-center">
        <span className="text-6xl font-bold text-orange-300/60 dark:text-orange-400/40 select-none">{inisial}</span>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorit(resep.id)
          }}
          className="absolute top-3 left-3 leading-none transition-transform duration-200 hover:scale-110 active:scale-90"
          aria-label={isFavorit ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        >
          {isFavorit ? ICON_HEART_FILLED : ICON_HEART_OUTLINE}
        </button>

        <span className={`absolute top-3 right-3 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${badgeColor}`}>
          Cocok: {resep.persentase}%
        </span>
      </div>

      <div className="p-5 space-y-3">
        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">{resep.judul}</h4>

        <div className="flex flex-wrap gap-1.5 items-center">
          {isFavorit && (
            <span className="text-xs px-2.5 py-1 bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-300 rounded-lg font-semibold">
              Favorit
            </span>
          )}
          <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">{resep.kategori}</span>
          <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">
            {resep.durasi || '\u2014'}
          </span>
          <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">
            {resep.jumlahBahan} bahan
          </span>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-400 dark:text-gray-500">Kecocokan</span>
            <span className="font-semibold text-gray-600 dark:text-gray-300">{resep.persentase}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${progressColor} rounded-full transition-all duration-700`}
              style={{ width: `${resep.persentase}%` }}
            />
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            window.location.href = `detail.html?id=${resep.id}`
          }}
          className="w-full mt-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700
                     text-white font-semibold py-2.5 px-4 rounded-xl text-sm
                     transition-all duration-200 active:scale-95"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  )
}

// Skeleton loading card untuk React
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
      <div className="skeleton-pulse h-44 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton-pulse h-5 w-3/4" />
        <div className="flex gap-2">
          <div className="skeleton-pulse h-4 w-16" />
          <div className="skeleton-pulse h-4 w-12" />
          <div className="skeleton-pulse h-4 w-14" />
        </div>
        <div className="space-y-1.5">
          <div className="skeleton-pulse h-3 w-full" />
          <div className="skeleton-pulse h-2.5 w-full" />
        </div>
        <div className="skeleton-pulse h-10 w-full" />
      </div>
    </div>
  )
}

function App() {
  const [session, setSession] = useState(null)
  const [token, setToken] = useState('')
  const [userRole, setUserRole] = useState('user')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [dataBahan, setDataBahan] = useState([])
  const [bahanTertunda, setBahanTertunda] = useState([])
  const [dataResep, setDataResep] = useState([])
  const [kulkasUser, setKulkasUser] = useState(function () {
    try {
      return JSON.parse(localStorage.getItem('skripsi_kulkas') || '[]')
    } catch {
      return []
    }
  })

  const [inputNamaBahan, setInputNamaBahan] = useState('')
  const [inputKategori, setInputKategori] = useState('Sayuran')
  const [pesanStatus, setPesanStatus] = useState('')

  const [judulResep, setJudulResep] = useState('')
  const [porsiDefault, setPorsiDefault] = useState(2)
  const [langkahResep, setLangkahResep] = useState([{ instruksi: '' }])
  const [bahanResepDipilih, setBahanResepDipilih] = useState([])
  const [pesanResep, setPesanResep] = useState('')

  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false)
  const [isSubmittingResep, setIsSubmittingResep] = useState(false)
  const [isSubmittingBahan, setIsSubmittingBahan] = useState(false)
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [theme, setTheme] = useState(getTheme)
  const [loading, setLoading] = useState(true)

  const [favoritIds, setFavoritIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('skripsi_favorites') || '[]')
    } catch {
      return []
    }
  })

  function handleToggleFavorit(id) {
    var numId = Number(id)
    setFavoritIds(function (prev) {
      var baru
      var idx = prev.indexOf(numId)
      if (idx === -1) {
        baru = prev.concat([numId])
      } else {
        baru = prev.slice()
        baru.splice(idx, 1)
      }
      localStorage.setItem('skripsi_favorites', JSON.stringify(baru))

      // Tampilkan toast
      if (window.Toast) {
        if (idx === -1) {
          window.Toast.show('Ditambahkan ke favorit', 'success')
        } else {
          window.Toast.show('Dihapus dari favorit', 'info')
        }
      }
      return baru
    })
  }

  function handleToggleTheme() {
    var next = theme === 'dark' ? 'light' : 'dark'
    if (window.Theme) {
      window.Theme.set(next)
    } else {
      localStorage.setItem('skripsi_theme', next)
      document.documentElement.classList.toggle('dark', next === 'dark')
    }
    setTheme(next)
    if (window.Toast) {
      window.Toast.show('Tema ' + (next === 'dark' ? 'gelap' : 'terang') + ' diterapkan', 'info')
    }
  }

  // Dengarkan event themechange dari theme.js
  useEffect(function () {
    function handler(e) {
      setTheme(e.detail)
    }
    window.addEventListener('themechange', handler)
    return function () { window.removeEventListener('themechange', handler) }
  }, [])

  useEffect(() => {
    setLoading(true)
    api.ambilDataPublik().then(({ bahan, resep }) => {
      setDataBahan(bahan || [])
      setDataResep(resep || [])
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const tokenTersimpan = ambilTokenTersimpan()

    if (!tokenTersimpan) return

    let aktif = true

    api.cekSession(tokenTersimpan)
      .then(({ session: sessionValid }) => {
        if (!aktif) return
        setToken(sessionValid.token)
        setSession(sessionValid)
        setUserRole(sessionValid.user.role)
      })
      .catch(() => {
        hapusToken()
        if (aktif) setSession(null)
      })

    return () => { aktif = false }
  }, [])

  async function initData() {
    const { bahan, resep } = await api.ambilDataPublik()
    setDataBahan(bahan || [])
    setDataResep(resep || [])
  }

  async function ambilBahanTertunda(tokenAktif = token) {
    const { bahan } = await api.ambilBahanTertunda(tokenAktif)
    setBahanTertunda(bahan || [])
  }

  useEffect(() => {
    if (!showLoginDropdown) return

    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowLoginDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showLoginDropdown])

  useEffect(() => {
    if (!session) return

    let aktif = true

    api.ambilDataPublik().then(({ bahan, resep }) => {
      if (!aktif) return
      setDataBahan(bahan || [])
      setDataResep(resep || [])
    })

    return () => { aktif = false }
  }, [session])

  useEffect(() => {
    localStorage.setItem('skripsi_kulkas', JSON.stringify(kulkasUser))
  }, [kulkasUser])

  useEffect(() => {
    if (!session || !token || userRole !== 'admin') return

    let aktif = true

    api.ambilBahanTertunda(token).then(({ bahan }) => {
      if (aktif) setBahanTertunda(bahan || [])
    })

    return () => { aktif = false }
  }, [session, token, userRole])

  function hitungJaccard(bahanUser, bahanResep) {
    const setA = new Set(bahanUser)
    const setB = new Set(bahanResep)
    const irisan = new Set([...setA].filter((x) => setB.has(x)))
    const gabungan = new Set([...setA, ...setB])
    return gabungan.size === 0 ? 0 : irisan.size / gabungan.size
  }

  const hasilRekomendasi = useMemo(() => {
    if (dataResep.length === 0) return []

    const hasil = dataResep.map((resep) => {
      const idBahanResep = resep.recipe_ingredients.map((ri) => ri.ingredient_id)
      const skor = hitungJaccard(kulkasUser, idBahanResep)

      const kategoriBahan = resep.recipe_ingredients
        ?.map((ri) => ri.kategori)
        .filter(Boolean) || []
      const kategoriUnik = [...new Set(kategoriBahan)]
      const kategori = kategoriUnik.length > 0 ? kategoriUnik.join(', ') : 'Makanan'

      return {
        id: resep.id,
        judul: resep.judul_resep,
        langkah: resep.langkah_memasak,
        persentase: Math.round(skor * 100),
        kategori,
        durasi: null,
        jumlahBahan: resep.recipe_ingredients?.length || 0,
        bahan: resep.recipe_ingredients || [],
        porsi: resep.porsi_default,
      }
    })

    hasil.sort((a, b) => b.persentase - a.persentase)
    return hasil.filter((resep) => resep.persentase > 0)
  }, [kulkasUser, dataResep])

  const hasilFilter = useMemo(() => {
    if (!searchQuery.trim()) return hasilRekomendasi
    const q = searchQuery.toLowerCase()
    return hasilRekomendasi.filter((resep) => {
      const namaMatch = resep.judul.toLowerCase().includes(q)
      const kategoriMatch = resep.kategori.toLowerCase().includes(q)
      const bahanMatch = resep.bahan.some((b) =>
        b.nama_bahan?.toLowerCase().includes(q)
      )
      return namaMatch || kategoriMatch || bahanMatch
    })
  }, [searchQuery, hasilRekomendasi])

  const handleUbahLangkah = (index, value) => {
    const listLangkahBaru = [...langkahResep]
    listLangkahBaru[index].instruksi = value
    setLangkahResep(listLangkahBaru)
  }

  const handleTambahInputLangkah = () => {
    setLangkahResep([...langkahResep, { instruksi: '' }])
  }

  const handleCheckboxBahanResep = (idBahan) => {
    bahanResepDipilih.includes(idBahan)
      ? setBahanResepDipilih(bahanResepDipilih.filter((id) => id !== idBahan))
      : setBahanResepDipilih([...bahanResepDipilih, idBahan])
  }

  const handleTambahResepBaru = async (e) => {
    e.preventDefault()
    if (isSubmittingResep) return

    setPesanResep('')

    if (!judulResep.trim() || bahanResepDipilih.length === 0) {
      setPesanResep('Gagal: Judul resep dan minimal 1 bahan wajib diisi!')
      return
    }

    setIsSubmittingResep(true)

    try {
      const langkahValid = langkahResep.filter((l) => l.instruksi.trim() !== '')

      await api.tambahResep(token, {
        judul_resep: judulResep.trim(),
        porsi_default: porsiDefault,
        langkah_memasak: langkahValid,
        ingredient_ids: bahanResepDipilih,
      })

      setPesanResep('Sukses! Resep baru berhasil diterbitkan ke sistem.')
      setJudulResep('')
      setLangkahResep([{ instruksi: '' }])
      setBahanResepDipilih([])
      await initData()
    } catch (error) {
      setPesanResep('Error input resep: ' + error.message)
    } finally {
      setIsSubmittingResep(false)
    }
  }

  const handleTambahBahanBaru = async (e) => {
    e.preventDefault()
    if (isSubmittingBahan) return

    setPesanStatus('')
    if (!inputNamaBahan.trim()) return

    setIsSubmittingBahan(true)

    try {
      await api.tambahBahan(token, {
        nama_bahan: inputNamaBahan.trim(),
        kategori: inputKategori,
      })

      setPesanStatus('Sukses mengusulkan bahan baru!')
      setInputNamaBahan('')
      if (userRole === 'admin') await ambilBahanTertunda()
    } catch (error) {
      setPesanStatus(error.message)
    } finally {
      setIsSubmittingBahan(false)
    }
  }

  const handleAuth = async (tipe) => {
    if (isSubmittingAuth) return

    setPesanStatus('')
    setIsSubmittingAuth(true)

    try {
      if (tipe === 'daftar') {
        await api.daftar(email, password)
        setPesanStatus('Pendaftaran berhasil! Silakan coba login.')
        return
      }

      const { session: sessionBaru } = await api.login(email, password)
      simpanToken(sessionBaru.token)
      setToken(sessionBaru.token)
      setSession(sessionBaru)
      setUserRole(sessionBaru.user.role)
      setPesanStatus('Login sukses!')
    } catch (error) {
      setPesanStatus('Gagal: ' + error.message)
    } finally {
      setIsSubmittingAuth(false)
    }
  }

  const handleSetujuiBahan = async (idBahan) => {
    setPesanStatus('')
    try {
      await api.setujuiBahan(token, idBahan)
      await initData()
      await ambilBahanTertunda()
      setPesanStatus('Sukses menyetujui bahan!')
    } catch (error) {
      setPesanStatus(error.message)
    }
  }

  const handleLogout = () => {
    hapusToken()
    setToken('')
    setSession(null)
    setEmail('')
    setPassword('')
    setPesanStatus('')
    setKulkasUser([])
    setUserRole('user')
  }

  const handleCheckboxChange = (idBahan) => {
    kulkasUser.includes(idBahan)
      ? setKulkasUser(kulkasUser.filter((id) => id !== idBahan))
      : setKulkasUser([...kulkasUser, idBahan])
  }

  // Tombol dark mode
  const themeBtn = (
    <button
      onClick={handleToggleTheme}
      className="leading-none hover:scale-110 transition-transform duration-200"
      aria-label="Toggle tema"
    >
      {theme === 'dark' ? ICON_SUN : ICON_MOON}
    </button>
  )

  // Navigasi umum
  const navLinks = (
    <div className="flex items-center gap-3">
      {themeBtn}
      <a
        href="/favorite.html"
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition"
      >
        Favorit
      </a>
      <a
        href="/history.html"
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition"
      >
        Riwayat
      </a>
    </div>
  )

  // Rekomendasi section
  const rekomendasiSection = (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Rekomendasi Menu Masakan</h3>

      {kulkasUser.length > 0 && (
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Cari resep..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl
                       outline-none focus:ring-2 focus:ring-orange-500 text-sm
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
          />
        </div>
      )}

      {kulkasUser.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
          <p className="text-5xl mb-4">{'\uD83C\uDF73'}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Belum ada rekomendasi.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Silakan pilih bahan terlebih dahulu.
          </p>
        </div>
      )}

      {/* Loading skeleton */}
      {kulkasUser.length > 0 && loading && (
        <div className="text-center py-4">
          <div className="flex items-center justify-center gap-2 text-gray-400 dark:text-gray-500 text-sm mb-4">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Mencari rekomendasi...</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(function (i) { return <SkeletonCard key={i} /> })}
          </div>
        </div>
      )}

      {/* Grid resep */}
      {kulkasUser.length > 0 && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hasilFilter.map((resep, index) => (
            <CardResep
              key={resep.id}
              resep={resep}
              index={index}
              isFavorit={favoritIds.indexOf(Number(resep.id)) !== -1}
              onToggleFavorit={handleToggleFavorit}
            />
          ))}
        </div>
      )}

      {kulkasUser.length > 0 && !loading && hasilFilter.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Resep tidak ditemukan.</p>
        </div>
      )}
    </div>
  )

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 theme-transition">
        <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Buku Resep Pintar</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pilih bahan di kulkas, dapatkan rekomendasi masakan</p>
            </div>
            <div className="flex items-center gap-4">
              {navLinks}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm"
                >
                  Masuk / Daftar
                </button>
                {showLoginDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-5 z-50">
                    <div className="space-y-3">
                      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAuth('login')}
                          disabled={isSubmittingAuth}
                          className="flex-1 bg-orange-500 disabled:bg-orange-300 text-white p-2.5 rounded-xl font-semibold text-sm transition"
                        >
                          {isSubmittingAuth ? 'Memproses...' : 'Masuk'}
                        </button>
                        <button
                          onClick={() => handleAuth('daftar')}
                          disabled={isSubmittingAuth}
                          className="flex-1 bg-gray-200 dark:bg-gray-600 disabled:bg-gray-100 text-gray-700 dark:text-gray-300 disabled:text-gray-400 p-2.5 rounded-xl font-semibold text-sm transition"
                        >
                          {isSubmittingAuth ? 'Memproses...' : 'Daftar'}
                        </button>
                      </div>
                    </div>
                    {pesanStatus && <p className="text-center mt-3 text-sm text-red-500">{pesanStatus}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 mt-8 space-y-8 pb-12">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">Isi Kulkas Anda</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">Pilih bahan yang tersedia di kulkas Anda</p>
            <div className="flex flex-wrap gap-2">
              {dataBahan.map((bahan) => (
                <label key={bahan.id} className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium cursor-pointer transition ${kulkasUser.includes(bahan.id) ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'}`}>
                  <input type="checkbox" checked={kulkasUser.includes(bahan.id)} onChange={() => handleCheckboxChange(bahan.id)} className="hidden" />
                  {bahan.nama_bahan}
                </label>
              ))}
            </div>
          </div>

          {rekomendasiSection}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 pb-12 theme-transition">
      <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4 flex justify-between items-center max-w-5xl mx-auto rounded-b-xl shadow-sm">
        <div>
          <h1 className="text-xl font-bold dark:text-gray-100">Buku Resep Pintar</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">User: {session.user.email} <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold rounded capitalize">{userRole}</span></p>
        </div>
        <div className="flex items-center gap-4">
          {navLinks}
          <button onClick={handleLogout} className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm transition font-medium">Keluar</button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        {userRole === 'admin' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">Panel Moderasi Admin: Peninjauan Bahan Baru</h3>
            {bahanTertunda.length === 0 ? <p className="text-sm text-blue-600 dark:text-blue-400 italic">Tidak ada usulan bahan.</p> : (
              <div className="space-y-2">{bahanTertunda.map((b) => (
                <div key={b.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-xl border border-blue-100 dark:border-blue-800 shadow-xs">
                  <div><span className="font-semibold dark:text-gray-100">{b.nama_bahan}</span><span className="ml-2 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500 dark:text-gray-400">{b.kategori}</span></div>
                  <button onClick={() => handleSetujuiBahan(b.id)} className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg">Setujui</button>
                </div>
              ))}</div>
            )}
            {pesanStatus && (
              <p className={`mt-3 font-semibold text-center text-sm ${pesanStatus.includes('Sukses') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {pesanStatus}
              </p>
            )}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Bagikan Resep Masakan Anda</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Tulis instruksi memasak secara detail agar sistem bisa merekomendasikannya.</p>

          <form onSubmit={handleTambahResepBaru} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Nama Menu Masakan</label>
                <input type="text" placeholder="Contoh: Nasi Goreng Kampung, Sup Ayam" value={judulResep} onChange={(e) => setJudulResep(e.target.value)} className="w-full p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Estimasi Porsi</label>
                <input type="number" min="1" value={porsiDefault} onChange={(e) => setPorsiDefault(e.target.value)} className="w-full p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Pilih Bahan Baku yang Digunakan:</label>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto border dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                {dataBahan.map((bahan) => (
                  <label key={bahan.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition ${bahanResepDipilih.includes(bahan.id) ? 'bg-orange-100 dark:bg-orange-900/40 border-orange-400 dark:border-orange-600 text-orange-700 dark:text-orange-300' : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300 border-transparent'}`}>
                    <input type="checkbox" checked={bahanResepDipilih.includes(bahan.id)} onChange={() => handleCheckboxBahanResep(bahan.id)} className="hidden" />
                    {bahan.nama_bahan}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Langkah Demi Langkah Memasak:</label>
              {langkahResep.map((langkah, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0">{index + 1}</span>
                  <input type="text" placeholder={`Langkah ke-${index + 1}...`} value={langkah.instruksi} onChange={(e) => handleUbahLangkah(index, e.target.value)} className="flex-1 p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm" />
                </div>
              ))}
              <button type="button" onClick={handleTambahInputLangkah} className="text-orange-600 dark:text-orange-400 hover:text-orange-700 font-bold text-sm flex items-center gap-1 pt-1 transition">
                + Tambah Langkah Memasak
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmittingResep}
              className="w-full bg-orange-500 disabled:bg-orange-300 hover:bg-orange-600 text-white font-bold p-3.5 rounded-xl transition shadow-sm"
            >
              {isSubmittingResep ? 'Sedang Menerbitkan...' : 'Terbitkan Buku Resep'}
            </button>
          </form>
          {pesanResep && <p className={`mt-3 font-semibold text-center text-sm ${pesanResep.includes('Sukses') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{pesanResep}</p>}
        </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2">Punya Bahan Unik?</h3>
            <form onSubmit={handleTambahBahanBaru} className="flex flex-wrap gap-3 items-center">
              <input type="text" placeholder="Daun Kelor, Jamur..." value={inputNamaBahan} onChange={(e) => setInputNamaBahan(e.target.value)} className="flex-1 min-w-[200px] p-3 bg-white dark:bg-gray-700 border border-amber-300 dark:border-amber-700 rounded-xl outline-none text-sm text-gray-900 dark:text-gray-100" />
              <select value={inputKategori} onChange={(e) => setInputKategori(e.target.value)} className="p-3 bg-white dark:bg-gray-700 border border-amber-300 dark:border-amber-700 rounded-xl text-sm text-gray-900 dark:text-gray-100">
                <option value="Sayuran">Sayuran</option><option value="Protein">Protein</option><option value="Bumbu">Bumbu</option>
              </select>
              <button
                type="submit"
                disabled={isSubmittingBahan}
                className="bg-amber-500 disabled:bg-amber-300 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-sm transition"
              >
                {isSubmittingBahan ? 'Mengirim...' : 'Usulkan'}
              </button>
            </form>
            {pesanStatus && (
              <p className={`mt-3 font-semibold text-center text-sm ${pesanStatus.includes('Sukses') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {pesanStatus}
              </p>
            )}
          </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">Isi Kulkas Anda</h3>
          <div className="flex flex-wrap gap-2 mt-4">
            {dataBahan.map((bahan) => (
              <label key={bahan.id} className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium cursor-pointer transition ${kulkasUser.includes(bahan.id) ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'}`}>
                <input type="checkbox" checked={kulkasUser.includes(bahan.id)} onChange={() => handleCheckboxChange(bahan.id)} className="hidden" />
                {bahan.nama_bahan}
              </label>
            ))}
          </div>
        </div>

        {rekomendasiSection}
      </main>
    </div>
  )
}

export default App
