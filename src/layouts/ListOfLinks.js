import styled from "styled-components"
import Button from "../primitives/Button"

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  height: 100%;
  justify-content: center;
  align-items: center;

  & > ${Button}:not(:last-child) {
    margin-bottom: 2rem;
  }
`

export default Layout
