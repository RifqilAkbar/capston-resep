// Dark mode manager — toggle class .dark di <html> + simpan ke localStorage.
// Palette hidup di src/index.css (CSS variables), jadi di sini tidak perlu inject apa pun.
// Tersedia melalui window.Theme.

;(function () {
  var KEY = 'skripsi_theme'

  // Terapkan theme ke <html>
  function apply(mode) {
    var root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.removeAttribute('data-theme')
    }
  }

  window.Theme = {
    // Inisialisasi: terapkan theme tersimpan
    init: function () {
      apply(this.get())
    },

    // Ambil theme saat ini
    get: function () {
      return localStorage.getItem(KEY) || 'light'
    },

    // Set theme dan simpan ke localStorage
    set: function (mode) {
      localStorage.setItem(KEY, mode)
      apply(mode)
      window.dispatchEvent(new CustomEvent('themechange', { detail: mode }))
    },

    // Toggle light/dark dan kembalikan mode baru
    toggle: function () {
      var next = this.get() === 'dark' ? 'light' : 'dark'
      this.set(next)
      return next
    },
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      window.Theme.init()
    })
  } else {
    window.Theme.init()
  }
})()
