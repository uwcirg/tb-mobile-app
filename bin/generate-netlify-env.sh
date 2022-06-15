#!/bin/sh -eu

if [[ -z $URL_API || -z $URL || -z $DEFAULT_LOCALE || -z $DOCKER_TAG  ]]; then
  echo 'one or more variables are undefined. URL_API , URL_CLIENT, DEFAULT_LOCALE, and DOCKER_TAG are required'
  exit 1
fi


cat <<EOF
const react_env = {
URL_API: "$URL_API",
URL_CLIENT:"$URL",
DEFAULT_LOCALE:"$DEFAULT_LOCALE",
DOCKER_TAG: "$DOCKER_TAG",
MATOMO_ID: "${MATOMO_ID:-not_set}",
MATOMO_URL: "${MATOMO_URL:-not_set}",
REDCAP_EOT_SURVEY_LINK: "${REDCAP_EOT_SURVEY_LINK:- }"
};
EOF