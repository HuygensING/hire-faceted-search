#!/bin/sh

node_modules/.bin/watchify src/index.jsx \
  --detect-globals false \
  --extension=.jsx \
  --external classnames \
  --external immutable \
  --external react \
  --outfile 'node_modules/.bin/derequire > build/index.js' \
  --standalone HireFacetedSearch \
  --transform [ babelify --plugins object-assign ] \
  --transform brfs \
  --verbose