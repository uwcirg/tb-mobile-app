import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { computed } from "mobx"
import Button from "../primitives/Button"

const Survey = observer(({ store }) => (
  <div>
    {React.createElement(store.survey.currentPage, { store: store })}

    <Button width="100%" marginTop="1rem" onClick={() => store.survey.next()} >
      Continuar
    </Button>
  </div>
))

Survey.route = "/survey"
export default Survey
