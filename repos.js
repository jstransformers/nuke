/*
 * Get repos under the jstransformer organization
 * Copyright © 2015 Tiancheng “Timothy” Gu
 * MIT-licensed
 */

var github = require('github-org-repos')

module.exports = function (cb) {
  var opts = {
    org: 'jstransformers'
  }
  github(opts, function (err, data) {
    if (err)
      return cb(err, data)
    cb(null, data.filter(function (a) {
               return a.name.indexOf('jstransformer') === 0
             }))
  })
}
