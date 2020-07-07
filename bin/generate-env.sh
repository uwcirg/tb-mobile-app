#!/bin/sh -eu
cat <<EOF
const react_env = {URL_API: "$URL_API",URL_CLIENT:"$URL_CLIENT",DEFAULT_LOCALE:"$DEFAULT_LOCALE"};
EOF