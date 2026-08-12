export function deteksiPlatform(url) {
  const host = (String(url || '').toLowerCase().match(/^\w+:\/\/([^/]+)/) || [])[1] || String(url || '').toLowerCase()
  if (host.includes('youtube') || host.includes('youtu.be')) return 'youtube'
  if (host.includes('instagram')) return 'instagram'
  if (host.includes('facebook')) return 'facebook'
  if (host.includes('tiktok')) return 'tiktok'
  return null
}

export function ikonLink(url) {
  switch (deteksiPlatform(url)) {
    case 'youtube': return 'fa-brands fa-youtube text-red-600'
    case 'instagram': return 'fa-brands fa-instagram text-pink-500'
    case 'facebook': return 'fa-brands fa-facebook text-blue-600'
    case 'tiktok': return 'fa-brands fa-tiktok'
    default: return 'fa-solid fa-link text-gray-400'
  }
}