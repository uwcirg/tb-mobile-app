import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    container: {
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        margin: "auto",
        marginTop: "10px",
        width: "93%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "1em",
        padding: ".5em",
        paddingTop: "1em",
        boxSizing: "border-box"
    },
})

const HomePageCard = (props) => {

    const classes = useStyles();

    return (<Paper id={props.id} className={`${classes.container} ${props.className}`}>
            {props.children}
        </Paper>)
}

export default HomePageCard;