import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    server: mode === 'development' ? {
      host: true,
      port: 3000,
      proxy: {
        '/api': {
          target: 'https://api.webnew.info.vn',
          changeOrigin: true,
        }
      }
    } : undefined,
    build: {
      outDir: 'dist',
      emptyOutDir: true
    }
  }
})
