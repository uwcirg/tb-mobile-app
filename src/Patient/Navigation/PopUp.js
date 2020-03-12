import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Styles from '../../Basics/Styles';
import {Grid, IconButton } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';

const useStyles = makeStyles({
    container:{
        ...Styles.flexCenter,
        backgroundColor: "rgba(1,1,1,.3)",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        zIndex: "100",
        top: 0
    },
    popup:{
        ...Styles.flexColumn,
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "white",
        width: "75%",
        padding: "1em",
        minHeight: "60vh",
        borderRadius: "1em",
        position: "relative"
    },
    exit:{
        position: "absolute",
        top: 0,
        right: 0
    }
})

const PopUp = (props) => {

    const classes = useStyles();

    return (<div className={classes.container}>
    <ClickAwayListener onClickAway={props.handleClickAway}>
        <div className={classes.popup}>
            <IconButton className={classes.exit} onClick={props.handleClickAway}><Clear /></IconButton>
            {props.children}
        </div>
    </ClickAwayListener>
    </div>

)

}

export default PopUp;