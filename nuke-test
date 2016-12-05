#!/bin/sh
# Installs the dependencies of and tests a package, and logs the bad packages
# to `bad`.
# Copyright © 2015 Tiancheng “Timothy” Gu
# MIT-licensed

# meh good enough for now
[ -f config.ini ] && \
root=$(awk -F '=' '{if (! ($0 ~ /^;/) && $0 ~ /root/) print $2}' config.ini)

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
