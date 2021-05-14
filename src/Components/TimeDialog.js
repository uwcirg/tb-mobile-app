import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import SimpleTimePicker from '../Basics/SimpleTimePicker';
import IconButton from '@material-ui/core/IconButton';
import Exit from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography'

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
            <Typography variant="h1">What time would you like to be notified?</Typography>
            <div className={classes.timeDialog}>
                <div className={classes.input}>
                    <SimpleTimePicker
                        value={value}
                        setValue={setValue} />
                </div>
            </div>
        <ControlButtons />
        </Dialog>)

}

const ControlButtons = () => {
    return(
        <div>
            <IconButton>
                <CheckIcon />
            </IconButton>
            <IconButton>
                <Exit />
            </IconButton>
        </div>
    )
}

export default TimeDialog;