import React from "react"

import Button from "./Button"
import { observer } from "mobx-react"
import styled from "styled-components"

// "What is your answer?"
// * Option A
// * Option B
//
// looks like:
//
// <Selection
//   // How to tell what option is selected
//   update={() => store.language}
//   options={["Español", "English"]}
//   onChange={(selection) => store.language = selection}
// />

const Selection = observer(({update, options, onChange}) => (
  <Layout>
    {options.map(option => (
      <Button
        key={option}
        active={update() !== option}
        onClick={() => onChange(option)}
      >
        {option}
      </Button>
    ))}
  </Layout>
))

const Layout = styled.div``

export default Selection
