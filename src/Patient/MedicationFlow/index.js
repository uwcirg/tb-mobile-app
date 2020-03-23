import React from 'react';
import { inject, observer } from 'mobx-react';
import ReportMedication from './ReportMedication'
import ReportSymptoms from './ReportSymptoms'
import ReportPhoto from './ReportPhoto'
import ReportPopUp from './ReportPopUp'
import { useTranslation } from 'react-i18next';
import OverTopBar from '../Navigation/OverTopBar'
import useStores from '../../Basics/UseStores';
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles'
import Colors from '../../Basics/Colors';
import SimpleButton from '../../Basics/SimpleButton';
import {DateTime} from 'luxon'
import {autorun,when} from 'mobx';

const useStyles = makeStyles({
    title: {
        ...Styles.flexRow,
        alignItems: "center",
        marginBottom: "1em"
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
    },
    container:{
        marginTop: "1em"
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

        //If on photo flow exit to home
        if (!patientStore.uiState.onPhotoFlow && patientStore.report.step > 0) {
            patientStore.report.step -= 1;
        } else {
            patientStore.uiState.onTreatmentFlow = false;
            patientStore.uiState.onPhotoFlow = false;
        }
    }

    const advance = () => {
        patientStore.report.step += 1
    }

    const Tabs = [<ReportMedication />, <ReportSymptoms />, <ReportPopUp />]

    const tabNumber = (patientStore.uiState.onPhotoFlow ? 3 : patientStore.report.step + 1);
    return (
        <div className={classes.container}>
            {(patientStore.report.step != 2  || patientStore.uiState.onPhotoFlow)&& <NumberedTitle number={tabNumber} title={patientStore.report.headerText} />}
            <OverTopBar title={t("report.title")} handleBack={handleBack} />
           {patientStore.uiState.onPhotoFlow ? <ReportPhoto /> : React.cloneElement(Tabs[patientStore.report.step],{advance: advance})}
        </div>)
});

export default MedicationFlow;