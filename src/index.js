import React from "react"
import ReactDOM from "react-dom"
import registerServiceWorker from "./registerServiceWorker"

import Assemble from "./Assemble"

ReactDOM.render(
  <Assemble link={"linked_hash"} />,
  document.getElementById('root'),
)

registerServiceWorker();
