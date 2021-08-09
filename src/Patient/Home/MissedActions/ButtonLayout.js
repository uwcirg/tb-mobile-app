import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PhotoIcon from '@material-ui/icons/CameraAlt';
import Colors from '../../../Basics/Colors';
import Grid from '@material-ui/core/Grid';
import MissedActionCard from './MissedActionCard';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';


const useStyles = makeStyles({
    container: {
        padding: "0 1em",
    },
    icon: {
        color: props => props.buttonColor,
        marginRight: ".5em"
    },
    button: {
        marginLeft: "auto"
    }
})

const Buttonlayout = ({ icon, text, onClick, isDropdown, isOpen, color }) => {

    const classes = useStyles({buttonColor: color});

    return (
        <Grid wrap="nowrap" alignItems="center" className={classes.container} container>
            {/* <PhotoIcon className={classes.icon} /> */}
            {React.cloneElement(icon,{className: classes.icon})}
            <Typography variant="body1" color="initial">
                {text}
            </Typography><ButtonToDisplay isDropdown={isDropdown} isOpen={isOpen} />

        </Grid>)

}

const ButtonToDisplay = ({isDropdown, isOpen}) => {

    const classes = useStyles();

    let button = <KeyboardArrowRight />

    if(isDropdown && isOpen){
        let button = <KeyboardArrowDown />
    }

    return (
        <IconButton className={classes.button} aria-label="go-to-missed-photo-submission" onClick={() => { console.log("launch missed photo flow") }}>
            {button}
        </IconButton>
    )


}

export default Buttonlayout;