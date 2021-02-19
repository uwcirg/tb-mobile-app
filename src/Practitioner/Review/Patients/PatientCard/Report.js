import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
// import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import Colors from '../../../../Basics/Colors';


const useStyles = makeStyles({
    reportContainer:{
        padding: ".5em",
        width: "auto",
    },
    coloredBox:{
        display: "block",
        width: "30px",
        height: "30px",
        borderRadius: "5px",
        backgroundColor: props => props.color || Colors.approvedGreen
    },
    reportItem:{
        display: "flex",
        alignItems: "center",
        "& > p":{
            marginLeft: "5px"
        }
    }
})

const Report = (props) => {

    const classes = useStyles();

    return(<div className={classes.reportContainer}>
        {props.report ? "Submitted" : <NotSubmitted />}
    </div>)

}

const NotSubmitted = () => {
    const classes = useStyles();
    return(
        <div style={{display: "flex", flexDirection:"row"}}>
        <div className={classes.reportItem}> <ColoredBox color={Colors.yellow} /> <p>Report Not Yet Submitted</p> </div>
        </div>
    )
}

const ColoredBox = (props) => {
    const classes = useStyles({color: props.color});
    return(
        <span className={classes.coloredBox}>

        </span>
    )
}

export default Report;