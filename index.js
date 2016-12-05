#!/usr/bin/env node

var program = require('commander');

program
  .version('0.0.1')
  .command('clone', 'install all JSTransformers')
  .command('list', 'list all JSTransformers')
  .command('install-deps', 'install dependencies')
  .command('check-deps', 'check dependency versions using david')
  .command('test', 'test all JSTransformers')
  .command('add-owners', 'add all maintainers to all npm projects')
  .parse(process.argv);
