import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import SimpleTimePicker from '../Basics/SimpleTimePicker';
import IconButton from '@material-ui/core/IconButton';
import Exit from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import {AutoWidth} from './Containers'
import Colors from '../Basics/Colors';
import useStores from '../Basics/UseStores';

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
        marginRight: "1em",
        '&:hover': {
            backgroundColor: Colors.red
        },
    },
    ok:{
        backgroundColor: Colors.green,
        '&:hover': {
            backgroundColor: Colors.approvedGreen
        },
    },
    button:{
        borderRadius: "5px",
        color: "white"
    }
})



const TimeDialog = ({ open, value, setValue, handleCancel, closeDialog }) => {

    const classes = useStyles();

    return (
        <Dialog open={open} >
            <div className={classes.topButton}>
                <IconButton aria-label="exit" onClick={handleCancel}>
                    <Exit />
                </IconButton>
            </div>
            <Typography className={classes.title} variant="h1">What time would you like to be reminded?</Typography>
            <div className={classes.timeDialog}>
                <div className={classes.input}>
                    <SimpleTimePicker
                        value={value}
                        setValue={setValue} />
                </div>
            </div>
            <ControlButtons closeDialog={closeDialog} handleCancel={handleCancel} />
        </Dialog>)

}

const ControlButtons = ({handleCancel, closeDialog}) => {

    const classes = useStyles();
    const {patientStore} = useStores();

    const handleAccept = () => {
        patientStore.updateNotificationTime();
        closeDialog();
    }

    return (
        <AutoWidth justify="flex-end" className={classes.buttons}>
            <Button onClick={handleCancel} className={classes.cancel}><Exit /></Button>
            <Button onClick={handleAccept} className={classes.ok}><CheckIcon /></Button>
        </AutoWidth>
    )
}


const Button = (props) => {
    const classes = useStyles();
    return <IconButton {...props} className={`${classes.button} ${props.className}`} />
}

export default TimeDialog;