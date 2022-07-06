#!/bin/sh -eu
/generate-manifest.sh >/usr/local/apache2/htdocs/manifest.json;
/generate-env.sh >/usr/local/apache2/htdocs/config.js;
echo "Entrypoint complete"
exec "$@"