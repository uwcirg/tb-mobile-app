import styled from "styled-components"
import { Button } from "reakit"
import { primary, white } from "../colors"

// This button does not have "behavior" by default,
// but that is something that will likely change.

// Few people install buttons that aren't intended to be used.

// A straightforward approach is to place some generic bahavior in the assembly,
// give this button a name,
// and then have the assembly respond to this button's name
// by running the behaivor.

export default styled(Button)`
  background-color: ${({active}) => active ? white : primary};
  color:            ${({active}) => active ? primary : white};

  display: inline-block;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  width: auto;

  &:hover {
    background-color: ${primary};
    color: ${white};
  }

  border-radius: 0.35em;
  border: 2px solid rgba(100, 100, 100, 0.2);

  font-weight: 400;
`
