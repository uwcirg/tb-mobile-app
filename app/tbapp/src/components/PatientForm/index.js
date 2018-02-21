import React from 'react'
import { Form, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

const PatientForm = ({handleSubmit}) => 
    <form onSubmit={e => {
            e.preventDefault();
            handleSubmit(e)
        }}
    >
        <InputGroup>      
            <Input name='patientId' bsSize='sm' placeholder={'-- patient id --'} />
            <InputGroupAddon addonType="append"><Button color='primary' size='sm' type='submit' >
                <i className='fa fa-user' /> 
                &nbsp;Load Patient
            </Button></InputGroupAddon> 
        </InputGroup>
    </form> 

export default PatientForm