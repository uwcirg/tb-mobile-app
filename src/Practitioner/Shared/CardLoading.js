import React from 'react'
import { makeStyles, Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    container:{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

const Loading = ({height}) => {

    const classes = useStyles();

    return(<Box height={height || "3em"} className={classes.container}>
        <CircularProgress color="primary" />
    </Box>)

}

export default Loading;