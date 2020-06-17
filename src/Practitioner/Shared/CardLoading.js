import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    container:{
        width: "100%",
        height: "3em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

const Loading = () => {

    const classes = useStyles();

    return(<div className={classes.container}>
        <CircularProgress color="primary" />
    </div>)

}

export default Loading;