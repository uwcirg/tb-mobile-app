import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import {observer} from 'mobx-react'

const useStyles = makeStyles({
  
})

const ErrorListener = observer(() => {

    const classes = useStyles();
    const {patientStore, patientUIStore} = useStores();

    useEffect(() => {
        if(patientStore.reportStore.error){
            patientUIStore.setAlert("There was a problem uploading your report. Please try again, or contact your treatment assistant","error")
            patientStore.reportStore.clearError();
        }
       
    }, [patientStore.reportStore.error])
    return(<>

    </>)

})

export default ErrorListener;