import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../Basics/Colors';

const useStyles = makeStyles({
    summaryCard: {
        width: "150px",
        padding: "1em",
        boxSizing: "border-box",
        minHeight: "100px",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginRight: "1em",
        backgroundColor: props => props.cardColor || Colors.lightBlue,
        "& > .number":{
            fontSize: "2em"
        }
    }
})

const Card = (props) => {

    const classes = useStyles({ cardColor: props.color });

    return (<div className={classes.summaryCard}>
        <span className="number">{props.number}</span>
        <span className="title">{props.title}</span>
    </div>)

}

export default Card;