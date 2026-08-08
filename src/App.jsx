import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ambilTokenTersimpan, api, hapusToken, simpanToken } from './api'
import { kategoriNusantara, KATEGORI_DAERAH, adalahBumbu } from './kategoriNusantara'
import { CardResep, SkeletonCard } from './components/CardResep'
import { MusicPlayer } from './components/MusicPlayer'
import { SearchBar } from './components/SearchBar'
import { fotoAvatar } from './mock'
import Beranda from './views/Beranda'
import DetailResep from './views/DetailResep'
import Favorit from './views/Favorit'
import Riwayat from './views/Riwayat'
import Trending from './views/Trending'
import Login from './views/Login'
import Register from './views/Register'
import Profil from './views/Profil'
import ResepSaya from './views/ResepSaya'
import TambahResep from './views/TambahResep'
import EditResep from './views/EditResep'
import AdminDashboard from './views/AdminDashboard'
import KelolaResep from './views/KelolaResep'
import KelolaUser from './views/KelolaUser'
import './index.css'

// Fungsi tema untuk React — baca dari window.Theme jika tersedia
function getTheme() {
  if (window.Theme) return window.Theme.get()
  return localStorage.getItem('skripsi_theme') || 'light'
}

function bacaFavoritLokal() {
  try {
    return JSON.parse(localStorage.getItem('skripsi_favorites') || '[]')
  } catch {
    return []
  }
}

const ICON_MOON = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
)
const ICON_SUN = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /><path d="m6.34 6.34 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /></svg>
)

// Ikon Font Awesome untuk chip bahan berdasarkan kategori
function ikonBahan(kategori) {
  const k = (kategori || '').toLowerCase()
  if (k.includes('sayur')) return 'fa-leaf'
  if (k.includes('protein')) return 'fa-drumstick-bite'
  if (k.includes('bumbu')) return 'fa-mortar-pestle'
  return 'fa-bowl-food'
}

