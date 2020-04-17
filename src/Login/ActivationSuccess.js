import React from 'react';
import {PasswordInput,ActivationForm,Card,IdentifierInput} from './StyledInputs';
import Button from '@material-ui/core/Button';
import {observer} from 'mobx-react';
import useStores from '../Basics/UseStores';

const ActivationSuccess = observer(() => {

    const {loginStore,patientStore} = useStores();

    const updateStore = (event,id) => {
        loginStore.activationBody[id] = event.target.value
    }

    const handleLogin = () => {
        loginStore.activatePatient().then( loginSuccess => {
            patientStore.isLoggedIn = loginSuccess;
            patientStore.initalize();
        });
    }

    return(
        <ActivationForm>
            <Card>
                <IdentifierInput defaultValue="Username" updateIdentifier={(e) => {updateStore(e,"username")}} />
                <PasswordInput updatePassword={(e) => {updateStore(e,"password")}}/>
                <PasswordInput updatePassword={(e) => {updateStore(e,"passwordConfirmation")}} confirmation />
            </Card>
            <Button onClick={handleLogin} variant="contained" color={"primary"} >Complete!</Button>
        </ActivationForm>
    )
});

export default ActivationSuccess;