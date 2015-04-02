/*
 * Get repos under the jstransformer organization
 * Copyright © 2015 Tiancheng “Timothy” Gu
 * MIT-licensed
 */

var https = require('https')
  , bl = require('bl')
  , ReadWriteLock = require('rwlock')
  , lock = new ReadWriteLock()  // Make sure the data is cached
  , obj
  , err

module.exports = function (cb) {
  lock.readLock(function (rr) {
    if (obj || err) {
      cb(err, obj)
      return rr()
    }
    lock.writeLock(function (rw) {
      https.get({
        host: 'api.github.com'
      , path: '/orgs/jstransformers/repos'
      , headers: {
          'User-Agent': 'Node.js'
        }
      }, function (res) {
        res.pipe(bl(function (error, data) {
          if (error) err = error
          else       obj = JSON.parse(data.toString())
          rw()
          cb(err, obj)
        }))
      })
    })
    rr()
  })
}
