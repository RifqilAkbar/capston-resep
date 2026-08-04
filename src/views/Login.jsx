import { useState } from 'react'
import { api } from '../api'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pesan, setPesan] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    setPesan('')

    if (!email.trim() || !password) {
      setPesan('Email dan password wajib diisi.')
      return
    }

    setIsSubmitting(true)
    try {
      const { session } = await api.login(email, password)
      onLogin(session)
    } catch (error) {
      setPesan('Gagal: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page-container py-12 md:py-16 min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8">
          <div className="text-center">
            <span className="inline-flex w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/40 text-accent items-center justify-center text-2xl">
              <i className="fa-solid fa-right-to-bracket" />
            </span>
            <h1 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-gray-100">Masuk</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Selamat datang kembali di Buku Resep Nusantara.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Email</label>
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              />
            </div>

            {pesan && <p className="text-center text-sm text-red-500">{pesan}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent disabled:bg-accent/50 hover:bg-accent-dark text-white font-bold p-3.5 rounded-xl transition shadow-sm"
            >
              {isSubmitting ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            Belum punya akun?{' '}
            <a href="#/register" className="font-bold text-accent hover:underline">Daftar Sekarang</a>
          </div>
        </div>
      </div>
    </main>
  )
}
