import React, {useEffect} from 'react'
import useStores from '../Basics/UseStores';
import {observer} from 'mobx-react'

//Utility component to handle errors from stores and pass them to UIStore for display
const ErrorListener = observer(() => {

    const {patientStore, patientUIStore} = useStores();

    //Listen for report errors, send to UI store general error handler
    useEffect(() => {
        if(patientStore.reportStore.error){
            patientUIStore.setAlert("There was a problem uploading your report. Please try again, or contact your treatment assistant","error")
            patientStore.reportStore.clearError();
        }
       
    }, [patientStore.reportStore.error])
    return(<></>)

})

export default ErrorListener;