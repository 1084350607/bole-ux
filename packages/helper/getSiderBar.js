
const { resolve } = require('path')
const fs = require('fs')
const DIR = resolve(__dirname, '../')

export const getSiderBar = (type) => {
  const isDir = (dirName) => !dirName.includes('.')

  const getAllDirs = (path) => {
    const files = fs.readdirSync(path)

    return files.filter(file => isDir(file))
  }
  let result = []
  let curPath = resolve(DIR, type)
  let dirs = getAllDirs(curPath).map(dir => {
    return {
      name: dir,
      path: curPath
    }
  })
  let queue = [...dirs]
  
  while (queue.length) {
    let len = queue.length

    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      const children = getAllDirs(resolve(cur.path, cur.name)).map(child => {
        return {
          name: child,
          path: resolve(cur.path, cur.name)
        }
      })
      queue.push(...children)

      if (!children.length) {
        result.push(cur)
      }
    }
 }

  return result.map(item => {
    return {
      text: item.name,
      link: item.path.split('packages').slice(-1) + `/${item.name}/index.md`
    }
  })
}