import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    subtitle:{
        fontSize: "1.375em",
        textTransform: "uppercase",
        color: Colors.textDarkGray
    }
})

const Subtitle = (props) => {
    const classes = useStyles();
    return(
        <Typography variant="h2" className={classes.subtitle}>{props.children}</Typography>
    )
}

export default Subtitle;