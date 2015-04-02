/*
 * Get repos under the jstransformer organization
 * Copyright © 2015 Tiancheng “Timothy” Gu
 * MIT-licensed
 */

var request = require('superagent')
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
      request
        .get('https://api.github.com/orgs/jstransformers/repos')
        // https://developer.github.com/v3/#user-agent-required:
        //
        // > All API requests MUST include a valid `User-Agent` header.
        // > Requests with no `User-Agent` header will be rejected. We
        // > request that you use your GitHub username, or the name of your
        // > application, for the `User-Agent` header value. This allows us
        // > to contact you if there are problems.
        .set('User-Agent', 'jstransformers')
        .end(function (error, res) {
          if (error) {
            err = error
            err.message += '\n' + res.text
          } else {
            obj = res.body
            obj.sort(function (a, b) {
              return (a.name > b.name) - (a.name < b.name)
            })
          }
          rw()
          cb(err, obj)
        })
    })
    rr()
  })
}
