#!/bin/sh
# Installs the dependencies of and tests a package, and logs the bad packages
# to `bad`.
# Copyright © 2015 Tiancheng “Timothy” Gu
# MIT-licensed

[ -f config.sh ] && . ./config.sh
cwd="`pwd`"

rm -f bad
for d in `echo ${root}jstransformer*/`; do
  repo="`basename $d`"
  echo "Testing $repo"
  cd "$d"
  rm -rf node_modules

  ! [ -e package.json ] || \
  (npm i && npm test) || \
  echo `basename $d` >>"$cwd/bad"

  cd "$cwd"
done
