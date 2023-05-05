import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom', // TODO: happy-dom has better performance, but we need to configure baseUrl on axios
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}', '**/*.test.{ts,tsx}']
  }
})
