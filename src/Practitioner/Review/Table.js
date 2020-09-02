import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import ButtonBase from '@material-ui/core/ButtonBase'
import Details from '@material-ui/icons/KeyboardArrowDown';
import Row from './Row'
import Colors from '../../Basics/Colors';

const COLUMNS = ["expand", "name", "priority", "submitted", "symptoms", "feeling", "medication", "strip"]

const useStyles = makeStyles({
    table: {
        width: "100%",
        minHeight: "200px",
        "& > * .submitted": {
            width: '5%'
        },
        "& > * .symptoms": {

        },

    },
    tableTitles: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: "1em",
    },
    title: {
        textAlign: "left",
        fontSize: "1em",
        textTransform: "capitalize",
    },
    titleButton: {
        justifyContent: "flex-start",
        marginRight: ".5em"
    },
    expand: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        color: Colors.buttonBlue,
        fontSize: "1.25em",
        padding: "1em"
    },
    common: {
        display: "flex",
        flexBasis: "15%",
        "& > button": {
            flexBasis: "50%",
        },
    },
    report: {
        display: "flex",
        justifyContent: "flex-start",
        flexGrow: 1,
        "& > button": {
            flexGrow: 1
        }
    }

})


const Table = observer(() => {

    const classes = useStyles();
    const { practitionerStore, dashboardStore } = useStores();
    const [full, setFull] = useState(false);
    const toggleShowFull = () => {
        setFull(!full)
    }

    return (<div className={classes.table}>
        <Titles />
        <>
            {dashboardStore.patientList.length > 0 && dashboardStore.patientList.slice(0, full ? dashboardStore.patients.length : 5).map(patient => {
                return (<Row columns={COLUMNS} patient={patient} />)
            })}
            <div className={classes.expand}>
                <ButtonBase onClick={toggleShowFull}> {!full ? <>5 / {dashboardStore.patientList.length} Shown. Show All</> : <>Show Less</>}</ButtonBase>
            </div>
        </>
    </div>)

})


const Titles = () => {
    const classes = useStyles();
    return (
        <div className={classes.tableTitles}>
            <Title text="Expand" disabled />
            <div className={classes.common}>

                {COLUMNS.slice(1, 3).map(each => {
                    return <Title text={each} />
                })}
            </div>

            <div className={classes.report}>
                {COLUMNS.slice(3, COLUMNS.length).map(each => {
                    return <Title text={each} />
                })}
            </div>
        </div>
    )
}

const Title = (props) => {
    const classes = useStyles();
    return (
        <ButtonBase className={`${classes.titleButton} ${props.text}`}>
            <span className={classes.title}>{props.text}</span>
            {!props.disabled && <Details className={classes.details} />}
        </ButtonBase>
    )

}

export default Table;