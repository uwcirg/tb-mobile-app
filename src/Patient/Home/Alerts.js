import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    bar:{
        bottom: "70px"
    }
}));

const BottomAlert = observer(() => {
    const { patientUIStore } = useStores();
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        patientUIStore.alertVisible = false;
    };

    return (
  
            <Snackbar className={classes.bar} open={patientUIStore.alertVisible} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={patientUIStore.alertType}>
                    {patientUIStore.alertText}
        </Alert>
            </Snackbar>
    );
})

export default BottomAlert;