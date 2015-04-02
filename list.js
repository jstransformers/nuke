/*
 * Print repos under the jstransformer organization to console
 * Copyright © 2015 Tiancheng “Timothy” Gu
 * MIT-licensed
 */

var repos = require('./repos')(function (err, data) {
  if (err) throw err
  data.forEach(function (repo) {
    console.log(repo.name)
  })
})
