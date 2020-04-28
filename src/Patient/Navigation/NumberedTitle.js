import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles'
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    title: {
        ...Styles.flexRow,
        alignItems: "center",
        marginBottom: "1em"
    },
    titleText: {
        marginLeft: "1em"
    },
    number: {
        ...Styles.flexCenter,
        height: "30px",
        width: "30px",
        borderRadius: "15px",
        backgroundColor: Colors.accentBlue,
        color: "white",
        marginLeft: "1em"
    },
    innerNumber: {
        display: "block",
        textAlign: "center"
    }
});

const NumberedTitle = (props) => {
    const classes = useStyles();
    return (
        <div className={`${classes.title} ${props.className && props.className}`}>
            <div className={classes.number}><span className={classes.innerNumber} >{props.number}</span></div>
            <span className={classes.titleText}>{props.title}</span>
        </div>
    )
}

export default NumberedTitle;