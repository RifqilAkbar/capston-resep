import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  // base default '/'. Untuk GitHub Pages set env VITE_BASE (misal "/capston-resep/").
  base: process.env.VITE_BASE || '/',
  plugins: [
    react(),
    tailwindcss(), //mendaftarkan kompiler tailwind v4 resmi
  ],
  // Multi-page: index.html = landing page (front page), app.html = aplikasi React.
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        app: fileURLToPath(new URL('./app.html', import.meta.url)),
      },
    },
  },
  server: {
    proxy: {
      // Proxy ini membuat React bisa memanggil /api tanpa hardcode port backend.
      '/api': 'http://localhost:3001',
    },
  },
})
