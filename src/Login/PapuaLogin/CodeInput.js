import ReactCodeInput from "react-code-input";
import styled from "styled-components";
import Colors from "../../Basics/Colors";

const CodeInput = styled(ReactCodeInput)`
  width: 100%;
  display: flex !important;
  justify-content: space-between;
  margin: auto;
  input {
    width: 45px;
    height: 45px;
    font-size: 1.5em;
    border-radius: 5px;
    border: solid 1px lightgray;
    background-color: ${Colors.lightgray};
    padding: 0.5em;
    text-align: center;
    box-sizing: border-box;
  }
`;

export default CodeInput;
