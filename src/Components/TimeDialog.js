import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import SimpleTimePicker from '../Basics/SimpleTimePicker';
import IconButton from '@material-ui/core/IconButton';
import Exit from '@material-ui/icons/Cancel'
import { ExitToApp } from '@material-ui/icons';

const useStyles = makeStyles({
    timeDialog: {
        height: "50vh",
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    topButton:{
        display: "flex",
        justifyContent: "flex-end"
    }
})



const TimeDialog = ({ open, value, setValue, handleCancel }) => {

    const classes = useStyles();

    return (
        <Dialog open={open} >
            <div className={classes.topButton}>
                <IconButton aria-label="exit" onClick={handleCancel}>
                    <Exit />
                </IconButton>
            </div>

            <div className={classes.timeDialog}>
                <div className={classes.input}>
                    <SimpleTimePicker
                        value={value}
                        setValue={setValue} />
                </div>
            </div>

        </Dialog>)

}

export default TimeDialog;