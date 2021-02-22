import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {observer} from 'mobx-react';
import ButtonBase from '@material-ui/core/ButtonBase'
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors';

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
    },
    activeButton:{
        backgroundColor: Colors.babyBlue
    }
})

const Sorting = observer((props) => {
    const classes = useStyles()
    const {practitionerStore} = useStores();

    const issueText = practitionerStore.sortOptions.issues === 0 ? "" : (practitionerStore.sortOptions.issues < 0 ? ": Most First" : ": Least First");
    
    return (
        <div className={classes.filtersContainer}>
            <label>Sort By: </label>
            <ul >
                <ListButton type="issues" onClick={practitionerStore.toggleIssueSort}>Issues{issueText}</ListButton>
                <ListButton onClick={practitionerStore.sortPriority}>Priority: Lowest First</ListButton>
                <ListButton onClick={practitionerStore.sortIssues}>Start Date: Oldest First</ListButton>
            </ul>
        </div>
    )
})

const ListButton = observer((props) => {

    const {practitionerStore} = useStores();
    const active = props.type && practitionerStore.sortOptions[props.type] !== 0
    const classes = useStyles();

    return (
        <li className={`${classes.filter} ${active && classes.activeButton}`}><ButtonBase onClick={props.onClick}>{props.children}</ButtonBase></li>
    )
})

export default Sorting;