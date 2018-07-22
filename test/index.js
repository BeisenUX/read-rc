
const { spwanSync } = require('child_process')
const assert = require('assert')
const readRC = require('../lib').default
const { extractRCFromPakcage, RCFileName, getPackageInfo } = require('../lib')

describe('读取配置文件', () => {

  process.chdir(`${__dirname}`)

  it('获取package.json配置文件', () => {
    let packinfo = getPackageInfo()
    assert.equal(packinfo.main, 'lib/index.js')
  })

  it('输出正确的RC文件名', () => {
    assert.equal(RCFileName, '.bscpmrc')
  })

  it('获取由Package.json文件生成的RC配置文件', () => {
    let rc = extractRCFromPakcage()
    assert.equal(rc.name, '@beisen/read-rc')
  })

  it('测试读取自定义RC配置文件', () => {
    let rc = readRC()
    assert.equal(rc.name, 'READRC')
  })

  it('测试未找到package.json情况', () => {
    process.chdir(`${__dirname}/empty`)
    let packinfo = getPackageInfo()
    assert.equal(Object.keys(packinfo).length, 0)
  })
})
