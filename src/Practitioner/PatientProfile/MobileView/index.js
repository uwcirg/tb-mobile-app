import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import StickyTopBar from '../../../Components/Shared/StickyTopBar';
import { Box, Grid, Typography } from '@material-ui/core';
import Colors from '../../../Basics/Colors';
import Priority from '../../Shared/Priority';
import ButtonList from './Buttons';
import Label from '../../../Components/Label';
import { PageLabel } from '../../../Components/Shared/PageLabel';
import { DateTime } from 'luxon';
import { Switch, Route } from 'react-router-dom';
import ReportingPopOver from '../../Shared/ReportingPopOver'
import { useHistory } from 'react-router-dom';
import ReportingHistoryLinks from '../../../Components/Shared/ReportingHistoryLinks';
import SectionTitle from './SectionTitle';
import PhotoAdherence from '../PhotoAdherence';
import MedicationAdherence from '../MedicationAdherence';

import { useTranslation } from 'react-i18next';
import SymptomSummary from '../SymptomSummary';

const useStyles = makeStyles({
    card: {
        "&:not(:first-child)": {
            marginTop: ".5em"
        }
    }
})

const Card = ({ children }) => {

    const classes = useStyles();

    return <Box className={classes.card} padding="1em" borderRadius="4px" bgcolor={"white"} >
        {children}
    </Box>

}

const MobilePatientProfile = observer(() => {

    const { patientProfileStore } = useStores();
    const history = useHistory();


    return (
        <Switch>
            <Route path="*/reports">
                <ReportingPopOver handleExit={() => { history.push(`/patients/${patientProfileStore.selectedPatient.details.id}`) }} patient={patientProfileStore.selectedPatient.details} />
            </Route>
            <Route>
                <MobileView />
            </Route>
        </Switch>
    )
})

const MobileView = observer(() => {

    const { t } = useTranslation('translation');
    const { patientProfileStore } = useStores();
    const { fullName, lastReport, weeksInTreatment, priority, id } = patientProfileStore.selectedPatient.details
    const daysAgo = !!lastReport ? Math.round(DateTime.fromISO(lastReport.createdAt).diffNow('days').days) * -1 : t('coordinator.tasksSidebar.noneYet')

    return (
        <>
            <StickyTopBar>
                <PageLabel title={fullName} to={"/home/needs-review"} />
            </StickyTopBar>
            <Box minHeight="90vh" bgcolor={Colors.lightgray} padding="8px">
                <Card>
                    <SectionTitle>Details:</SectionTitle>
                    <Box padding="8px" bgcolor={Colors.lighterGray}>
                    <Grid wrap="nowrap" container>
                        <Typography>{t('coordinator.patientProfile.lastReport')}:</Typography>
                        <Box flexGrow={1} />
                        <Box width={"8px"} />
                        <Typography>{daysAgo} {t('time.day_ago', { count: daysAgo })}</Typography>
                    </Grid>
                    <Box height={"5px"} />
                    <Grid container>
                        <Typography>{t('coordinator.patientTableLabels.priority')}:</Typography>
                        <Box width={"8px"} />
                        <Box flexGrow={1} />
                        <Priority index={priority} />
                    </Grid>
                    <Box height={"5px"} />
                    <Grid container>
                        <Typography>{t('mobileUpdate.treatment')}:</Typography>
                        <Box width={"8px"} />
                        <Box flexGrow={1} />
                        <Label text={`Week ${weeksInTreatment} / 26`} backgroundColor={Colors.accentBlue} />
                    </Grid>
                    </Box>
                    <Box height="1em" />
                    <SectionTitle>Reporting History:</SectionTitle>
                    <Box height="8px" />
                    <ReportingHistoryLinks patient={patientProfileStore.selectedPatient.details} />
                </Card>
                <Card>
                    <ButtonList />
                </Card>
                <Card>
                    <MedicationAdherence />
                    <PhotoAdherence />
                </Card>
                <Box height="60px" aria-hidden />
            </Box>
        </>)

});

/*
adherence: (...)
age: (...)
appStartTime: (...)
channelId: (...)
contactTracingSurvey: (...)
daysInTreatment: (...)
familyName: (...)
fullName: (...)
gender: (...)
givenName: (...)
id: (...)
lastContacted: (...)
lastMissedDay: (...)
lastReport: (...)
lastSymptoms: (...)
medicationSummary: (...)
organizationId: (...)
percentageComplete: (...)
phoneNumber: (...)
photoAdherence: (...)
photoSummary: (...)
priority: (...)
reportingStatus: (...)
status: (...)
supportRequests: (...)
treatmentEndDate: (...)
treatmentStart: (...)
weeksInTreatment: (...)
*/

export default MobilePatientProfile;