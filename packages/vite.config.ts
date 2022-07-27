import { defineConfig } from 'vite'
import MarkdownTransform from '../packages/.vitepress/plugins/markdownTransform'

export default defineConfig(async () => {

  return {
    plugins: [
      MarkdownTransform(),
    ]
  }
})
