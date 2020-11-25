import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Styles from './Styles'
import Paper from '@material-ui/core/Paper';
import HideIcon from '@material-ui/icons/VisibilityOff';



const useStyles = makeStyles({

    superContainer: {
        width: "100vw",

    },
    container: {
        ...Styles.modifiedPaper,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "1em",
        padding: ".5em",
        paddingTop: "1em",
    },
    upperText: {
        ...Styles.secondaryText,

        textAlign: "left",
        width: "85%",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        "& > svg":{
            fontSize: "1.25em",
            marginRight: ".25em"
        }
    },
    bottomText:{
        ...Styles.secondaryText,
        width: "90%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    }
})

const InteractionCard = (props) => {

    const classes = useStyles();

    return (<div className={classes.superContainer} >
        <span className={classes.upperText}>{props.upperText}</span>
        <Paper id={props.id} className={`${classes.container}  ${props.noPadding && classes.noPadding} ${props.className}`}>
            {props.children}
        </Paper>
        {props.bottomButton && <div className={classes.bottomText}>
            <span onClick={()=>{alert("Hide")}}> Hide This</span>
            <HideIcon style={{fontSize: "1.25em", marginLeft: ".5em"}} />
            </div>}
            
    </div>)

}

export default InteractionCard;