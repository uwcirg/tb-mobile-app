import React from "react"

// UI Primitives
import { Box } from "reakit"

const TopBar = ({ header }) => (
  <Box sticky>
    <h3>{ header }</h3>
  </Box>
)

export default TopBar;
