import styled from "styled-components"

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  height: 100%;
  justify-content: center;
  align-items: center;

  & > :not(:last-child) {
    margin-bottom: 1rem;
  }
`

export default Layout
