import { useEffect, useState } from 'react'
import { api } from '../api'
import { fotoAvatar } from '../mock'

export default function Profil({ token, onSessionUpdate }) {
  const [profil, setProfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pesan, setPesan] = useState('')

  const [namaLengkap, setNamaLengkap] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')

  const [passwordLama, setPasswordLama] = useState('')
  const [passwordBaru, setPasswordBaru] = useState('')
  const [konfirmasi, setKonfirmasi] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmittingPass, setIsSubmittingPass] = useState(false)
  const [pesanPass, setPesanPass] = useState('')

  useEffect(() => {
    let aktif = true
    api.ambilProfil(token)
      .then(({ profil: data }) => {
        if (!aktif) return
        setProfil(data)
        setNamaLengkap(data.nama_lengkap)
        setUsername(data.username)
        setEmail(data.email)
        setBio(data.bio)
      })
      .catch(() => {})
      .finally(() => { if (aktif) setLoading(false) })
    return () => { aktif = false }
  }, [token])

  const handleProfil = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    setPesan('')

    try {
      const { profil: data } = await api.ubahProfil(token, { nama_lengkap: namaLengkap, username, email, bio })
      setProfil(data)
      if (onSessionUpdate) onSessionUpdate(data)
      setPesan('Sukses! Profil berhasil diperbarui.')
    } catch (error) {
      setPesan(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePassword = async (e) => {
    e.preventDefault()
    if (isSubmittingPass) return
    setPesanPass('')

    if (passwordBaru.length < 6) {
      setPesanPass('Password baru minimal 6 karakter.')
      return
    }
    if (passwordBaru !== konfirmasi) {
      setPesanPass('Konfirmasi password tidak cocok.')
      return
    }

    setIsSubmittingPass(true)
    try {
      await api.ubahPassword(token, { password_lama: passwordLama, password_baru: passwordBaru })
      setPesanPass('Sukses! Password berhasil diubah.')
      setPasswordLama('')
      setPasswordBaru('')
      setKonfirmasi('')
    } catch (error) {
      setPesanPass(error.message)
    } finally {
      setIsSubmittingPass(false)
    }
  }

  const input = 'w-full p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm'
  const label = 'block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2'

  if (loading || !profil) {
    return (
      <main className="page-container mt-10 pb-16">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8">
          <div className="skeleton-pulse h-24 w-24 rounded-full mx-auto" />
          <div className="skeleton-pulse h-5 w-1/2 mx-auto mt-4" />
        </div>
      </main>
    )
  }

  return (
    <main className="page-container mt-10 pb-16">
      <div className="max-w-3xl mx-auto">
        <div>
          <span className="section-kicker"><i className="fa-solid fa-user" />Profil Saya</span>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Pengaturan Profil</h1>
        </div>

        <div className="mt-6 flex items-center gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
          <div className="w-20 h-20 rounded-full overflow-hidden shrink-0">
            <img src={fotoAvatar(profil.username || profil.email)} alt={profil.nama_lengkap || 'Profil'} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">{profil.nama_lengkap}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{profil.username || '-'}</p>
            <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold rounded capitalize">{profil.role}</span>
          </div>
        </div>

        {pesan && (
          <p className={`mt-4 font-semibold text-center text-sm ${pesan.includes('Sukses') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{pesan}</p>
        )}

        <form onSubmit={handleProfil} className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 md:p-8 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Data Diri</h2>
          <div>
            <label className={label}>Nama Lengkap</label>
            <input type="text" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} className={input} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={label}>Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={input} />
            </div>
            <div>
              <label className={label}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
            </div>
          </div>
          <div>
            <label className={label}>Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows="3" placeholder="Ceritakan sedikit tentang Anda..." className={input} />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-accent disabled:bg-accent/50 hover:bg-accent-dark text-white font-bold p-3.5 rounded-xl transition shadow-sm">
            {isSubmitting ? 'Menyimpan...' : 'Simpan Profil'}
          </button>
        </form>

        <form onSubmit={handlePassword} className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 md:p-8 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Ubah Password</h2>
          {pesanPass && (
            <p className={`font-semibold text-center text-sm ${pesanPass.includes('Sukses') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{pesanPass}</p>
          )}
          <div>
            <label className={label}>Password Lama</label>
            <input type="password" value={passwordLama} onChange={(e) => setPasswordLama(e.target.value)} className={input} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={label}>Password Baru</label>
              <input type="password" value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} className={input} />
            </div>
            <div>
              <label className={label}>Konfirmasi Password Baru</label>
              <input type="password" value={konfirmasi} onChange={(e) => setKonfirmasi(e.target.value)} className={input} />
            </div>
          </div>
          <button type="submit" disabled={isSubmittingPass} className="w-full bg-gray-800 dark:bg-gray-600 disabled:opacity-50 hover:bg-gray-700 text-white font-bold p-3.5 rounded-xl transition shadow-sm">
            {isSubmittingPass ? 'Menyimpan...' : 'Ubah Password'}
          </button>
        </form>
      </div>
    </main>
  )
}
