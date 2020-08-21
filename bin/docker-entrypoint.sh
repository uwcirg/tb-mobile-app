#!/bin/sh -eu
/generate-env.sh >/usr/local/apache2/htdocs/config.js
exec "$@"