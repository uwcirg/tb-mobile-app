import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Styles from '../../../Basics/Styles';
import PatientPreview from './Header';
import useStores from '../../../Basics/UseStores';

const useStyles = makeStyles({
    container: {
        height: "100vh",
        width: "100%",
        backgroundColor: "white",
        borderLeft: "solid 1px lightgray",
        ...Styles.flexColumn,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    resolutionButtons: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "auto",
        marginBottom: "1em",
        "& > button": {
            flexBasis: "40%",
            margin: ".5em",
            padding: '.5em',
            "& > span": {
                fontSize: "1em",
                display: "flex",
                alignItems: "center",
            },
        }
    },
    childrenContainer: {
        width: "100%"
    }
})

const Card = observer((props) => {

    const classes = useStyles();
    const { practitionerStore } = useStores();

    return (
            <div className={classes.container}>
                {!props.isCohortView && <PatientPreview selectedPatient={practitionerStore.getSelectedPatient} />}
                <div className={classes.childrenContainer}>
                    {props.children}
                </div>
                <div className={classes.resolutionButtons}>
                    {props.buttons}
                </div>
            </div>
    )
});

export default Card;