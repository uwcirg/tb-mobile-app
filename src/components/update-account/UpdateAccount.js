import React from "react";
import { inject, observer } from "mobx-react"
import styled from "styled-components"
import Button from "../../primitives/Button"
import { grey, white } from '../../colors'

@inject('accountStore','participantStore')
@observer
export default class UpdateAccount extends React.Component {

  componentDidMount() {
    this.props.accountStore.getCurrentUserInformation();
  }

  nameChange = (e) => {
    this.props.accountStore.userInput.name = e.target.value;
  }

  phoneChange = (e) => {
    this.props.accountStore.userInput.phone_number = e.target.value;
  }

  dateChange = (e) => {
    this.props.accountStore.userInput.phone_number = e.target.value;
  }

  currentPasswordChange = (e) => {
    this.props.accountStore.currentPassword = e.target.value;
  }

  passwordOneChange = (e) => {
    this.props.accountStore.passwordUpdate.one = e.target.value;
  }

  passwordTwoChange = (e) => {
    this.props.accountStore.passwordUpdate.two = e.target.value;
  }

  handleInfoUpdate = () => {
    this.props.accountStore.updateCurrentUserInformation().then( () =>{
      this.props.participantStore.getParticipantInformation();
    });
    
  }

  handlePasswordUpdate = () => {
    this.props.accountStore.validateAndUpdatePassword();
  }

  render() {

    let translations = {
      title: this.props.assembly.translate("account_information.title"),
      account_information: this.props.assembly.translate("account_information.account_information"),
      update_password: this.props.assembly.translate("account_information.update_password"),
      password: this.props.assembly.translate("account_information.password"),
      current_password: this.props.assembly.translate("account_information.current_password"),
      verify_password: this.props.assembly.translate("account_information.verify_password"),
      new_password: this.props.assembly.translate("account_information.new_password"),
      enter: this.props.assembly.translate("account_information.enter"),
      name: this.props.assembly.translate("menu.name"),
      phone_number: this.props.assembly.translate("menu.phone_number"),
      treatment_start: this.props.assembly.translate("menu.treatment_start"),
      update_recieved: this.props.assembly.translate("account_information.update_recieved"),
      udpate_not_recieved: this.props.assembly.translate("account_information.update_not_recieved")
    }

    let accountResultColor = this.props.accountStore.accountUpdateSuccess ? "green" : "red";
    let passwordResultColor = this.props.accountStore.passwordUpdateSuccess ? "green" : "red";

    return (
      <UpdateContainer>
        <h1>{translations.title}</h1>
        <h2>{translations.account_information}</h2>
        {this.props.accountStore.accountUpdateAttempt? <ResultBox color={accountResultColor}> {this.props.accountStore.accountUpdateSuccess? 
          translations.update_recieved : translations.udpate_not_recieved} </ResultBox> : ""}
        <br></br>
        <LabeledField label={translations.name} callback={this.nameChange} value={this.props.accountStore.currentUser.name} ></LabeledField>
        <LabeledField label={translations.phone_number} callback={this.phoneChange} value={this.props.accountStore.currentUser.phone_number} ></LabeledField>
        <LabeledField label={translations.treatment_start} type="date" callback={this.dateChange} value={this.props.accountStore.currentUser.treatment_start} ></LabeledField>

        <Button onClick={this.handleInfoUpdate}>
          {translations.enter}
        </Button>
      
        <h2>{translations.update_password} </h2>
        {this.props.accountStore.passwordUpdateAttempt? <ResultBox color={passwordResultColor}>
        {this.props.accountStore.passwordUpdateSuccess? translations.update_recieved : translations.udpate_not_recieved} </ResultBox> : ""}
        <br></br>
        <LabeledField type="password" label={translations.current_password} callback={this.currentPasswordChange}></LabeledField>
        <LabeledField type="password" label={translations.new_password} callback={this.passwordOneChange}></LabeledField>
        <LabeledField type="password" label={translations.verify_password} callback={this.passwordTwoChange}></LabeledField>

        <Button onClick={this.handlePasswordUpdate}>
          {translations.enter}
        </Button>

      </UpdateContainer>

    )
  }
}

const LabeledField = props => (
  <div>
    <label>{props.label}</label>
    <br />
    <Field defaultValue={props.value} type={props.type} onChange={props.callback} />
  </div>);

const UpdateContainer = styled.div`
padding-bottom: 3em;
`

const ResultBox = styled.div`
background-color: ${props => props.color}
padding: 1em;
margin-top: 1em;
display: block;
color: white;

`
const Field = styled.input`
  background-color: ${white}
  padding: .5em;
  height: 2em;
  width: 60%;
  margin-bottom: 1rem;
  border-radius: 2px;
  border: 1px solid ${grey};
`