#!/bin/sh

REPLACE_REGEX=$(cat <<EOF
s|%MANIFEST_ICONS_FOLDER%|${MANIFEST_ICONS_FOLDER:-/logo}|g;
s|%HTML_APP_TITLE%|${HTML_APP_TITLE:-Treatment Assistant}|g;
EOF
)


perl -pi -w -e "$REPLACE_REGEX" $1/index.html