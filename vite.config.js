import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',   // Use '/' if you have a custom domain, otherwise use '/repo-name/'
})