import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { CircularProgress, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton'
import Home from '@material-ui/icons/Home'
import useToggle from '../../Hooks/useToggle';
import ReportSymptoms from './ReportSymptoms';

const useStyles = makeStyles({

})

const PushActionReportingFlow = observer(() => {

    const { uiStore, patientStore, patientUIStore } = useStores();
    const search = uiStore.router.location.search;

    const noIssues = search.includes("noIssues=true")
    const hadIssues = search.includes("issues=true")

    useEffect(() => {
        if (noIssues) {
            patientStore.reportStore.happyPathForToday();
            uiStore.push("/")
        }
    }, [search])

    if (hadIssues) {
        patientUIStore.moveToReportFlow();
    }
})


export default PushActionReportingFlow;