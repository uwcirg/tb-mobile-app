import React from "react";
import "./every-layout.css";

export default function Grid({ children, style = {} }) {
  return (
    <div className="grid" style={style}>
      {children}
    </div>
  );
}
