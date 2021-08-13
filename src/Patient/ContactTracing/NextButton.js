import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProfileButton from '../../Components/FlatButton';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    buttonContainer: {
        marginTop: "1em",
        padding: "1.5em",
        "& > button": {
            fontSize: "1em"
        }
    }
})

const NextButton = ({text,onClick}) => {

    const classes = useStyles();

    return (<Grid className={classes.buttonContainer} justify="flex-end" container spacing={1}>
                <ProfileButton onClick={onClick}>{text}</ProfileButton>
            </Grid>)
    

}

export default NextButton;