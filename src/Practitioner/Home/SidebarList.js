import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Colors from '../../Basics/Colors'
import {DateTime} from 'luxon'

const useStyles = makeStyles({
    listContainer: {
        marginTop: "5px",
        display: "flex",
        "& > .list": {
            "& > p": {
                margin: "0 0 .5em 0",
                color: Colors.textDarkGray
            },
            flexBasis: "50%",
            display: "flex",
            flexDirection: "column",
        },
        justifyContent: "space-between"
    },
    circle: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: Colors.yellow,
        marginRight: "1em"
    },
    day: {
        display: "flex",
        flexDirection: "column",
        fontWeight: "medium",
        "& > p": {
            margin: 0,
        },
        "& > .line": {
            marginLeft: "5px",
            borderLeft: `1px solid lightgray`,
            flexGrow: "1"
        },
        "& > .day": {
            display: "flex",
            alignItems: "center",
            color: Colors.textGray
        }
    },
    container: {
        margin: "auto",
        minHeight: "100px",
        maxHeight: "200px",
        width: "90%",
        overflow: "scroll",
        overflowX: "hidden",
        "& > p": {
            paddingLeft: "1em"
        }
    },
})

const CompName = (props) => {

    const classes = useStyles();

    /*
    PropTypes:

    @TODO: Formalize these as PropTypes

    severe: boolean to show a read vs yellow dot
    dates: date to display on left
    detailsList: list to show on right 
    type: type of list being displayed


    New:

    data: [
        {date: 01-10-90, details: []}
    ]

    */

    return (
        <div className={classes.container}>
            {props.data.map(each=> {
                return (
                    <div className={classes.listContainer} key={`symptom-sidebar-container-${each}`}>
                        <div className={classes.day}>
                            <div className="day">
                                <div className={`${classes.circle} ${props.warning && classes.severe}`}> </div>
                                {DateTime.fromISO(each.date).toLocaleString(DateTime.DATE_SHORT)}
                            </div>
                            <div className="line" />
                        </div>
                        <div className="list">

                            {each.details.map((detail) => {
                                return <p key={`${props.type}-list-${detail}`}>{detail}</p>
                            })}
                        </div>
                    </div>)
            })}
        
    </div>)

}

export default CompName;