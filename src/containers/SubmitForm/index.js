import React from 'react'
// import PatientForm from '../../components/PatientForm'

import { Form, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { reduxForm, Field } from 'redux-form'

let PatientForm = ({handleSubmit}) => 
    <Form onSubmit={handleSubmit}>
        <InputGroup>      
            <Field name='patientId' bsSize='sm' placeholder={'-- patient id --'} />
            <InputGroupAddon addonType="append"><Button color='primary' size='sm' type='submit' >
                <i className='fa fa-user' /> 
                &nbsp;Load Patient
            </Button></InputGroupAddon> 
        </InputGroup>
    </Form> 

const SubmitForm = reduxForm({
  // a unique name for the form
  form: 'patient'
})(PatientForm)

export default SubmitForm