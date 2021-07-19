import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import SimpleTimePicker from '../Basics/SimpleTimePicker';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import YesNoButtons from './YesNoButtons';
import Exit from '@material-ui/icons/Close';


const useStyles = makeStyles({
    timeDialog: {
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
    topButton: {
        display: "flex",
        justifyContent: "flex-end"
    },
    title:{
        padding: "1em"
    }
})

const TimeDialog = ({ open, value, setValue, handleCancel, handleAccept, title}) => {

    const classes = useStyles();

    return (
        <Dialog open={open} >
            <div className={classes.topButton}>
                <IconButton aria-label="exit" onClick={handleCancel}>
                    <Exit />
                </IconButton>
            </div>
            <Typography className={classes.title} variant="h1">{title}</Typography>
            <div className={classes.timeDialog}>
                <div className={classes.input}>
                    <SimpleTimePicker
                        value={value}
                        setValue={setValue} />
                </div>
            </div>
            <YesNoButtons handleAccept={handleAccept} handleCancel={handleCancel} />
        </Dialog>)
}

export default TimeDialog;