import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    container: {
        borderRadius: "8px",
        boxShadow: "none",
        margin: "auto",
        marginTop: "10px",
        width: "90%",
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