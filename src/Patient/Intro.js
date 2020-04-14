import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container:{
        position: "fixed",
        top: 0,
        zIndex: 100,
        height: "0",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.69)"
    }

})

const Intro = () => {

    const classes = useStyles();

    return(<div className={classes.container}>

    </div>)

}

export default Intro;