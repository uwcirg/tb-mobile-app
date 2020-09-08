import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../Basics/Colors'
import Fab from '@material-ui/core/Fab'
import PlusIcon from '@material-ui/icons/Add'

const useStyles = makeStyles({
    addTopic:{
        padding: "1em 0 1em 0",
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        "& > button > svg":{
            color: Colors.buttonBlue
        }
    }
})

const AddTopic = () => {

    const classes = useStyles();

    return(<div className={classes.addTopic}> Add Discussion Topic <Fab><PlusIcon /></Fab></div>)

}

export default AddTopic;