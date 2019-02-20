import React from "react"
import { observer } from "mobx-react"

import CircularProgressbar from "react-circular-progressbar"
import { darkgrey, white } from "../colors"

const CustomContentProgressBar = observer(({ children }) => (

    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <div style={{ position: "absolute" }}>
        <CircularProgressbar percentage={68} />
      </div>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* Text is rendered here */}
        {children}
      </div>
    </div>
))

export default CustomContentProgressBar