import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@redux': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    globals: true,
    include: ['src/__tests__/**/*.test.{js,jsx,ts,tsx}']
  }
})
