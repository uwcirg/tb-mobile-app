import styled from "styled-components"
import { Button } from "reakit"
import { green, darkgreen, white } from "../colors"

// This button does not have "behavior" by default,
// but that is something that will likely change.

// Few people install buttons
// that aren't intended to be used.

// A straightforward approach is to place some generic bahavior in the store,
// give this button a name,
// and then have the store respond to this button's name
// by running the behaivor.

export default styled(Button)`
  background-color: ${({active}) => active ? white : green};
  color:            ${({active}) => active ? green : white};

  display: inline-block;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  width: auto;

  &:hover {
    background-color: ${darkgreen};
  }

  border-radius: 2px;
  border: 2px solid rgba(100, 100, 100, 0.2);
`
