import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Styles from '../../../Basics/Styles';
import PatientPreview from './Header';
import useStores from '../../../Basics/UseStores';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        height: "100vh",
        width: "100%",
        backgroundColor: "white",
        borderLeft: "solid 1px lightgray",
        justifyContent: "flex-start",
        alignItems: "center",
        ...Styles.flexColumn
    },
    resolutionButtons: {
        height: "75px"
    },
    childrenContainer: {
        width: "100%",
        flexGrow: 1,
        overflowY: "scroll",
    }
})

const Card = observer((props) => {

    const classes = useStyles();
    const { practitionerStore } = useStores();

    return (
            <div className={classes.container}>
                {!props.isCohortView && <PatientPreview selectedPatient={practitionerStore.getSelectedPatient} />}
                <div className={`${classes.childrenContainer} force-scrollbar`}>
                    {props.children}
                </div>
                <Grid container alignItems='center' justify='flex-end' className={classes.resolutionButtons}>
                    {props.buttons}
                </Grid>
            </div>
    )
});

export default Card;