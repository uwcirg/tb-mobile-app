import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Styles from '../../Basics/Styles';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';


const useStyles = makeStyles({
    container: {
        ...Styles.flexCenter,
        backgroundColor: "rgba(1,1,1,.75)",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        zIndex: "100",
        top: 0
    },
    popup: {
        ...Styles.flexColumn,
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "white",
        width: "85%",
        maxWidth: "300px",
        padding: "16px",
        borderRadius: "5px",
        position: "relative",
        maxHeight: "90vh",
        overflow: "scroll"
    },
    exit: {
        position: "absolute",
        top: 0,
        right: 0
    }
})

const PopUp = (props) => {

    const classes = useStyles();

    return (<div className={classes.container}>
        <ClickAwayListener onClickAway={() => { if (props.handleClickAway) props.handleClickAway(false) }}>
            <div className={`${classes.popup} ${props.className}`}>
                <IconButton className={classes.exit} onClick={() => { if (props.handleClickAway) props.handleClickAway(true) }}><Clear /></IconButton>
                {props.children}
            </div>
        </ClickAwayListener>
    </div>

    )

}

export default PopUp;