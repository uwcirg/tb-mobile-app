#!/bin/sh -eu

cat <<EOF
{
  "short_name": "${MANIFEST_NAME:-Asistente}",
  "name": "${MANIFEST_NAME:-Asistente}",
  "theme_color": "white",
  "icons": [
    {
      "src": "logo/manifest-icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "logo/manifest-icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ],
  "start_url": "./",
  "display": "standalone"
}

EOF
