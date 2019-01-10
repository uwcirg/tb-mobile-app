import React from "react"
import Button from "./Button"
import { observer } from "mobx-react"
import styled from "styled-components"

const Toggle = observer(({current, options, onChange}) => (
  <Layout>
    {options.map(option => (
      <Button
        key={option}
        active={current() !== option}
        onClick={() => onChange(option)}
      >
        {option}
      </Button>
    ))}
  </Layout>
))

const Layout = styled.div``

export default Toggle
