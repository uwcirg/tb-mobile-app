import React from 'react';
import { inject, observer } from 'mobx-react';
import ReportMedication from './ReportMedication'
import ReportSymptoms from './ReportSymptoms'
import ReportPhoto from './ReportPhoto'
import ReportConfirmation from './ReportConfirmation'
import { useTranslation } from 'react-i18next';
import OverTopBar from '../Navigation/OverTopBar'
import useStores from '../../Basics/UseStores';
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles'
import Colors from '../../Basics/Colors';
import SimpleButton from '../../Basics/SimpleButton';

const useStyles = makeStyles({
    title: {
        ...Styles.flexRow,
        alignItems: "center"
    },
    titleText: {
        marginLeft: "1em"
    },
    number: {
        ...Styles.flexCenter,
        height: "30px",
        width: "30px",
        borderRadius: "15px",
        backgroundColor: Colors.accentBlue,
        color: "white",
        marginLeft: "1em"
    },
    innerNumber: {
        display: "block",
        textAlign: "center"
    }
});


const NumberedTitle = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.title}>
            <div className={classes.number}><span className={classes.innerNumber} >{props.number}</span></div>
            <span className={classes.titleText}>{props.title}</span>
        </div>
    )
}

const MedicationFlow = observer((props) => {
    const classes = useStyles();
    const { patientStore, uiStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    const handleBack = () => {
        if (patientStore.medicationStep > 0) {
            patientStore.medicationStep -= 1;
        } else {
            patientStore.onTreatmentFlow = false;
        }
    }

    const advance = () => {
        patientStore.medicationStep += 1
    }

    const Tabs = [<ReportMedication />, <ReportSymptoms />, <ReportConfirmation />, <ReportPhoto />,]

    return (
        <>
            <NumberedTitle number={patientStore.medicationStep + 1} title={patientStore.report.headerText} />
            <OverTopBar title={t("report.title")} handleBack={handleBack} />
            {React.cloneElement(Tabs[patientStore.medicationStep],{advance: advance})}
        </>)
});

export default MedicationFlow;