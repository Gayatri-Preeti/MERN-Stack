import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor'
          }
          if (id.includes('@chakra-ui') || id.includes('@emotion')) {
            return 'ui'
          }
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
