// Dark mode manager menggunakan CSS Variables dan localStorage.
// Tersedia melalui window.Theme.

;(function () {
  var KEY = 'skripsi_theme'

  // CSS variables untuk theme light dan dark
  var variables = {
    light: {
      '--bg': '#f9fafb',
      '--card': '#ffffff',
      '--text': '#1f2937',
      '--text-secondary': '#6b7280',
      '--border': '#e5e7eb',
      '--primary': '#f97316',
      '--primary-hover': '#ea580c',
    },
    dark: {
      '--bg': '#111827',
      '--card': '#1f2937',
      '--text': '#f3f4f6',
      '--text-secondary': '#9ca3af',
      '--border': '#374151',
      '--primary': '#fb923c',
      '--primary-hover': '#f97316',
    },
  }

  // Suntik style tag dengan CSS variables ke dalam <head>
  function injectStyles() {
    if (document.getElementById('theme-variables')) return

    var style = document.createElement('style')
    style.id = 'theme-variables'

    var css = ':root {\n'
    for (var key in variables.light) {
      if (variables.light.hasOwnProperty(key)) {
        css += '  ' + key + ': ' + variables.light[key] + ';\n'
      }
    }
    css += '}\n'

    css += '[data-theme="dark"] {\n'
    for (var key in variables.dark) {
      if (variables.dark.hasOwnProperty(key)) {
        css += '  ' + key + ': ' + variables.dark[key] + ';\n'
      }
    }
    css += '}\n'

    // Transisi halus saat berganti tema
    css += 'body { transition: background-color 0.3s ease, color 0.3s ease; }'

    style.textContent = css
    document.head.appendChild(style)
  }

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
    // Inisialisasi: inject CSS variables dan terapkan theme tersimpan
    init: function () {
      injectStyles()
      var saved = this.get()
      apply(saved)
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
