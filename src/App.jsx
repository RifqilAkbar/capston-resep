import { useEffect, useMemo, useRef, useState } from 'react'
import { ambilTokenTersimpan, api, hapusToken, simpanToken } from './api'
import { kategoriNusantara, KATEGORI_DAERAH, adalahBumbu } from './kategoriNusantara'
import { CardResep, SkeletonCard } from './components/CardResep'
import { MusicPlayer } from './components/MusicPlayer'
import { SearchBar } from './components/SearchBar'
import Beranda from './views/Beranda'
import DetailResep from './views/DetailResep'
import Favorit from './views/Favorit'
import Riwayat from './views/Riwayat'
import Trending from './views/Trending'
import './index.css'

// Fungsi tema untuk React — baca dari window.Theme jika tersedia
function getTheme() {
  if (window.Theme) return window.Theme.get()
  return localStorage.getItem('skripsi_theme') || 'light'
}

const ICON_MOON = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
)
const ICON_SUN = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
)

// Ikon Font Awesome untuk chip bahan berdasarkan kategori
function ikonBahan(kategori) {
  const k = (kategori || '').toLowerCase()
  if (k.includes('sayur')) return 'fa-leaf'
  if (k.includes('protein')) return 'fa-drumstick-bite'
  if (k.includes('bumbu')) return 'fa-mortar-pestle'
  return 'fa-bowl-food'
}

