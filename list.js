#!/usr/bin/env node
/*
 * Print repos under the jstransformer organization to console
 * Copyright © 2015 Tiancheng “Timothy” Gu
 * MIT-licensed
 */

var repos = require('./repos')(function (err, data) {
  if (err) {
    console.log(err.stack)
    process.exit(1)
  }
  data.forEach(function (repo) {
    console.log(repo.name)
  })
})
