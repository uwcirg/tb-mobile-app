import React from "react"
import styled from "styled-components"
import {green} from "../colors"

export default class PopUp extends React.Component{

    render(){
      return(
      <PopUpIcon style={{"background-color": this.props.color || green}}>
        {this.props.number}
      </PopUpIcon>
      )}
  }



  const PopUpIcon = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;

  font-size: .75em;

  width: 15px;
  height: 15px;
  padding: 1px;
  border-radius: 5px;
  z-index: 1000;

  color: white;
  text-align: center;


`