// Terjemahkan hash ke rute aplikasi: #/ , #/resep , #/resep/:id , #/favorit , #/riwayat , #/trending
function parseHash() {
  const path = window.location.hash.replace(/^#/, '').split('/').filter(Boolean)
  if (!path.length) return { view: 'beranda' }
  if (path[0] === 'resep') return path[1] ? { view: 'detail', id: path[1] } : { view: 'resep' }
  if (path[0] === 'favorit') return { view: 'favorit' }
  if (path[0] === 'riwayat') return { view: 'riwayat' }
  if (path[0] === 'trending') return { view: 'trending' }
  return { view: 'beranda' }
}

function App() {
  const [session, setSession] = useState(null)
  const [token, setToken] = useState('')
  const [userRole, setUserRole] = useState('user')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false)
  const [pesanStatus, setPesanStatus] = useState('')

  const [dataBahan, setDataBahan] = useState([])
  const [dataResep, setDataResep] = useState([])
  const [loading, setLoading] = useState(true)

  const [kulkasUser, setKulkasUser] = useState(function () {
    try {
      return JSON.parse(localStorage.getItem('skripsi_kulkas') || '[]')
    } catch {
      return []
    }
  })

  const [searchQuery, setSearchQuery] = useState(function () {
    return new URLSearchParams(window.location.search).get('q') || sessionStorage.getItem('skripsi_cari') || ''
  })
  const [kategoriAktif, setKategoriAktif] = useState(function () {
    return sessionStorage.getItem('skripsi_kategori') || 'Semua'
  })
  const [route, setRoute] = useState(parseHash)
  const [theme, setTheme] = useState(getTheme)

  const [favoritIds, setFavoritIds] = useState(function () {
    try {
      return JSON.parse(localStorage.getItem('skripsi_favorites') || '[]')
    } catch {
      return []
    }
  })

  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [bagianBuka, setBagianBuka] = useState('resep')
  const dropdownRef = useRef(null)
  const searchQueryRef = useRef(searchQuery)

  function handleToggleFavorit(id) {
    const numId = Number(id)
    setFavoritIds(function (prev) {
      const idx = prev.indexOf(numId)
      let baru
      if (idx === -1) {
        baru = prev.concat([numId])
      } else {
        baru = prev.slice()
        baru.splice(idx, 1)
      }
      localStorage.setItem('skripsi_favorites', JSON.stringify(baru))
      if (window.Toast) {
        window.Toast.show(idx === -1 ? 'Ditambahkan ke favorit' : 'Dihapus dari favorit', idx === -1 ? 'success' : 'info')
      }
      return baru
    })
  }

  function handleToggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
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

  const handleCheckboxChange = (idBahan) => {
    setKulkasUser((prev) => prev.includes(idBahan) ? prev.filter((id) => id !== idBahan) : [...prev, idBahan])
  }

  const handlePilihKategori = (nama) => {
    setKategoriAktif(nama)
    window.location.hash = '#/resep'
  }

  const handleHapusFilter = () => {
    setKategoriAktif('Semua')
    setSearchQuery('')
  }

  const handleTambahBahanKlik = () => {
    if (!session) {
      setShowLoginDropdown(true)
      return
    }
    setBagianBuka('bahan')
    window.location.hash = '#/'
    setTimeout(() => document.getElementById('tambah-bahan')?.scrollIntoView({ behavior: 'smooth' }), 250)
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

  async function initData() {
    try {
      const { bahan, resep } = await api.ambilDataPublik()
      setDataBahan(bahan || [])
      setDataResep(resep || [])
    } catch { /* biarkan data lama */ }
  }

  // ===== Effects =====

  // Dengarkan navigasi hash agar setiap rute menjadi halaman terpisah.
  useEffect(() => {
    function onHashChange() {
      const r = parseHash()
      setRoute(r)
      if (searchQueryRef.current.trim() && r.view === 'resep') {
        setTimeout(() => document.getElementById('resep')?.scrollIntoView({ behavior: 'smooth' }), 150)
      } else {
        window.scrollTo(0, 0)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Dengarkan event themechange dari theme.js
  useEffect(() => {
    function handler(e) {
      setTheme(e.detail)
    }
    window.addEventListener('themechange', handler)
    return () => window.removeEventListener('themechange', handler)
  }, [])

  // Tambahkan shadow halus saat halaman di-scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { searchQueryRef.current = searchQuery }, [searchQuery])
  useEffect(() => { sessionStorage.setItem('skripsi_cari', searchQuery) }, [searchQuery])
  useEffect(() => { sessionStorage.setItem('skripsi_kategori', kategoriAktif) }, [kategoriAktif])

  // Baca kata kunci pencarian dari URL (?q=...) lalu bersihkan parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params.get('q')) return
    params.delete('q')
    const url = window.location.pathname + (params.toString() ? '?' + params.toString() : '')
    window.history.replaceState({}, '', url)
  }, [])

  // Muat data publik (bahan + resep) satu kali saat aplikasi dibuka
  useEffect(() => {
    let aktif = true
    api.ambilDataPublik().then(({ bahan, resep }) => {
      if (!aktif) return
      setDataBahan(bahan || [])
      setDataResep(resep || [])
      setLoading(false)
    }).catch(() => {
      if (aktif) setLoading(false)
    })
    return () => { aktif = false }
  }, [])

  // Pulihkan sesi dari token yang tersimpan
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

  // Muat ulang data saat login agar daftar bahan terbaru (mis. admin)
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

  // Simpan isi kulkas ke localStorage
  useEffect(() => {
    localStorage.setItem('skripsi_kulkas', JSON.stringify(kulkasUser))
  }, [kulkasUser])

  // Tutup dropdown login saat klik di luar
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

  // ===== Logika rekomendasi =====

  function hitungJaccard(bahanUser, bahanResep) {
    const setA = new Set(bahanUser)
    const setB = new Set(bahanResep)
    const irisan = new Set([...setA].filter((x) => setB.has(x)))
    const gabungan = new Set([...setA, ...setB])
    return gabungan.size === 0 ? 0 : irisan.size / gabungan.size
  }

  // Semua resep dihitung skor kecocokannya terhadap isi kulkas.
  const resepLengkap = useMemo(() => {
    return dataResep.map((resep) => {
      const idBahanResep = (resep.recipe_ingredients || []).map((ri) => ri.ingredient_id)
      const skor = hitungJaccard(kulkasUser, idBahanResep)

      return {
        id: resep.id,
        judul: resep.judul_resep,
        langkah: resep.langkah_memasak,
        kategori: kategoriNusantara(resep.judul_resep),
        persentase: Math.round(skor * 100),
        jumlahBahan: resep.recipe_ingredients?.length || 0,
        bahan: resep.recipe_ingredients || [],
        porsi: resep.porsi_default,
      }
    })
  }, [kulkasUser, dataResep])

  // Mode jelajah aktif saat pengguna mencari atau memilih kategori. Saat mode
  // jelajah aktif, semua resep yang cocok ditampilkan; filter kulkas (persentase > 0)
  // hanya berlaku di mode rekomendasi murni.
  const modeJelajah = searchQuery.trim() !== '' || kategoriAktif !== 'Semua'

  const hasilFilter = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return resepLengkap
      .filter((resep) => kategoriAktif === 'Semua' || resep.kategori === kategoriAktif)
      .filter((resep) => !q ||
        resep.judul.toLowerCase().includes(q) ||
        resep.kategori.toLowerCase().includes(q) ||
        resep.bahan.some((b) => b.nama_bahan?.toLowerCase().includes(q)))
      // Kecocokan bahan: hanya mode rekomendasi murni yang menyaring resep
      // berdasarkan isi kulkas, agar pencarian/kategori selalu menampilkan hasil.
      .filter((resep) => modeJelajah || kulkasUser.length === 0 || resep.persentase > 0)
      .sort((a, b) => b.persentase - a.persentase)
  }, [resepLengkap, kategoriAktif, searchQuery, kulkasUser, modeJelajah])

  // Daftar daerah filter: Semua + 7 daerah Nusantara (konsisten dengan Beranda).
  const daftarDaerah = KATEGORI_DAERAH.map((d) => d.nama)

  // Pembagian bahan untuk tampilan (tidak mengubah logika pencarian).
  const bahanUmum = useMemo(() => dataBahan.filter((b) => !adalahBumbu(b)), [dataBahan])
  const bahanBumbu = useMemo(() => dataBahan.filter((b) => adalahBumbu(b)), [dataBahan])

  // ===== Chrome (navbar + footer) =====

  const themeBtn = (
    <button onClick={handleToggleTheme} className="theme-btn" aria-label="Toggle tema">
      {theme === 'dark' ? ICON_SUN : ICON_MOON}
    </button>
  )

  const isPageActive = (href) => {
    const target = href.replace(/^#\//, '')
    if (target === '') return route.view === 'beranda'
    if (target === 'resep') return route.view === 'resep' || route.view === 'detail'
    return route.view === target
  }
  const navItem = (href, icon, label) => (
    <a href={href} onClick={() => setMobileOpen(false)} className={`nav-link ${isPageActive(href) ? 'active' : ''}`}>
      <i className={`fa-solid ${icon}`} />
      <span>{label}</span>
    </a>
  )

  const desktopNav = (
    <nav className="hidden lg:flex items-center gap-1 mx-auto">
      {navItem('#/', 'fa-house', 'Beranda')}
      {navItem('#/resep', 'fa-book-open', 'Resep')}
      {navItem('#/favorit', 'fa-heart', 'Favorit')}
      {navItem('#/riwayat', 'fa-clock-rotate-left', 'Riwayat')}
    </nav>
  )

  const navbarSearch = (
    <div className="hidden md:block w-48 lg:w-64 shrink-0">
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Cari Gudeg, Rawon, Soto Betawi..."
        onEnter={() => { if (route.view !== 'resep') window.location.hash = '#/resep' }}
      />
    </div>
  )

  const mobileNav = (
    <div className={`mobile-menu lg:hidden ${mobileOpen ? 'open' : ''}`}>
      <nav className="px-4 pb-4 pt-2 flex flex-col gap-1">
        {navItem('#/', 'fa-house', 'Beranda')}
        {navItem('#/resep', 'fa-book-open', 'Resep')}
        {navItem('#/favorit', 'fa-heart', 'Favorit')}
        {navItem('#/riwayat', 'fa-clock-rotate-left', 'Riwayat')}
        <div className="mt-2">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari Gudeg, Rawon, Soto Betawi..."
            onEnter={() => { if (route.view !== 'resep') window.location.hash = '#/resep' }}
          />
        </div>
      </nav>
    </div>
  )

  const loginArea = session ? (
    <div className="flex items-center gap-2">
      <div className="hidden sm:block text-right leading-tight">
        <p className="text-xs font-bold text-gray-800 dark:text-gray-100">{session.user.email}</p>
        <span className="text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold rounded capitalize">{userRole}</span>
      </div>
      <button onClick={handleLogout} className="btn-outline-danger">
        <i className="fa-solid fa-right-from-bracket" />
        <span className="hidden sm:inline">Keluar</span>
      </button>
    </div>
  ) : (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setShowLoginDropdown(!showLoginDropdown)} className="btn-primary">
        <i className="fa-solid fa-right-to-bracket" />
        <span className="hidden sm:inline">Masuk / Daftar</span>
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
  )

  const navbar = (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between gap-4 h-16 lg:h-20">
          <a href="#/" className="flex items-center gap-2.5 shrink-0 group">
            <span className="logo-badge"><i className="fa-solid fa-utensils" /></span>
            <span className="leading-tight">
              <span className="block text-lg font-extrabold text-gray-900 dark:text-gray-100">Buku Resep <span className="text-[#ff6b00]">Pintar</span></span>
              <span className="hidden sm:block text-[11px] text-gray-500 dark:text-gray-400">Temukan resep dari bahan di kulkas Anda</span>
            </span>
          </a>

          {desktopNav}
          {navbarSearch}

          <div className="flex items-center gap-2 shrink-0">
            {themeBtn}
            {loginArea}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="menu-btn lg:hidden"
              aria-label="Menu"
            >
              <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`} />
            </button>
          </div>
        </div>
      </div>
      {mobileNav}
    </header>
  )

  const footerSection = (
    <footer className="site-footer reveal">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-badge"><i className="fa-solid fa-utensils" /></span>
              <span className="footer-logo-text">Buku Resep <span className="text-[#ff6b00]">Pintar</span></span>
            </div>
            <p className="footer-desc">Buku Resep Pintar membantu Anda menemukan resep terbaik dari bahan yang tersedia.</p>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Menu</h4>
            <ul className="footer-links">
              <li><a href="#/">Beranda</a></li>
              <li><a href="#/resep">Resep</a></li>
              <li><a href="#/favorit">Favorit</a></li>
              <li><a href="#/riwayat">Riwayat</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Kontak</h4>
            <ul className="footer-links">
              <li><a href="mailto:halo@bukureseppintar.com"><i className="fa-solid fa-envelope" />halo@bukureseppintar.com</a></li>
              <li><a href="https://instagram.com/bukuresep.pintar" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram" />@bukuresep.pintar</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-github" />github.com/bukuresep</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Buku Resep Pintar. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  )

  // ===== Halaman Resep =====

  const pillKategori = (nama) => (
    <button
      type="button"
      onClick={() => setKategoriAktif(nama)}
      className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${kategoriAktif === nama ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-orange-400'}`}
    >
      {nama}
    </button>
  )

  const kulkasSection = (
    <div id="kulkas" className="kulkas-section reveal">
      <div className="kulkas-header">
        <div className="kulkas-title-wrap">
          <span className="kulkas-icon"><i className="fa-solid fa-kitchen-set" /></span>
          <div>
            <h3 className="kulkas-title">Isi Kulkas Anda</h3>
            <p className="kulkas-subtitle">Pilih semua bahan yang tersedia di rumah.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {kulkasUser.length > 0 && (
            <span className="px-3 py-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-bold rounded-full flex items-center gap-1.5">
              <i className="fa-solid fa-kitchen-set" /> {kulkasUser.length} dipilih
            </span>
          )}
          {kulkasUser.length > 0 && (
            <button type="button" onClick={() => setKulkasUser([])} className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-red-500 transition flex items-center gap-1">
              <i className="fa-solid fa-broom" /> Bersihkan
            </button>
          )}
          <button type="button" className="btn-primary" onClick={handleTambahBahanKlik}>
            <i className="fa-solid fa-plus" />
            Tambah Bahan
          </button>
        </div>
      </div>
      <div className="kulkas-group">
        <h4 className="kulkas-group-title"><span>🥬</span> Bahan Umum</h4>
        <div className="kulkas-grid">
          {bahanUmum.map((bahan) => (
            <label key={bahan.id} className={`kulkas-chip ${kulkasUser.includes(bahan.id) ? 'selected' : ''}`}>
              <input type="checkbox" checked={kulkasUser.includes(bahan.id)} onChange={() => handleCheckboxChange(bahan.id)} className="hidden" />
              <i className={`fa-solid ${ikonBahan(bahan.kategori)}`} />
              {bahan.nama_bahan}
            </label>
          ))}
        </div>
      </div>
      <div className="kulkas-group">
        <h4 className="kulkas-group-title"><span>🌿</span> Bumbu &amp; Rempah Nusantara</h4>
        <div className="kulkas-grid">
          {bahanBumbu.map((bahan) => (
            <label key={bahan.id} className={`kulkas-chip ${kulkasUser.includes(bahan.id) ? 'selected' : ''}`}>
              <input type="checkbox" checked={kulkasUser.includes(bahan.id)} onChange={() => handleCheckboxChange(bahan.id)} className="hidden" />
              <i className={`fa-solid ${ikonBahan(bahan.kategori)}`} />
              {bahan.nama_bahan}
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  const autoFocusSearch = typeof window !== 'undefined' && window.innerWidth >= 768

  const resepPage = (
    <main className="max-w-5xl mx-auto px-4 mt-10 space-y-8 pb-16">
      <div>
        <span className="section-kicker"><i className="fa-solid fa-book-open" />Resep Nusantara</span>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Jelajahi Kuliner Nusantara</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pilih bahan yang tersedia untuk menemukan resep makanan khas Indonesia yang dapat Anda masak.</p>
      </div>

      {kulkasUser.length === 0 && (
        <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <i className="fa-solid fa-lightbulb text-blue-500 dark:text-blue-300 mt-0.5" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Pilih bahan dari <strong>"Isi Kulkas Anda"</strong> di bawah untuk melihat resep yang paling cocok dengan stok di rumah.
          </p>
        </div>
      )}

      {kulkasSection}

      {/* Filter sticky: kategori + pencarian */}
      <div className="sticky top-16 lg:top-20 z-30 -mx-4 px-4 py-3 bg-[#fff8f2]/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-2 flex-1 min-w-0">
            {['Semua', ...daftarDaerah].map((nama) => pillKategori(nama))}
          </div>
          <div className="w-full md:w-64 shrink-0">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              autoFocus={autoFocusSearch}
              placeholder={kategoriAktif !== 'Semua' ? `Cari dalam "${kategoriAktif}"...` : 'Cari Gudeg, Rawon, Soto Betawi...'}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4" id="resep">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : hasilFilter.length > 0 ? (
          <>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {modeJelajah
                  ? `${hasilFilter.length} resep ditemukan`
                  : kulkasUser.length > 0
                    ? `${hasilFilter.length} resep cocok dengan bahan kulkas Anda`
                    : `${hasilFilter.length} resep tersedia`}
              </p>
              {(kategoriAktif !== 'Semua' || searchQuery.trim() !== '') && (
                <button type="button" onClick={handleHapusFilter} className="text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1">
                  <i className="fa-solid fa-xmark" /> Hapus filter
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
          </>
        ) : (
          <div className="text-center py-12">
            <svg className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              {modeJelajah
                ? 'Resep tidak ditemukan. Coba kata kunci atau kategori lain.'
                : kulkasUser.length > 0
                  ? 'Tidak ada resep yang memakai bahan di kulkas Anda. Tambahkan bahan lain.'
                  : 'Belum ada resep untuk ditampilkan.'}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {modeJelajah ? (
                <button type="button" onClick={handleHapusFilter} className="btn-primary">
                  <i className="fa-solid fa-rotate-left" /> Hapus pencarian & filter
                </button>
              ) : kulkasUser.length > 0 ? (
                <button type="button" onClick={() => setKulkasUser([])} className="btn-secondary">
                  <i className="fa-solid fa-broom" /> Bersihkan Kulkas
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </main>
  )

  // ===== Rute =====

  let konten
  if (route.view === 'resep') {
    konten = resepPage
  } else if (route.view === 'detail') {
    konten = <DetailResep key={route.id} id={route.id} kulkasUser={kulkasUser} favoritIds={favoritIds} onToggleFavorit={handleToggleFavorit} />
  } else if (route.view === 'favorit') {
    konten = <Favorit semuaResep={resepLengkap} favoritIds={favoritIds} onToggleFavorit={handleToggleFavorit} />
  } else if (route.view === 'riwayat') {
    konten = <Riwayat semuaResep={resepLengkap} favoritIds={favoritIds} onToggleFavorit={handleToggleFavorit} />
  } else if (route.view === 'trending') {
    konten = <Trending semuaResep={resepLengkap} favoritIds={favoritIds} onToggleFavorit={handleToggleFavorit} />
  } else {
    konten = (
      <Beranda
        session={session}
        userRole={userRole}
        token={token}
        dataResep={dataResep}
        dataBahan={dataBahan}
        loading={loading}
        semuaResep={resepLengkap}
        favoritIds={favoritIds}
        onToggleFavorit={handleToggleFavorit}
        onPilihKategori={handlePilihKategori}
        onDataRefresh={initData}
        bagianBuka={bagianBuka}
        setBagianBuka={setBagianBuka}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#fff8f2] dark:bg-gray-900 text-gray-800 dark:text-gray-100 pb-12 theme-transition">
      {navbar}
      {konten}
      {footerSection}
      <MusicPlayer />
    </div>
  )
}

export default App
