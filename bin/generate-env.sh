#!/bin/sh -eu
cat <<EOF
const react_env = {
URL_API: "$URL_API",
URL_CLIENT:"$URL_CLIENT",
DEFAULT_LOCALE:"$DEFAULT_LOCALE",
DOCKER_TAG: "$DOCKER_TAG",
MATOMO_ID: "${MATOMO_ID:-not_set}",
MATOMO_URL: "${MATOMO_URL:-not_set}",
REDCAP_EOT_SURVEY_LINK: "${REDCAP_EOT_SURVEY_LINK:- }"
INDONESIA_PILOT_FLAG: "${INDONESIA_PILOT_FLAG:- }"
};
EOF