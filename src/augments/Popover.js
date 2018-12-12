import styled from "styled-components"
import { Popover } from "reakit"
import { darkgrey } from "../colors"

Popover.Rectangle = styled(Popover)`
  width: 80%;
  background-color: white;
  border: 2px solid rgba(100, 100, 100, 0.5);
  padding: 1rem;
  color: ${darkgrey};
`
