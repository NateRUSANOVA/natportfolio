import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // The local folder name contains a colon ("PORTFOLIO UX:UI"), which breaks
    // Vite's fs allow-list check in dev. Dev server only; not used in production.
    fs: { strict: false },
  },
})
