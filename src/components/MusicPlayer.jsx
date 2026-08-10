import { useEffect, useRef, useState } from 'react'

const MUSIC_SRC = `${import.meta.env.BASE_URL}assets/audio/background.mp3`

// Pemutar soundtrack latar. Elemen <audio> berada di level App sehingga
// musik tetap berjalan saat pengguna berpindah halaman (hash routing SPA).
export function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = 0.3
  }, [])

  // Coba autoplay; browser memblokir suara sebelum interaksi pengguna,
  // jadi lanjutkan sekali interaksi pertama terjadi.
  useEffect(() => {
    const a = audioRef.current
    if (!a) return

    const cobaPlay = () => {
      const p = a.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }

    cobaPlay()

    const mulaiSaatInteraksi = () => {
      cobaPlay()
      window.removeEventListener('pointerdown', mulaiSaatInteraksi)
      window.removeEventListener('touchstart', mulaiSaatInteraksi)
      window.removeEventListener('keydown', mulaiSaatInteraksi)
    }

    window.addEventListener('pointerdown', mulaiSaatInteraksi)
    window.addEventListener('touchstart', mulaiSaatInteraksi)
    window.addEventListener('keydown', mulaiSaatInteraksi)

    return () => {
      window.removeEventListener('pointerdown', mulaiSaatInteraksi)
      window.removeEventListener('touchstart', mulaiSaatInteraksi)
      window.removeEventListener('keydown', mulaiSaatInteraksi)
    }
  }, [])

  function toggle() {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      const p = a.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    } else {
      a.pause()
    }
  }

  return (
    <div className="music-player">
      <span className={`music-player-status ${playing ? 'on' : ''}`}>
        {playing ? '🎵 Musik Aktif' : '▶️ Musik Di-pause'}
      </span>
      <button
        type="button"
        className={`music-player-btn ${playing ? 'playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Jeda musik' : 'Putar musik'}
        title={playing ? 'Jeda musik' : 'Putar musik'}
      >
        {playing ? '⏸️' : '▶️'}
      </button>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    </div>
  )
}
