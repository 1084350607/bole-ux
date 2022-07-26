import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ...
  },
  resolve: {
    alias: {
      '@boleux/hooks': resolve(__dirname, 'packages/hooks/index.ts'),
      '@boleux/utils': resolve(__dirname, 'packages/utils/index.ts'),
      '@boleux/components': resolve(__dirname, 'packages/components/index.ts'),
    },
  },
})