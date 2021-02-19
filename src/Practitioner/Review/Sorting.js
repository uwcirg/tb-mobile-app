import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase'

const useStyles = makeStyles({
    filtersContainer: {
        display: "flex",
        alignItems: "center",
        "& > ul": {
            display: "flex",
            padding: 0
        }
    },
    filter:{
        listStyle: "none",
        border: "solid 1px gray",
        borderRadius: "5px",
        marginLeft: ".5em",
        "& > button":{
            padding: "5px",
            width: "auto",
            height: "auto"
        }
    }
})

const Sorting = () => {
    const classes = useStyles()

    return (
        <div className={classes.filtersContainer}>
            <label>Sort By: </label>
            <ul >
                <ListButton>Priority: Lowest First</ListButton>
                <ListButton>Start Date: Oldest First</ListButton>
            </ul>
        </div>
    )
}

const ListButton = (props) => {
    const classes = useStyles();

    return (
        <li className={classes.filter}><ButtonBase onClick={() => { console.log("click") }}>{props.children}</ButtonBase></li>
    )
}

export default Sorting;