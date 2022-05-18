import React, { useContext } from 'react';
import PatientCard from './PatientCard';
import { Box, Typography } from '@material-ui/core';
import PractitionerContext from '../PractitionerContext';
import LoadingPatients from './LoadingPatients';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    title: {
        fontSize: "1.25em"
    }
})

const AllPatientsList = () => {
    const { t } = useTranslation();

    const { value: unsortedPatients, status } = useContext(PractitionerContext).patients;
    const patients = unsortedPatients?.sort((a, b) => { return a.status.localeCompare(b.status) })

    if (status === "pending") return <LoadingPatients />;

    let currentPatientStatus;

    return (<div>

        {patients && patients.map(each => {
            let showSection = false;
            if (each.status !== currentPatientStatus) {
                showSection = true;
                currentPatientStatus = each.status;
            }
            return (
                <>
                    {showSection && <ChunkLabel>{t(`coordinator.cohortOverview.${each.status.toLowerCase()}`)}</ChunkLabel>}
                    <Box padding="8px 8px 0 8px">
                        <PatientCard isSimpleView patient={each} />
                    </Box>
                </>)
        })}
    </div>)

}

const ChunkLabel = ({ children }) => {

    const classes = useStyles();

    return (<Box padding="8px">
        <Typography className={classes.title} variant='h2'>{children}</Typography>
    </Box>)
}

export default AllPatientsList;