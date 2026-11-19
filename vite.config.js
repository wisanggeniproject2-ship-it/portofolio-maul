import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' makes the build work at a domain root and in a sub-folder
// (for example GitHub Pages at username.github.io/repo-name).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
