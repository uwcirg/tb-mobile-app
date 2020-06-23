import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import AddPatient from './AddPatient';

const useStyles = makeStyles({
    sidebar: {
        width: "25vw",
        height: "100vh",
        border: "solid 2px lightgray",
        marginLeft: "auto",
        padding: "1em",
        boxSizing: "border-box"
    }
})

const CohortSideBar = observer((props) => {

    const classes = useStyles();
    const { practitionerStore } = useStores();

    return (
        <div className={classes.sidebar}>
            {practitionerStore.onAddPatientFlow ? <AddPatient /> :<p>Cohort overview</p>}
        </div>
    )
})

export default CohortSideBar;