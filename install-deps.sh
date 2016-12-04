#!/bin/bash

# http://stackoverflow.com/questions/6593531/running-a-limited-number-of-child-processes-in-parallel-in-bash#answer-14387296

MAX=5

function max2 {
  while [ $(jobs | wc -l) -ge $(( $MAX - 1 )) ]; do
    sleep 2
  done
}

for directory in $(ls); do
  cd $directory
  echo $directory
  # max2; (yarn install --ignore-engines > /dev/null 2>&1 && rm yarn.lock) &
  max2; (yarn install --ignore-engines && rm yarn.lock) &
  cd ..
done

wait
