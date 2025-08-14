import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  server: {
    host: true,
    port: 3000,
    proxy: mode === 'development' ? {
      '/api': {
        target: 'http://fullstack-backend:8000',
        changeOrigin: true,
      }
    } : undefined
  }
}))
