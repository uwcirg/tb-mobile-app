import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Styles from '../../Basics/Styles';

const useStyles = makeStyles({
    container: {
        ...Styles.modifiedPaper,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "1em",
        padding: ".5em",
        paddingTop: "1em",
    },
})

const HomePageCard = (props) => {

    const classes = useStyles();

    return (
        <Paper id={props.id} className={`${classes.container} ${props.className}`}>
            {props.children}
        </Paper>
    )

}

export default HomePageCard;