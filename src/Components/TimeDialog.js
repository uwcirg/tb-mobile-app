import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import SimpleTimePicker from '../Basics/SimpleTimePicker';
import IconButton from '@material-ui/core/IconButton';
import Exit from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {AutoWidth} from './Containers'
import Colors from '../Basics/Colors';

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
    },
    buttons:{
        padding: "1em",
        marginTop:"2em"
    },
    cancel:{
        backgroundColor: Colors.warningRed,
        marginRight: "1em"
    },
    ok:{
        backgroundColor: Colors.green
    },
    button:{
        borderRadius: "5px",
        color: "white"
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
            <Typography className={classes.title} variant="h1">What time would you like to be notified?</Typography>
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

    const classes = useStyles();

    const handleCancel = () => {

    }

    const handleAccept = () => {

    }

    return (
        <AutoWidth justify="flex-end" className={classes.buttons}>
            <Button className={classes.cancel}><Exit /></Button>
            <Button className={classes.ok}><CheckIcon /></Button>
        </AutoWidth>
    )
}


const Button = (props) => {
    const classes = useStyles();
    return <IconButton {...props} className={`${classes.button} ${props.className}`} />
}

export default TimeDialog;