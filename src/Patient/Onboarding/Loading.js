import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    container: {
        height: "50vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

const Loading = () => {

    const classes = useStyles();

    return (<div className={classes.container}>
        <div>
            <CircularProgress />
        </div>
    </div>)

}

export default Loading;