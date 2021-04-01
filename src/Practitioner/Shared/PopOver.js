import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography'
import ClickAway from '@material-ui/core/ClickAwayListener'

const useStyles = makeStyles({
    superContainer: {
        zIndex: "100",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        backgroundColor: "white",
        width: props => props.fullWidth ? "unset" : "25%",
        minHeight: "25%",
        minWidth: "350px",
        padding: "1em",
    },
    header:{
        display: "flex",
        alignItems: "center",
        "& > h2": {
            fontSize: "1.25em",
            marginRight: "auto"
        }
    }

})

const PopOver = (props) => {
    const classes = useStyles({fullWidth: props.fullWidth});

    return (<div className={classes.superContainer}>
        <ClickAway onClickAway={props.close}>
            <div className={classes.container}>
            <div className={classes.header}>
                <Typography variant="h2">{props.title}</Typography>
                <IconButton onClick={props.close}><Clear /> </IconButton>
            </div>
            {props.children}</div>
        </ClickAway>

    </div>)

}

PopOver.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
    close: PropTypes.func
  };

export default PopOver;