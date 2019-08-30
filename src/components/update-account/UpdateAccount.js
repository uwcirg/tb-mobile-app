import React from "react";
import { Input } from "reakit";
import { inject, observer } from "mobx-react"
import field from "../../util/field"
import styled from "styled-components"
import Button from "../../primitives/Button"
import {grey,white} from '../../colors'

@inject('accountStore')
@observer
export default class UpdateAccount extends React.Component {

componentDidMount(){
  this.props.accountStore.getCurrentUserInformation();
}

nameChange = (e) => {
  this.props.accountStore.userInput.name = e.target.value;
}

handleInfoUpdate = () => {
  this.props.accountStore.updateCurrentUserInformation();
}

render(){

  console.log(this.props.accountStore.userInput.name);

  return(
    <UpdateContainer>
        <h1>{this.props.assembly.translate("account_information.title")}</h1>
        <h2>{this.props.assembly.translate("account_information.account_information")}</h2>
        <Question>
            <label> Name</label>
            <br/>
            <Field onChange={this.nameChange} />
        </Question>

        <Question>
            {field(this.props.assembly, "menu.phone_number", "tel").label}
            <br/>
            {field(this.props.assembly, "menu.phone_number", "tel").field}
        </Question>

        <Question>
            {field(this.props.assembly, "menu.treatment_start", "date").label}
            <br/>
            {field(this.props.assembly, "menu.treatment_start", "date").field}
        </Question>

        <Button onClick={this.handleInfoUpdate}>
          Enviar
        </Button>

        <h2>{this.props.assembly.translate("account_information.update_password")} </h2>
        <Question>
          <Field type="password"></Field>
        </Question>
        <Question>
          <Field type="password"></Field>
        </Question>

        <Button>
          Enviar
        </Button>
    </UpdateContainer>
    
  )
}

}

const UpdateContainer = styled.div`
padding-bottom: 3em;
`

const Question = styled.div`

`

const Field = styled.input`
  background-color: ${white}
  padding: .5em;
  height: 2em;
  width: 40%;
  margin-bottom: 1rem;
  border-radius: 2px;
  border: 1px solid ${grey};
`