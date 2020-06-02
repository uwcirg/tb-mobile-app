import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Styles from './Styles';

const useStyles = makeStyles({
    circle: {
        background: "green",
        borderRadius: "50%",
        height: "75px",
        width: "75px"
    },
    letter:{
        color: "white",
        float: "left",
        lineHeight: 1,
        marginTop: "-0.5em",
        paddingTop: "50%",
        textAlign: "center",
        width: "100%",
        fontSize: "2em"
    }
})

export default function Icon(props){
    const classes = useStyles();
    return (
        <div className={classes.container}>
        <div className={classes.circle}>
            <p className={classes.letter}>J</p>
        </div>
        </div>
    )
}