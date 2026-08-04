import { useState } from 'react'
import { api } from '../api'

export default function Register() {
  const [namaLengkap, setNamaLengkap] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [konfirmasi, setKonfirmasi] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pesan, setPesan] = useState('')
  const [sukses, setSukses] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    setPesan('')

    if (!namaLengkap.trim() || !email.trim() || !password) {
      setPesan('Semua kolom wajib diisi.')
      return
    }

    if (password.length < 6) {
      setPesan('Password minimal 6 karakter.')
      return
    }

    if (password !== konfirmasi) {
      setPesan('Konfirmasi password tidak cocok.')
      return
    }

    setIsSubmitting(true)
    try {
      await api.daftar({
        nama_lengkap: namaLengkap.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
      })
      setSukses(true)
    } catch (error) {
      setPesan('Gagal: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const input = 'w-full p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm'
  const label = 'block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2'

  if (sukses) {
    return (
      <main className="page-container py-12 md:py-16 min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-md text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8">
          <span className="inline-flex w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 items-center justify-center text-2xl">
            <i className="fa-solid fa-check" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-gray-100">Pendaftaran Berhasil!</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Akun Anda sudah dibuat. Silakan masuk untuk mulai menggunakan aplikasi.
          </p>
          <a href="#/login" className="btn-primary inline-flex mt-6"><i className="fa-solid fa-right-to-bracket" /> Masuk Sekarang</a>
        </div>
      </main>
    )
  }

  return (
    <main className="page-container py-12 md:py-16 min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8">
          <div className="text-center">
            <span className="inline-flex w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/40 text-accent items-center justify-center text-2xl">
              <i className="fa-solid fa-user-plus" />
            </span>
            <h1 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-gray-100">Daftar Akun</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Bergabung untuk berbagi resep dan berinteraksi dengan komunitas.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className={label}>Nama Lengkap</label>
              <input type="text" placeholder="Contoh: Siti Rahma" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} className={input} />
            </div>

            <div>
              <label className={label}>Username</label>
              <input type="text" placeholder="Contoh: sitirahma" value={username} onChange={(e) => setUsername(e.target.value)} className={input} />
            </div>

            <div>
              <label className={label}>Email</label>
              <input type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={label}>Password</label>
                <input type="password" placeholder="Minimal 6 karakter" value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
              </div>
              <div>
                <label className={label}>Konfirmasi Password</label>
                <input type="password" placeholder="Ulangi password" value={konfirmasi} onChange={(e) => setKonfirmasi(e.target.value)} className={input} />
              </div>
            </div>

            {pesan && <p className="text-center text-sm text-red-500">{pesan}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent disabled:bg-accent/50 hover:bg-accent-dark text-white font-bold p-3.5 rounded-xl transition shadow-sm"
            >
              {isSubmitting ? 'Memproses...' : 'Daftar'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            Sudah punya akun?{' '}
            <a href="#/login" className="font-bold text-accent hover:underline">Masuk</a>
          </div>
        </div>
      </div>
    </main>
  )
}
