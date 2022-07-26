import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ...
  },
  resolve: {
    alias: {
      '@vueuse/hooks': resolve(__dirname, 'packages/hooks/index.ts'),
      '@vueuse/utils': resolve(__dirname, 'packages/utils/index.ts'),
      '@vueuse/components': resolve(__dirname, 'packages/components/index.ts'),
    },
  },
})