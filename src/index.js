
import fs from 'fs'
import Hjson from 'hjson'

// 配置文件支持的名字
const fileNames = [ '.bscpmrc', '.bscpmrc.json', '.upm' ]

export default () => {
  const cpath = process.cwd()

  for (let filename of fileNames) {
    if (fs.existsSync(`${cpath}/${filename}`)) {
      return Hjson.parse(fs.readFileSync(`${cpath}/${filename}`, 'utf-8'))
    }
  }

  return {}
}
