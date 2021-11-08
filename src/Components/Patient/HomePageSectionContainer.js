import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles';

const useStyles = makeStyles({
    superContainer: {
        width: "100%",

    },
    upperText: {
        ...Styles.secondaryText,
        fontSize: ".8em",
        textAlign: "left",
        width: "93%",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        "& > svg": {
            fontSize: "1.25em",
            marginRight: ".25em"
        }
    },
})

const HomePageSectionContainer = (props) => {

    const classes = useStyles();

    return (<div className={classes.superContainer} >
        {props.upperText && <span className={classes.upperText}>{props.upperText}</span>}
        {props.children}
    </div>)

}

export default HomePageSectionContainer;