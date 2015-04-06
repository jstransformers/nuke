var read = require('fs').readFileSync
  , join = require('path').join
  , ini = require('ini').parse
  , config = {}

try {
  var file = read(join(__dirname, 'config.ini'), 'utf8')
  config = ini(file)
} catch (e) {}

module.exports = config
