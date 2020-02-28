import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import {observer} from 'mobx-react'
import useStores from '../Basics/UseStores';
import Colors from '../Basics/Colors';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';



const AddPatient = observer(() => {

    const {practitionerStore} = useStores();
    const {t, i18n} = useTranslation('translation');

    const handleAddPatient = () =>{
        practitionerStore.onNewPatientFlow = true;
    }

    return(

        <Container>
            <h2>Add a new patient</h2>
            <Fab onClick={handleAddPatient} id="add-patient">
                <AddIcon />
            </Fab>
        </Container>
  
    )
 
});


const Container = styled.div`
position: fixed;
bottom: 1em;
right: 1em;
display: flex;

#add-patient{
margin-left: 2em;
}

h2{
    font-weight: 200;
    font-size: 1.5em;
    text-align: center;
    padding: 0;
}


`

export default AddPatient;
