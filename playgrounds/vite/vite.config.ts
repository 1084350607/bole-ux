import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@boleux/hooks': resolve(__dirname, '../../packages/hooks/index.ts'),
      '@boleux/utils': resolve(__dirname, '../../packages/utils/index.ts')
    },
  },
})
