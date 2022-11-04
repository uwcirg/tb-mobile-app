import React from "react";
import styled from "styled-components";

const CircularLabel = (props) => {
  return (
    <Circle>
      <span>{props.number}</span>
    </Circle>
  );
};

const Circle = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background-color: #5898e6;
  color: white;
  text-align: center;
  margin: 1em;

  span {
    display: block;
    padding-top: 6px;
    font-weight: bold;
  }
`;

export default CircularLabel;
