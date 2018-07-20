'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _hjson = require('hjson');

var _hjson2 = _interopRequireDefault(_hjson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 配置文件支持的名字
const fileNames = ['.bscpmrc', '.bscpmrc.json', '.upm'];

exports.default = () => {
  const cpath = process.cwd();

  for (let filename of fileNames) {
    if (_fs2.default.existsSync(`${cpath}/${filename}`)) {
      return _hjson2.default.parse(_fs2.default.readFileSync(`${cpath}/${filename}`, 'utf-8'));
    }
  }

  return {};
};

module.exports = exports['default'];