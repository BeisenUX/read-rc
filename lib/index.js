'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractRCFromPakcage = exports.RCFileName = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _hjson = require('hjson');

var _hjson2 = _interopRequireDefault(_hjson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 配置文件支持的名字
const fileNames = ['.bscpmrc', '.bscpmrc.json', '.upm', '.upmrc'];

const RCFileName = exports.RCFileName = '.bscpmrc';

// 获取package.json文件内容
const getPackageInfo = () => {
  const cpath = process.cwd();
  let packInfo = {};
  if (_fs2.default.existsSync(`${cpath}/package.json`)) {
    packInfo = require(`${cpath}/package.json`);
  }
  return packInfo;
};

const extractRCFromPakcage = exports.extractRCFromPakcage = () => {
  const cpath = process.cwd();
  const { maintainers = [], name, description } = getPackageInfo();
  // 使用 commonJs 规范提取组件维护者信息
  const developers = maintainers.map(developer => developer.name);
  // 从 package 中提取的配置信息
  return {
    'name': name,
    'description': description,
    'developers': developers,
    'team': 'Unknown',
    'category': '',
    'device': ''
  };
};

exports.default = () => {
  const cpath = process.cwd();
  let rc = {};
  for (let filename of fileNames) {
    if (_fs2.default.existsSync(`${cpath}/${filename}`)) {
      rc = _hjson2.default.parse(_fs2.default.readFileSync(`${cpath}/${filename}`, 'utf-8'));
    }
  }
  return Object.assign({}, extractRCFromPakcage(), rc);
};