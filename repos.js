/*
 * Get repos under the jstransformer organization
 * Copyright © 2015 Tiancheng “Timothy” Gu
 * MIT-licensed
 */

var github = require('github-repositories')

module.exports = function (cb) {
  github('jstransformers', function (err, data) {
    if (err) return cb(err, data)
    cb(null, data.filter(function (a) {
               return a.name.indexOf('jstransformer') === 0
             }))
  })
}
