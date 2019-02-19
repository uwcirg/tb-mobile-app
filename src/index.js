import React from "react"
import ReactDOM from "react-dom"
import registerServiceWorker from "./registerServiceWorker"

import Assembly from "./Assembly"

ReactDOM.render(
  <Assembly link={"linked_hash"} />,
  document.getElementById('root'),
)

registerServiceWorker();
