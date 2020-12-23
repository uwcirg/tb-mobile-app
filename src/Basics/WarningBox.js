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
            margin: ".5em 0 .5em 0"
        },
        "& > ul":{
            display: "block",
            margin: "0",
            padding: 0,
            marginLeft: "1em",
            "& > li":{
                margin:0,
                padding: 0,
                "& > span": {
                    fontWeight: "bold"
                },
                "& > li":{
                    marginLeft: "1em",
                }
                
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