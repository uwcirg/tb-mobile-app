import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
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
    filter: {
        listStyle: "none",
        border: "solid 1px gray",
        borderRadius: "5px",
        marginLeft: ".5em",
        "& > button": {
            padding: "5px",
            width: "auto",
            height: "auto"
        }
    },
    activeButton: {
        backgroundColor: Colors.babyBlue
    }
})

const Sorting = observer((props) => {
    const classes = useStyles()
    const { practitionerStore } = useStores();

    return (
        <div className={classes.filtersContainer}>
            <label>Sort By: </label>
            <ul >
                <ListButton type="issues" >Issues</ListButton>
                <ListButton type="priority" >Priority</ListButton>
                <ListButton type="daysInTreatment">Start Date</ListButton>
                <ListButton type="adherence">Adherence</ListButton>
            </ul>
        </div>
    )
})

const ListButton = observer((props) => {

    const { practitionerStore } = useStores();
    const active = (props.type && practitionerStore.sortOptions.type === props.type) && practitionerStore.sortOptions.direction != 0;
    const classes = useStyles();
    const issueText = practitionerStore.sortOptions.direction === 0 ? "" : (practitionerStore.sortOptions.direction < 0 ? ": Most First" : ": Least First");

    return (
        <li className={`${classes.filter} ${active && classes.activeButton}`}>
            <ButtonBase
                onClick={() => { practitionerStore.toggleSort(props.type) }}
            >
                {props.children}
                {active && issueText}
            </ButtonBase></li>
    )
})

export default Sorting;