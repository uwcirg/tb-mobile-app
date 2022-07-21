#!/bin/sh

REPLACE_REGEX=$(cat <<EOF
s|%MANIFEST_ICONS_FOLDER%|${MANIFEST_ICONS_FOLDER:-/logo}|g;
s|%HTML_APP_TITLE%|${HTML_APP_TITLE:-Treatment Assistant}|g;
EOF
)

echo "Script ls"
ls

echo "Build ls"
ls ./build

perl -pi -w -e "$REPLACE_REGEX" build/index.html