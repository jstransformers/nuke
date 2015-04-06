# nuke (Better name welcome)

Batch editing tools for repos under jstransformers organization.

## clone.js

Clones all interesting repos under the jstransformers organization.

If a directory with the name of the repo already exists and is not empty then
it is skipped.

If the root directory is not specified, `config.ini` is read to see if it is
set there. If it is not, then the repos are cloned in the current directory.

## david.js

Checks the dependency status of all packages, and outputs a nice table to the
console. This does not require cloning all the repos first.

## list.js

List all interesting repos under the jstransformers organization. This does not
require to cloning all the repos first.

## test.sh

Installs and tests all cloned repos, and log the failed ones to file `bad` in
the current working directory.

The root directory of the cloned repos can be specified in `config.ini`.

## config.ini

This file is currently only used to set the root directory for all repos. An
example file is available at `config.ini.in`.
