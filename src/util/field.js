import React from "react"
import styled from "styled-components"
import { Input } from "reakit";
import { grey, white } from "../colors"

const field = (assembly, tag, type) => ({
  label:
    <label htmlFor={tag}>
      {assembly.translate(tag)}
    </label>
  ,

  field:
    <Field
      type={type || "text"}
      name={tag}
      value={assembly.fetch(tag)}
      onChange={(e) => {
        assembly.set(tag, e.target.value)
      }}
      as={type === "textarea" ? "textarea" : null}
    />
  ,
})

const Field = styled(Input)`
  background-color: ${white}
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 2px;
  border: 1px solid ${grey};
`

export default field
