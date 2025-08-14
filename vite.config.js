import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://api.webnew.info.vn/',
        changeOrigin: true,
      }
    }
  }
})