// Terjemahkan hash ke rute aplikasi.
function parseHash() {
  const path = window.location.hash.replace(/^#/, '').split('/').filter(Boolean)
  if (!path.length) return { view: 'beranda' }
  if (path[0] === 'resep') return path[1] ? { view: 'detail', id: path[1] } : { view: 'resep' }
  if (path[0] === 'edit-resep') return path[1] ? { view: 'edit-resep', id: path[1] } : { view: 'edit-resep' }
  return { view: path[0] }
}

const RUTE_USER = ['profil', 'resep-saya', 'tambah-resep', 'edit-resep']
const RUTE_ADMIN = ['dashboard', 'kelola-resep']
const RUTE_SUPERADMIN = ['kelola-user']

function isAdminRole(role) {
  return role === 'admin' || role === 'superadmin'
}

function App() {
  const [session, setSession] = useState(null)
  const [token, setToken] = useState('')
  const [userRole, setUserRole] = useState('user')

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

  const [favoritIds, setFavoritIds] = useState(bacaFavoritLokal)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showAkunDropdown, setShowAkunDropdown] = useState(false)
  const searchQueryRef = useRef(searchQuery)
  const akunDropdownRef = useRef(null)

  async function handleToggleFavorit(id) {
    const numId = Number(id)
    const ada = favoritIds.includes(numId)

    if (session && token) {
      const baru = ada ? favoritIds.filter((x) => x !== numId) : favoritIds.concat([numId])
      setFavoritIds(baru)
      try {
        if (ada) {
          await api.hapusFavorit(token, numId)
        } else {
          await api.tambahFavorit(token, numId)
        }
        if (window.Toast) {
          window.Toast.show(ada ? 'Dihapus dari favorit' : 'Ditambahkan ke favorit', ada ? 'info' : 'success')
        }
      } catch (error) {
        setFavoritIds(favoritIds)
        if (window.Toast) window.Toast.show(error.message, 'error')
      }
      return
    }

    let baru
    if (ada) {
      baru = favoritIds.slice()
      baru.splice(favoritIds.indexOf(numId), 1)
    } else {
      baru = favoritIds.concat([numId])
    }
    setFavoritIds(baru)
    localStorage.setItem('skripsi_favorites', JSON.stringify(baru))
    if (window.Toast) {
      window.Toast.show(ada ? 'Dihapus dari favorit' : 'Ditambahkan ke favorit', ada ? 'info' : 'success')
    }
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
      window.location.hash = '#/login'
      return
    }
    window.location.hash = '#/tambah-resep'
  }

  const onNeedLogin = () => { window.location.hash = '#/login' }

  const handleLogin = (sessionBaru) => {
    simpanToken(sessionBaru.token)
    setToken(sessionBaru.token)
    setSession(sessionBaru)
    setUserRole(sessionBaru.user.role)
    window.location.hash = isAdminRole(sessionBaru.user.role) ? '#/dashboard' : '#/'
  }

  const handleLogout = () => {
    setShowAkunDropdown(false)
    hapusToken()
    setToken('')
    setSession(null)
    setKulkasUser([])
    setUserRole('user')
    setFavoritIds(bacaFavoritLokal())
    window.location.hash = '#/'
  }

  const handleSessionUpdate = (profil) => {
    setSession((prev) => (prev ? { ...prev, user: { ...prev.user, ...profil } } : prev))
  }

  async function initData() {
    try {
      const { bahan, resep } = await api.ambilDataPublik()
      setDataBahan(bahan || [])
      setDataResep(resep || [])
    } catch { /* biarkan data lama */ }
  }

  // ===== Effects =====

  useEffect(() => {
    function onHashChange() {
      const r = parseHash()
      setShowAkunDropdown(false)
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

  useEffect(() => {
    function handler(e) {
      setTheme(e.detail)
    }
    window.addEventListener('themechange', handler)
    return () => window.removeEventListener('themechange', handler)
  }, [])

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

  useEffect(() => {
    if (!showAkunDropdown) return
    function onKlikLuar(e) {
      if (akunDropdownRef.current && !akunDropdownRef.current.contains(e.target)) {
        setShowAkunDropdown(false)
      }
    }
    document.addEventListener('mousedown', onKlikLuar)
    return () => document.removeEventListener('mousedown', onKlikLuar)
  }, [showAkunDropdown])

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

  // Muat ulang data saat login agar daftar resep terbaru (mis. setelah persetujuan admin)
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

  // Sinkronkan favorit dengan server saat login / berubah role
  useEffect(() => {
    if (!session || !token) return
    let aktif = true
    api.ambilFavorit(token)
      .then(({ ids }) => { if (aktif) setFavoritIds(ids || []) })
      .catch(() => {})
    return () => { aktif = false }
  }, [session, token])

  // Simpan isi kulkas ke localStorage
  useEffect(() => {
    localStorage.setItem('skripsi_kulkas', JSON.stringify(kulkasUser))
  }, [kulkasUser])

  // ===== Pengaman rute =====
  useEffect(() => {
    const v = route.view
    if (session) {
      if (v === 'login' || v === 'register') {
        window.location.hash = isAdminRole(userRole) ? '#/dashboard' : '#/'
        return
      }
      if (RUTE_SUPERADMIN.includes(v) && userRole !== 'superadmin') {
        window.location.hash = '#/'
        return
      }
      if (RUTE_ADMIN.includes(v) && !isAdminRole(userRole)) {
        window.location.hash = '#/'
      }
      return
    }
    if (RUTE_USER.includes(v)) {
      window.location.hash = '#/login'
    }
  }, [route.view, session, userRole])

  // ===== Logika rekomendasi =====

  function hitungJaccard(bahanUser, bahanResep) {
    const setA = new Set(bahanUser)
    const setB = new Set(bahanResep)
    const irisan = new Set([...setA].filter((x) => setB.has(x)))
    const gabungan = new Set([...setA, ...setB])
    return gabungan.size === 0 ? 0 : irisan.size / gabungan.size
  }

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
        durasi: resep.durasi_menit,
      }
    })
  }, [kulkasUser, dataResep])

  const modeJelajah = searchQuery.trim() !== '' || kategoriAktif !== 'Semua'

  const hasilFilter = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return resepLengkap
      .filter((resep) => kategoriAktif === 'Semua' || resep.kategori === kategoriAktif)
      .filter((resep) => !q ||
        resep.judul.toLowerCase().includes(q) ||
        resep.kategori.toLowerCase().includes(q) ||
        resep.bahan.some((b) => b.nama_bahan?.toLowerCase().includes(q)))
      .filter((resep) => modeJelajah || kulkasUser.length === 0 || resep.persentase > 0)
      .sort((a, b) => b.persentase - a.persentase)
  }, [resepLengkap, kategoriAktif, searchQuery, kulkasUser, modeJelajah])

  const daftarDaerah = KATEGORI_DAERAH.map((d) => d.nama)

  // Frekuensi pemakaian bahan (jumlah resep approved yang memakainya) — dipakai
  // untuk mengurutkan chip bahan paling populer agar tampil lebih dulu.
  const frekuensiBahan = useMemo(() => {
    const hitung = new Map()
    dataResep.forEach((resep) => {
      ;(resep.recipe_ingredients || []).forEach((ri) => {
        hitung.set(ri.ingredient_id, (hitung.get(ri.ingredient_id) || 0) + 1)
      })
    })
    return hitung
  }, [dataResep])

  // Urutkan menurun berdasarkan frekuensi pakai; skor sama tetap alfabetis
  // (urutan asli dari API sudah alfabetis & Array.sort bersifat stabil).
  const urutPopuler = useCallback(
    (daftar) =>
      daftar.slice().sort((a, b) => (frekuensiBahan.get(b.id) || 0) - (frekuensiBahan.get(a.id) || 0)),
    [frekuensiBahan],
  )

  const bahanUmum = useMemo(() => urutPopuler(dataBahan.filter((b) => !adalahBumbu(b))), [dataBahan, urutPopuler])
  const bahanBumbu = useMemo(() => urutPopuler(dataBahan.filter((b) => adalahBumbu(b))), [dataBahan, urutPopuler])

  // Load-more: jumlah chip yang ditampilkan per grup (awal 8, +8 per klik).
  const [batasUmum, setBatasUmum] = useState(8)
  const [batasBumbu, setBatasBumbu] = useState(8)

  // Perlebar batas tampil bila ada chip terpilih di luar batas, agar chip yang
  // sudah dipilih user tetap terlihat (nilai turunan, tanpa state tambahan).
  const batasUmumTampil = useMemo(() => {
    const idx = kulkasUser
      .map((id) => bahanUmum.findIndex((b) => b.id === id))
      .filter((i) => i !== -1)
    return idx.length ? Math.max(batasUmum, Math.max(...idx) + 1) : batasUmum
  }, [batasUmum, kulkasUser, bahanUmum])

  const batasBumbuTampil = useMemo(() => {
    const idx = kulkasUser
      .map((id) => bahanBumbu.findIndex((b) => b.id === id))
      .filter((i) => i !== -1)
    return idx.length ? Math.max(batasBumbu, Math.max(...idx) + 1) : batasBumbu
  }, [batasBumbu, kulkasUser, bahanBumbu])

  // ===== Chrome (navbar + footer) =====

  const themeBtn = (
    <button onClick={handleToggleTheme} className="theme-btn" aria-label="Toggle tema">
      {theme === 'dark' ? ICON_SUN : ICON_MOON}
    </button>
  )

  const isPageActive = (href) => {
    const target = href.replace(/^#\//, '')
    if (target === '') return route.view === 'beranda'
    return route.view === target
  }
  const navItem = (href, icon, label, ekstra = null) => (
    <a href={href} onClick={() => setMobileOpen(false)} className={`nav-link ${isPageActive(href) ? 'active' : ''}`}>
      {ekstra}
      <i className={`fa-solid ${icon}`} />
      <span>{label}</span>
    </a>
  )

  // Link navbar desktop yang minimal: teks saja, tanpa ikon.
  const navText = (href, label) => (
    <a href={href} onClick={() => setMobileOpen(false)} className={`nav-link ${isPageActive(href) ? 'active' : ''}`}>
      <span>{label}</span>
    </a>
  )

  const avatarFoto = session ? fotoAvatar(session.user.username || session.user.email) : ''

  // Item menu khusus role (dipakai di mobile menu).
  const menuRole = session ? (
    isAdminRole(userRole) ? (
      <>
        {navItem('#/dashboard', 'fa-gauge-high', 'Dashboard Admin')}
        {navItem('#/kelola-resep', 'fa-book-open', 'Kelola Resep')}
        {userRole === 'superadmin' && navItem('#/kelola-user', 'fa-users', 'Kelola User')}
      </>
    ) : (
      <>
        <a href="#/profil" onClick={() => setMobileOpen(false)} className={`nav-link ${isPageActive('#/profil') ? 'active' : ''}`}>
          <span className="w-6 h-6 rounded-full overflow-hidden inline-block align-middle mr-1.5">
            <img src={avatarFoto} alt="Foto Profil" className="w-full h-full object-cover" />
          </span>
          <span>Foto Profil</span>
        </a>
        {navItem('#/profil', 'fa-user', 'Profil Saya')}
        {navItem('#/resep-saya', 'fa-book-open', 'Resep Saya')}
        {navItem('#/tambah-resep', 'fa-plus', 'Tambah Resep')}
      </>
    )
  ) : (
    <>
      {navItem('#/login', 'fa-right-to-bracket', 'Masuk')}
      {navItem('#/register', 'fa-user-plus', 'Daftar')}
    </>
  )

  const desktopNav = (
    <nav className="hidden lg:flex items-center gap-1 flex-1">
      {navText('#/', 'Beranda')}
      {navText('#/resep', 'Resep')}
      {navText('#/favorit', 'Favorit')}
    </nav>
  )

  const mobileNav = (
    <div className={`mobile-menu lg:hidden ${mobileOpen ? 'open' : ''}`}>
      <nav className="px-4 pb-4 pt-2 flex flex-col gap-1">
        {navItem('#/', 'fa-house', 'Beranda')}
        {navItem('#/resep', 'fa-book-open', 'Resep')}
        {navItem('#/favorit', 'fa-heart', 'Favorit')}
        {navItem('#/riwayat', 'fa-clock-rotate-left', 'Riwayat')}
        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          {menuRole}
        </div>
      </nav>
    </div>
  )

  // Dropdown akun: avatar lingkaran + menu sesuai role (tamu/user/admin).
  const tutupDropdownAkun = () => setShowAkunDropdown(false)

  const itemDropdown = (href, icon, label) => (
    <a
      href={href}
      onClick={tutupDropdownAkun}
      className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-150"
    >
      <i className={`fa-solid ${icon} w-5 text-center text-gray-400 dark:text-gray-500`} />
      {label}
    </a>
  )

  const tombolLogoutDropdown = (
    <button
      onClick={() => { tutupDropdownAkun(); handleLogout() }}
      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
    >
      <i className="fa-solid fa-right-from-bracket w-5 text-center" />
      Logout
    </button>
  )

  const headerDropdown = (judul, sub, icon) => (
    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
      <p className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 truncate">
        <i className={`fa-solid ${icon} text-orange-500`} />
        <span className="truncate">{judul}</span>
      </p>
      {sub && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{sub}</p>}
    </div>
  )

  const isiDropdownAkun = session ? (
    isAdminRole(userRole) ? (
      <>
        {headerDropdown(
          session.user.nama_lengkap || 'Administrator',
          userRole === 'superadmin' ? 'Superadmin' : session.user.email,
          'fa-crown'
        )}
        <div className="py-1.5">
          {itemDropdown('#/dashboard', 'fa-gauge-high', 'Dashboard')}
          {itemDropdown('#/kelola-resep', 'fa-book-open', 'Kelola Resep')}
          {userRole === 'superadmin' && itemDropdown('#/kelola-user', 'fa-users', 'Kelola User')}
        </div>
        <div className="border-t border-gray-100 dark:border-gray-700 py-1.5">
          {tombolLogoutDropdown}
        </div>
      </>
    ) : (
      <>
        {headerDropdown(
          session.user.nama_lengkap || session.user.email,
          `@${session.user.username || session.user.email.split('@')[0]}`,
          'fa-circle-user'
        )}
        <div className="py-1.5">
          {itemDropdown('#/profil', 'fa-user', 'Profil Saya')}
          {itemDropdown('#/resep-saya', 'fa-book-open', 'Resep Saya')}
          {itemDropdown('#/favorit', 'fa-heart', 'Favorit')}
          {itemDropdown('#/riwayat', 'fa-clock-rotate-left', 'Riwayat')}
        </div>
        <div className="border-t border-gray-100 dark:border-gray-700 py-1.5">
          {tombolLogoutDropdown}
        </div>
      </>
    )
  ) : (
    <>
      {headerDropdown('Akun', 'Masuk untuk berbagi resep', 'fa-circle-user')}
      <div className="py-1.5">
        {itemDropdown('#/login', 'fa-right-to-bracket', 'Masuk')}
        {itemDropdown('#/register', 'fa-user-plus', 'Daftar')}
      </div>
    </>
  )

  const loginArea = (
    <div className="relative shrink-0" ref={akunDropdownRef}>
      <button
        type="button"
        onClick={() => setShowAkunDropdown((v) => !v)}
        aria-label={session ? 'Menu profil' : 'Masuk atau daftar'}
        aria-expanded={showAkunDropdown}
        className={`flex items-center justify-center w-9 h-9 rounded-full border bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-pointer transition-all duration-200 hover:border-orange-500 hover:text-orange-500 hover:scale-105 hover:shadow-sm ${
          showAkunDropdown ? 'border-orange-500 text-orange-500' : 'border-gray-200 dark:border-gray-600'
        }`}
      >
        {session ? (
          <span className="w-7 h-7 rounded-full overflow-hidden">
            <img src={avatarFoto} alt="Foto Profil" className="w-full h-full object-cover" />
          </span>
        ) : (
          <i className="fa-solid fa-circle-user text-lg" />
        )}
      </button>

      {showAkunDropdown && (
        <div className="akun-dropdown absolute right-0 mt-2.5 w-56 rounded-[14px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-900/5 dark:shadow-gray-950/40 z-50 overflow-hidden">
          {isiDropdownAkun}
        </div>
      )}
    </div>
  )

  const navbar = (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="page-container">
        <div className="flex items-center justify-between gap-4 h-14 lg:h-16">
          <a href={session && isAdminRole(userRole) ? '#/dashboard' : '#/'} className="flex items-center gap-2.5 shrink-0 group">
            <span className="logo-badge"><i className="fa-solid fa-utensils" /></span>
            <span className="leading-tight">
              <span className="block text-lg font-extrabold text-gray-900 dark:text-gray-100">Buku Resep <span className="text-[#ff6b00]">Nusantara</span></span>
            </span>
          </a>

          {desktopNav}

          <div className="flex items-center gap-2 shrink-0">
            {session && (
              <a href="#/tambah-resep" className="btn-primary hidden lg:inline-flex text-sm">
                <i className="fa-solid fa-plus" /> Tambah Resep
              </a>
            )}
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
      <div className="footer-container page-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-badge"><i className="fa-solid fa-utensils" /></span>
              <span className="footer-logo-text">Buku Resep <span className="text-[#ff6b00]">Nusantara</span></span>
            </div>
            <p className="footer-desc">Buku Resep Nusantara membantu Anda menemukan resep terbaik dari bahan yang tersedia di dapur.</p>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Menu</h4>
            <ul className="footer-links">
              <li><a href="#/">Beranda</a></li>
              <li><a href="#/resep">Resep</a></li>
              <li><a href="#/favorit">Favorit</a></li>
              <li><a href="#/riwayat">Riwayat</a></li>
              {session && (
                <>
                  <li><a href="#/profil">Profil</a></li>
                  <li><a href="#/resep-saya">Resep Saya</a></li>
                </>
              )}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Kontak</h4>
            <ul className="footer-links">
              <li><a href="mailto:halo@bukuresepnusantara.com"><i className="fa-solid fa-envelope" />halo@bukuresepnusantara.com</a></li>
              <li><a href="https://instagram.com/bukuresep.nusantara" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram" />@bukuresep.nusantara</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-github" />github.com/bukuresepnusantara</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Buku Resep Nusantara. Semua hak dilindungi.</p>
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
        <h4 className="kulkas-group-title"><span>🥬</span> Bahan Umum <span className="kulkas-count">{bahanUmum.length}</span></h4>
        <div className="kulkas-grid">
          {bahanUmum.slice(0, batasUmumTampil).map((bahan) => (
            <label key={bahan.id} className={`kulkas-chip ${kulkasUser.includes(bahan.id) ? 'selected' : ''}`}>
              <input type="checkbox" checked={kulkasUser.includes(bahan.id)} onChange={() => handleCheckboxChange(bahan.id)} className="hidden" />
              <i className={`fa-solid ${ikonBahan(bahan.kategori)}`} />
              {bahan.nama_bahan}
            </label>
          ))}
        </div>
        {bahanUmum.length > batasUmumTampil && (
          <button type="button" onClick={() => setBatasUmum((prev) => prev + 8)} className="btn-secondary text-sm !px-4 !py-2 mt-4">
            <i className="fa-solid fa-plus" /> Muat lebih banyak · {bahanUmum.length - batasUmumTampil} lagi
          </button>
        )}
      </div>
      <div className="kulkas-group">
        <h4 className="kulkas-group-title"><span>🌿</span> Bumbu &amp; Rempah Nusantara <span className="kulkas-count">{bahanBumbu.length}</span></h4>
        <div className="kulkas-grid">
          {bahanBumbu.slice(0, batasBumbuTampil).map((bahan) => (
            <label key={bahan.id} className={`kulkas-chip ${kulkasUser.includes(bahan.id) ? 'selected' : ''}`}>
              <input type="checkbox" checked={kulkasUser.includes(bahan.id)} onChange={() => handleCheckboxChange(bahan.id)} className="hidden" />
              <i className={`fa-solid ${ikonBahan(bahan.kategori)}`} />
              {bahan.nama_bahan}
            </label>
          ))}
        </div>
        {bahanBumbu.length > batasBumbuTampil && (
          <button type="button" onClick={() => setBatasBumbu((prev) => prev + 8)} className="btn-secondary text-sm !px-4 !py-2 mt-4">
            <i className="fa-solid fa-plus" /> Muat lebih banyak · {bahanBumbu.length - batasBumbuTampil} lagi
          </button>
        )}
      </div>
    </div>
  )

  const autoFocusSearch = typeof window !== 'undefined' && window.innerWidth >= 768

  const resepPage = (
    <main className="page-container mt-10 space-y-8 pb-16">
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

      <div className="sticky top-14 lg:top-16 z-30 -mx-4 px-4 md:-mx-6 md:px-6 py-3 bg-[#fff8f2]/90 dark:bg-gray-900/90 backdrop-blur-sm">
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
          </div>
        )}
      </div>
    </main>
  )

  // ===== Pemilihan konten per rute =====

  let konten

  if (route.view === 'login') {
    konten = session ? null : <Login onLogin={handleLogin} />
  } else if (route.view === 'register') {
    konten = session ? null : <Register />
  } else if (route.view === 'resep') {
    konten = resepPage
  } else if (route.view === 'detail') {
    konten = <DetailResep key={route.id} id={route.id} kulkasUser={kulkasUser} favoritIds={favoritIds} onToggleFavorit={handleToggleFavorit} token={token} session={session} onNeedLogin={onNeedLogin} />
  } else if (route.view === 'favorit') {
    konten = <Favorit semuaResep={resepLengkap} favoritIds={favoritIds} onToggleFavorit={handleToggleFavorit} />
  } else if (route.view === 'riwayat') {
    konten = <Riwayat semuaResep={resepLengkap} favoritIds={favoritIds} onToggleFavorit={handleToggleFavorit} />
  } else if (route.view === 'trending') {
    konten = <Trending semuaResep={resepLengkap} favoritIds={favoritIds} onToggleFavorit={handleToggleFavorit} />
  } else if (route.view === 'dashboard') {
    konten = <AdminDashboard token={token} userRole={userRole} />
  } else if (route.view === 'kelola-resep') {
    konten = <KelolaResep token={token} onDataRefresh={initData} />
  } else if (route.view === 'kelola-user') {
    konten = <KelolaUser token={token} session={session} />
  } else if (route.view === 'profil') {
    konten = <Profil token={token} onSessionUpdate={handleSessionUpdate} />
  } else if (route.view === 'resep-saya') {
    konten = <ResepSaya token={token} onDataRefresh={initData} />
  } else if (route.view === 'tambah-resep') {
    konten = <TambahResep token={token} dataBahan={dataBahan} onDataRefresh={initData} />
  } else if (route.view === 'edit-resep') {
    konten = route.id ? <EditResep key={route.id} id={route.id} token={token} dataBahan={dataBahan} onDataRefresh={initData} /> : <ResepSaya token={token} onDataRefresh={initData} />
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
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f2] dark:bg-gray-900 text-gray-800 dark:text-gray-100 theme-transition">
      {navbar}
      {konten}
      <div className="mt-auto">{footerSection}</div>
      <MusicPlayer />
    </div>
  )
}

export default App