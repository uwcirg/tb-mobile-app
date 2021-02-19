import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'

const useStyles = makeStyles({
    reportContainer:{
        margin: "1em"
    }
})

const Report = (props) => {

    const classes = useStyles();

    return(<div className={classes.reportContainer}>

    </div>)

}

export default Report;