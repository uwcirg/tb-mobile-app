import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'

const useStyles = makeStyles({
    customPopOver: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,.8)",
        "& > div": {
            width: "90%",
            boxSizing: "border-box",
            minHeight: "200px",
            backgroundColor: "white",
            borderRadius: "1em",
            padding: "1em"
        }
    }

})

const Welcome = () => {

    const classes = useStyles();

    useEffect(() => {
        window.scrollTo(0,0)
    },)

    return (<div className={classes.customPopOver}>
        <div>
            <p>Thanks for signing up to use Treatment Assistant!. We will now guide you through some of the core features of the application.</p>
            <p> Feel Free to Exit and revisit this tutorial at any time</p>
            <p>We are currently on the home page.</p>
        </div>
    </div>)

}

export default Welcome;