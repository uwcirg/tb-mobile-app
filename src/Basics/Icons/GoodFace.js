import React from "react";
import image from "./smile.svg";

export default function GoodFace(props) {
  return (
    <>
      <img className={props.className} src={image} />
    </>
  );
}
