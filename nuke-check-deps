#!/usr/bin/env node
/*
 * Check if dependencies are up-to-date for repos under the jstransformer
 * organization
 * Copyright © 2015 Tiancheng “Timothy” Gu
 * MIT-licensed
 */

var async = require('async')
  , chalk = require('chalk')
  , program = require('commander')
  , request = require('superagent')
  , Table = require('cli-table')
  , errors = []
  , OK = /(none|uptodate)/

program
  .description('Check if dependencies are up-to-date for all repos.')
  .usage('[options]')
  .option('-a, --all', 'Also print up-to-date entries')
  .option('-u, --url', 'Also print URL to david-dm.org')
  .parse(process.argv)

var tableOptions = {
  head: [ 'Module', 'Deps', 'devDeps' ]
}
if (program.url) {
  tableOptions.style = { 'padding-left': 0, 'padding-right': 0 }
  tableOptions.head.push('URL')
}
var table = new Table(tableOptions)

table.add = function (data) {
  var cell = {}
  cell[data.name] = [ data.dep, data.dev ]
  if (program.url) {
    cell[data.name].push('https://david-dm.org/jstransformers/' + data.name)
  }
  this.push(cell)
}

require('./repos')(function (err, obj) {
  if (err) {
    console.log(err.stack)
    process.exit(1)
  }

  async.each(obj, function (repo, cb) {
    var data = { name: repo.name }
    getDavid(repo.name, function (err, res, f) {
      if (err) {
        console.error(
          'While fetching ' + res.request.url + ':\n'
        + err.stack
        )
        data[f.var] = 'ERROR'
      } else {
        data[f.var] = res.body.status
      }
      if (!OK.test(data[f.var])) {
        data[f.var] = chalk.bgRed.white(data[f.var])
      }
      if (data.dep && data.dev) {
        if (program.all || !OK.test(data.dep) || !OK.test(data.dev)) {
          table.add(data)
        }
        cb()
      }
    })
  }, function () {
    table.sort(function (a, b) {
      a = Object.keys(a)[0]
      b = Object.keys(b)[0]
      return (a > b) - (a < b)
    })
    console.log(table.toString())
    process.exit(!!table.length)
  })
})

function getDavid (name, cb) {
  ;[ { url: '/info.json',     var: 'dep' }
   , { url: '/dev-info.json', var: 'dev' }].forEach(function (f) {
    request
      .get('https://david-dm.org/jstransformers/' + name + f.url)
      .end(function (err, res) {
        cb(err, res, f)
      })
  })
}
