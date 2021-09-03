import React from 'react';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Colors from '../../../Basics/Colors';

const useStyles = makeStyles({
    container: {
        padding: "0 1em",
    },
    icon: {
        color: props => props.buttonColor || Colors.buttonBlue,
        marginRight: ".5em"
    },
    button: {
        marginLeft: "auto",
        padding: ".5em"
    },
    text: {
        lineHeight: "1.25em",
        textTransform: "capitalize",
        padding: ".5em 0"
    }
})

const ButtonLayout = ({ icon, text, onClick, isDropdownOpen, color }) => {

    const classes = useStyles({ buttonColor: color });

    return (
        <Grid wrap="nowrap" alignItems="center" className={classes.container} container onClick={onClick}>
            {React.cloneElement(icon, { className: classes.icon })}
            <Typography className={classes.text} variant="body1" color="initial">
                {text}
            </Typography><ButtonToDisplay isDropdownOpen={isDropdownOpen} />
        </Grid>)
}

const ButtonToDisplay = ({ isDropdownOpen = null }) => {

    const classes = useStyles();

    let button = <KeyboardArrowRight />

    if (isDropdownOpen === null ) {
    
    }else{
        button = isDropdownOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />;
    }
    
    return (
        <IconButton className={classes.button} aria-label="go-to-missed-photo-submission">
            {button}
        </IconButton>
    )


}

export default ButtonLayout;