import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Box, ButtonBase, Grid, Typography } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import Colors from '../../../Basics/Colors';

const useStyles = makeStyles({
    linkIcon: {
        color: Colors.buttonBlue,
        marginRight: ".5em",
        padding: "10px",
        borderRadius: "4px 0 0 4px"
    },
    button: {
        backgroundColor: Colors.lighterGray,
        borderRadius: "4px",
        color: Colors.textDarkGray,
        border: "solid 1px lightgray"
    }
})

const CompletionButton = ({ to, icon, text, onClick, arrowIcon }) => {

    const classes = useStyles();

    return (<ButtonBase style={{ width: "100%" }} component={to && Link} to={to} onClick={onClick}>
        <Grid wrap='nowrap' className={classes.button} alignItems='center' container>
            {React.cloneElement(icon, { className: classes.linkIcon })}
            <Box width=".5em" />
            <Typography >{text}</Typography>
            <Box flexGrow={1} />
            {arrowIcon ? arrowIcon : <KeyboardArrowRight />}
            <Box width=".5em" />
        </Grid>
    </ButtonBase>)
}

export default CompletionButton;