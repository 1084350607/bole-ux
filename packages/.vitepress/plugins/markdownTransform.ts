import { resolve, join } from 'path'
import fs from 'fs'

const DIR_SRC = resolve(__dirname, '../..')

export default function markdownTransform() {
  return {
    name: 'markdown-transform',

    transform(code, id) {
      // TODO: add plugins
      const hooks = resolve(DIR_SRC, 'hooks')
    }
  }
}