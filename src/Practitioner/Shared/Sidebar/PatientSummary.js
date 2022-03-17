import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores';
import Colors from '../../../Basics/Colors';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react';

const useStyles = makeStyles({
    profile: {
        alignItems: "left",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        "& > .clickable": {
            color: Colors.buttonBlue
        }
    },
    patientInfo: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    profileItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& > span, & > p": {
            margin: "0",
            padding: "0",
        },
        "& > span": {
            fontSize: "1em",
            fontWeight: "500"
        }
    },
})

const PatientDataSummmary = observer(() => {
    const classes = useStyles();
    const { practitionerStore } = useStores();
    const { t } = useTranslation('translation');

    const adherence = `${Math.floor(practitionerStore.getSelectedPatient.adherence * 100)}%`

    return (<div className={classes.patientInfo}>
                <ProfileItem text={t("coordinator.adherence")} value={adherence} />
                <ProfileItem text={t("coordinator.daysInTreatment")} value={practitionerStore.getSelectedPatient.daysInTreatment} />
                <ProfileItem text={t("coordinator.sideBar.lastContacted")} value={DateTime.fromISO(practitionerStore.getSelectedPatient.lastContacted).toLocaleString(DateTime.DATE_SHORT)} />
            </div>)
})

const ProfileItem = (props) => {
    const classes = useStyles();

    return(<div className={classes.profileItem}><span>{props.text}:</span>  <p>{props.value}</p></div>)
}

export default PatientDataSummmary;
