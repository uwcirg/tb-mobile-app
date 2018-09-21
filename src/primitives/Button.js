import styled from "styled-components"
import { Button } from "reakit"
import { blue, lightblue, white } from "../colors"

export default styled(Button)`
  background-color: ${blue};
  color: ${white};
  display: inline-block;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  width: auto;

  &:hover {
    background-color: ${lightblue};
  }
`
