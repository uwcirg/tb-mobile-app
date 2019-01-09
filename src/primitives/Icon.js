import React from "react"
import Icon from "@mdi/react"

// Loads in a flash!
// Don't blink, or you'll miss it.

// It also has a bit of an attitude.

// Example import of an icon, through webPack.
// We'll need to load things a bit differently,
// depending on the requested icon.
import { mdiWeb } from "@mdi/js"

const NimbleIcon = ({ name, mdi }) => (
  <Icon
    path={mdiWeb}
    size={1}
  />
)

export default NimbleIcon
