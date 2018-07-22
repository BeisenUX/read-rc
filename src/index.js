
import fs from 'fs'
import Hjson from 'hjson'

// 配置文件支持的名字
const fileNames = [ '.bscpmrc', '.bscpmrc.json', '.upm', '.upmrc' ]

export const RCFileName = '.bscpmrc'

// 获取package.json文件内容
const getPackageInfo = () => {
  const cpath = process.cwd()
  let packInfo = {}
  if (fs.existsSync(`${cpath}/package.json`)) {
    packInfo = require(`${cpath}/package.json`)
  }
  return packInfo
}

export const extractRCFromPakcage = () => {
  const cpath = process.cwd()
  const { maintainers = [], name, description } = getPackageInfo()
  // 使用 commonJs 规范提取组件维护者信息
  const developers = maintainers.map(developer => developer.name)
  // 从 package 中提取的配置信息
  return {
    'name': name,
    'description': description,
    'developers': developers,
    'team': 'Unknown',
    'category': '',
    'device': ''
  }
}

export default () => {
  const cpath = process.cwd()
  let rc = {}
  for (let filename of fileNames) {
    if (fs.existsSync(`${cpath}/${filename}`)) {
      rc = Hjson.parse(fs.readFileSync(`${cpath}/${filename}`, 'utf-8'))
    }
  }
  return Object.assign({}, extractRCFromPakcage(), rc)
}
