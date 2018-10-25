import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { computed } from "mobx"

const Survey = observer(({ store }) => (
  <div>
    {React.createElement(store.survey.currentPage, { store: store })}

    <button onClick={() => store.survey.next()} >
      Continue
    </button>
  </div>
))

Survey.route = computed(() => "/survey" + window.store.survey.currentPage.route)
export default Survey
