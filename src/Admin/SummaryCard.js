import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../Basics/Colors';

const useStyles = makeStyles({
    summaryCard: {
        width: "150px",
        padding: ".5em",
        boxSizing: "border-box",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginRight: "1em",
        "& > .number":{
            fontSize: "2em"
        },
        position: "relative"
    },
    background:{
        backgroundColor: props => props.cardColor || Colors.buttonBlue,
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left:0,
        zIndex: "-1",
        borderRadius: "5px",
        opacity: "75%"
    }
})

const Card = (props) => {

    const classes = useStyles({ cardColor: props.color });

    return (<div className={classes.summaryCard}>
        <span className="number">{props.number}</span>
        <span className="title">{props.title}</span>
        <div className={classes.background} />
    </div>)

}

export default Card;