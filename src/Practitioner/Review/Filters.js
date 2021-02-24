import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import SearchBar from '../../Basics/SearchBar'
import { observer } from 'mobx-react'
import useStores from '../../Basics/UseStores'

const useStyles = makeStyles({
    filtersContainer: {
        display: "flex",
        alignItems: "center",
        "& > ul": {
            display: "flex",
            padding: 0,
        },
        "& > label": {
            marginLeft: "1em"
        }
    },
    filter: {
        listStyle: "none",
        border: "solid 1px gray",
        borderRadius: "5px",
        marginLeft: ".5em",
        "& > button": {
            padding: "5px",
            width: "auto",
            height: "auto",
            fontSize: ".9em"
        }
    },
    search: {
        width: "unset",
        margin: 0
    }
})

const Filters = observer(() => {
    const classes = useStyles()
    const { practitionerStore } = useStores();

    //onChange={(e)=>{practitionerStore.setFilterQuery(e)}}
    return (
        <div className={classes.filtersContainer}>
            <SearchBar
                className={classes.search}
                placeholder="Search Patient"
                kind="patient"
                handleChange={(e) => {
                    practitionerStore.setFilterQuery(e.target.value)
                }
                } />

            <label>Filters: </label>
            <ul >
                <ListButton>Has Issues</ListButton>
                <ListButton>High Priority</ListButton>
                <ListButton>Needs Review</ListButton>
            </ul>
        </div>
    )
})

const ListButton = (props) => {
    const classes = useStyles();

    return (
        <li className={classes.filter}><ButtonBase onClick={() => { console.log("click") }}>{props.children}</ButtonBase></li>
    )
}

export default Filters;