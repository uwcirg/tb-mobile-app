import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Check from '@material-ui/icons/Check';
import Styles from '../Basics/Styles';
import Colors from '../Basics/Colors';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    button: {
        ...Styles.buttonBase,
        border: `1px solid ${Colors.buttonBlue}`,
        color: Colors.buttonBlue,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box"
    },
    rightIcon: {
        marginLeft: "auto"
    },
    text: {
        margin: "0 1em 0 1em",
        textAlign: "left"
    },
    positive: {
        color: Colors.approvedGreen,
        border: `1px solid ${Colors.approvedGreen}`,
    }

})

const NewButton = ({ onClick, href, positive, className, text, hideArrow, icon, to }) => {

    const classes = useStyles();

    if (to) return (<ButtonBase component={Link} to={to} className={`${classes.button} ${positive && classes.positive} ${className && className}`}>
        {icon}
        <span className={classes.text}>{text}</span>
        {!hideArrow && <>{positive ? <Check className={classes.rightIcon} /> : <ChevronRight className={`${classes.rightIcon} rightIcon`} />}</>}
    </ButtonBase>)

    return (<ButtonBase onClick={onClick} href={href} className={`${classes.button} ${positive && classes.positive} ${className && className}`}>
        {icon}
        <span className={classes.text}>{text}</span>
        {!hideArrow && <>{positive ? <Check className={classes.rightIcon} /> : <ChevronRight className={`${classes.rightIcon} rightIcon`} />}</>}
    </ButtonBase>)

}

export default NewButton;