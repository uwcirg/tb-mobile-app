import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
    const useStyles = makeStyles({
        sidebar: {
            width: "25vw",
            height: "100vh",
            backgroundColor: "lightgray",
            marginLeft: "auto"
        }
    })

const CohortSideBar = (props) =>{

    const classes = useStyles();

    return(
        <div className={classes.sidebar}>

        </div>
    )
}

export default CohortSideBar;