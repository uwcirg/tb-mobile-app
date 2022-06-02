import React from 'react';
import { Box, ButtonBase, Grid, Typography } from "@material-ui/core";
import { KeyboardArrowDown } from '@material-ui/icons';
import Colors from '../../../../Basics/Colors';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    button: {
        width: "100%",
        border: "solid 1px lightgray",
        padding: "8px 8px 8px 16px",
        borderRadius: "4px",
        boxSizing: "border-box"
    },
    focused: {
        borderColor: "transparent",
        boxShadow: `0 0 0 2px ${Colors.accentBlue}`
    }
})

export default function InputDisplay(props) {
    const classes = useStyles();

    const { value, onClick } = props;

    return (
        <ButtonBase className={classes.button} focusVisibleClassName={classes.focused} role='input' onClick={onClick}>
            <Grid alignItems='center' container>
                <Typography>{value}</Typography>
                <Box flexGrow={1} />
                <KeyboardArrowDown style={{ fontSize: "2rem", color: Colors.textDarkGray }} />
            </Grid>
        </ButtonBase>
    )
}