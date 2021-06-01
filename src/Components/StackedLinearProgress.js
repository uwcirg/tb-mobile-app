import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Colors from '../Basics/Colors';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        position: "relative",
        margin: "1em auto",
        height: "15px",
        "& > div":{
            height: "15px",
            borderRadius: "5px"
        },
        "& > div.MuiLinearProgress-colorPrimary:first-of-type": {
            backgroundColor: "unset",
        },
        "& div:nth-of-type(1) > .MuiLinearProgress-barColorPrimary": {
            backgroundColor: Colors.approvedGreen
        },
        "& div:nth-of-type(2) > .MuiLinearProgress-barColorPrimary": {
            backgroundColor: Colors.yellow
        },
        "& > div.MuiLinearProgress-colorPrimary:nth-of-type(2)": {
            backgroundColor: Colors.warningRed
        },
    }
})

const StackedLinearProgress = ({partValue,totalValue}) => {

    const classes = useStyles();

    return (
    <div className={classes.container}>
        <LinearProgress size={40} style={{ position: "absolute", top: "0", width: "100%", zIndex: 1 }} variant={"determinate"} value={partValue} />
        <LinearProgress size={40} style={{ position: "absolute", top: "0", width: "100%", zIndex: 0 }} variant={"determinate"} value={totalValue} />
    </div>
    )

}

export default StackedLinearProgress ;