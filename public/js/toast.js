// Toast notification muncul di kanan bawah dengan animasi fade.
// Tersedia melalui window.Toast.

;(function () {
  // Buat container toast jika belum ada
  function getContainer() {
    var el = document.getElementById('toast-container')
    if (el) return el
    el = document.createElement('div')
    el.id = 'toast-container'
    el.style.cssText =
      'position:fixed;bottom:20px;right:20px;z-index:9999;' +
      'display:flex;flex-direction:column;gap:8px;' +
      'pointer-events:none'
    document.body.appendChild(el)
    return el
  }

  // Suntik keyframes toast
  ;(function injectKeyframes() {
    if (document.getElementById('toast-keyframes')) return
    var s = document.createElement('style')
    s.id = 'toast-keyframes'
    s.textContent =
      '@keyframes toast-in {' +
      '  from { transform: translateX(120%); opacity: 0; }' +
      '  to { transform: translateX(0); opacity: 1; }' +
      '}' +
      '@keyframes toast-out {' +
      '  from { transform: translateX(0); opacity: 1; }' +
      '  to { transform: translateX(120%); opacity: 0; }' +
      '}'
    document.head.appendChild(s)
  })()

  window.Toast = {
    // Tampilkan toast
    // type: 'success' | 'error' | 'info'
    show: function (message, type, duration) {
      type = type || 'info'
      duration = duration || 3000

      var container = getContainer()

      // Ikon dan warna berdasarkan type
      var icons = { success: '✅', error: '❌', info: '\u2139\uFE0F' }
      var bgLight = {
        success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
      }
      var bgDark = {
        success: 'dark:bg-emerald-900/60 dark:border-emerald-700 dark:text-emerald-200',
        error: 'dark:bg-red-900/60 dark:border-red-700 dark:text-red-200',
        info: 'dark:bg-blue-900/60 dark:border-blue-700 dark:text-blue-200',
      }

      var toast = document.createElement('div')
      toast.className =
        'flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium ' +
        'pointer-events-auto ' +
        (bgLight[type] || bgLight.info) + ' ' +
        (bgDark[type] || bgDark.info)

      toast.innerHTML =
        '<span>' + (icons[type] || icons.info) + '</span>' +
        '<span>' + message + '</span>'

      toast.style.animation = 'toast-in 0.3s ease-out forwards'
      container.appendChild(toast)

      // Hapus setelah durasi
      setTimeout(function () {
        toast.style.animation = 'toast-out 0.3s ease-in forwards'
        setTimeout(function () {
          if (toast.parentNode) toast.remove()
        }, 300)
      }, duration)
    },
  }
})()
