#!/bin/sh -e

# Use: URL_API="test" URL="test" DEFAULT_LOCALE="test" DOCKER_TAG="test" bin/generate-netlify-env.sh

if [[ -z $URL_API || -z $URL || -z $DEFAULT_LOCALE || -z $DOCKER_TAG  ]]; then
  echo 'one or more variables are undefined. URL_API , URL, DEFAULT_LOCALE, and DOCKER_TAG are required'
  exit 1
fi

cat <<EOF
const react_env = {
URL_API: "/api",
URL_CLIENT:"$URL",
DEFAULT_LOCALE:"$DEFAULT_LOCALE",
DOCKER_TAG: "$DOCKER_TAG",
MATOMO_ID: "${MATOMO_ID:-not_set}",
MATOMO_URL: "${MATOMO_URL:-not_set}",
REDCAP_EOT_SURVEY_LINK: "${REDCAP_EOT_SURVEY_LINK:- }",
INDONESIA_PILOT_FLAG: "${INDONESIA_PILOT_FLAG:- }",
MANIFEST_ICONS_FOLDER: "${MANIFEST_ICONS_FOLDER:-/logos/ar}"
};
EOF