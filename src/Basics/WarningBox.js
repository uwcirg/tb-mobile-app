import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../Basics/Colors'

const useStyles = makeStyles({
    container: {
        border: `2px solid ${Colors.yellow}`,
        backgroundColor: Colors.timelineYellow,
        borderRadius: "10px",
        minHeight: "100px",
        padding: "1em",
        boxSizing: "border-box",
        "& > h2":{
            fontSize: "1em",
            margin: 0,
            marginBottom: ".5em"
        },
        "& > ul":{
            margin: "0",
            marginLeft: "1em",
            padding: 0,
            "& > li":{
                margin:0,
                padding: 0
            }
        },

    }
  
})

const WarningBox = (props) => {

    const classes = useStyles();

    return(<div className={`${classes.container} ${props.className}`}>
        {props.children}
    </div>)

}

export default WarningBox;