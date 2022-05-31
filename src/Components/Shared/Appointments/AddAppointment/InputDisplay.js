import React, { useState } from 'react';
import { Box, Grid, Typography } from "@material-ui/core";
import { KeyboardArrowDown } from '@material-ui/icons';
import Colors from '../../../../Basics/Colors';

export default function InputDisplay(props) {

    const { value, onClick } = props;

    const [state, setState] = useState({
        open: false
    })

    return (
        <Box role='input' onClick={onClick} padding="8px 8px 8px 16px" borderRadius="4px" border="solid 1px lightgray">
            <Grid alignItems='center' container>
                <Typography>{value}</Typography>
                <Box flexGrow={1} />
                <KeyboardArrowDown style={{ fontSize: "2em", color: Colors.textDarkGray }} />
            </Grid>

        </Box>
    )
}