// Loading / skeleton helper.
// Digunakan oleh halaman vanilla maupun React.
// Tersedia melalui window.Loading.

;(function () {
  // Suntik CSS skeleton
  ;(function injectCSS() {
    if (document.getElementById('loading-styles')) return
    var s = document.createElement('style')
    s.id = 'loading-styles'
    s.textContent =
      '.skeleton-pulse {' +
      '  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);' +
      '  background-size: 200% 100%;' +
      '  animation: skeleton-shimmer 1.5s infinite;' +
      '  border-radius: 0.75rem;' +
      '}' +
      '.dark .skeleton-pulse {' +
      '  background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);' +
      '  background-size: 200% 100%;' +
      '}' +
      '@keyframes skeleton-shimmer {' +
      '  0% { background-position: 200% 0; }' +
      '  100% { background-position: -200% 0; }' +
      '}'
    document.head.appendChild(s)
  })()

  window.Loading = {
    // Buat HTML skeleton card untuk grid
    skeletonGridHTML: function (count) {
      count = count || 4
      var html = ''
      for (var i = 0; i < count; i++) {
        html +=
          '<div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">' +
          '  <div class="skeleton-pulse h-44 w-full"></div>' +
          '  <div class="p-5 space-y-3">' +
          '    <div class="skeleton-pulse h-5 w-3/4"></div>' +
          '    <div class="flex gap-2">' +
          '      <div class="skeleton-pulse h-4 w-16"></div>' +
          '      <div class="skeleton-pulse h-4 w-12"></div>' +
          '      <div class="skeleton-pulse h-4 w-14"></div>' +
          '    </div>' +
          '    <div class="space-y-1.5">' +
          '      <div class="skeleton-pulse h-3 w-full"></div>' +
          '      <div class="skeleton-pulse h-2.5 w-full"></div>' +
          '    </div>' +
          '    <div class="skeleton-pulse h-10 w-full"></div>' +
          '  </div>' +
          '</div>'
      }
      return html
    },
  }
})()
