import styled from "styled-components"
import { Button } from "reakit"
import { green, darkgreen, white } from "../colors"

export default styled(Button)`
  background-color: ${green};
  color: ${white};
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
