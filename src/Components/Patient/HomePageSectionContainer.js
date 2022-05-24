import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles';

const useStyles = makeStyles({
    superContainer: {
        width: "100%",

    },
    upperText: {
        ...Styles.secondaryText,
        paddingLeft: "8px",
        fontSize: ".8rem",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        "& > svg": {
            fontSize: "1.25rem",
            marginRight: ".25rem"
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