import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores'
import OverTopBar from '../Navigation/OverTopBar';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@material-ui/icons/Clear'
import { Typography } from '@material-ui/core';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import {DateTime} from 'luxon';

const useStyles = makeStyles({
    patientInfo: {
        ...Styles.flexRow,
        "& > div":{
            width: "50%",
        }
    },

    photoContainer:{
        width: "100px",
        height: "100px",
        borderRadius: "50px",
        backgroundColor: Colors.accentBlue,
        position: "relative",
        color: "white",
        marginLeft: "auto"
    },
    photo:{
        fontSize: "2em",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)" 
    },
    container: {
        ...Styles.flexColumn,
        margin: "2em 1em 1em 1em",
        minHeight: "25vh",
        widht: "90%",
    },
    test: {
        height: "200vh",
    },
    name: {
        fontSize: "1.5em",
        margin: ".5em 0 .5em 0",
        fontWeight: "200"
    },
    rightSide: {
        fontWeight: "bold"
    },

})

const HealthProfile = () => {

    const classes = useStyles();
    const { patientStore, uiStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    return (<>
        <OverTopBar reverse title={t("profile.title")} handleBack={() => { uiStore.menuOpened = false }} icon={<ClearIcon />}></OverTopBar>
        <div className={classes.container}>
            <PatientInfo />
        </div>
        </>
)}


function PatientInfo() {

    const classes = useStyles();
    const { patientStore, uiStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    return (
        <div className={classes.patientInfo}>
        <div className={classes.info}>
            <Typography className={classes.name} variant="h2">{patientStore.givenName} {patientStore.familyName[0]}.</Typography>
            <Typography variant="body1">{t("profile.startDate")}:<br/> <span className={classes.rightSide}>{DateTime.local().toLocaleString(DateTime.DATE_SHORT)} </span> </Typography>
            <Typography variant="body1">{t("profile.endDate")}:<br/>  <span className={classes.rightSide}>{DateTime.local().plus({days: 180}).toLocaleString(DateTime.DATE_SHORT)}</span></Typography>
            <Typography variant="body1">
                {t("profile.totalTreatments")}<br/> 
                <span className={classes.rightSide}>164</span>
            </Typography>
            <Typography variant="body1">{t("profile.currentAdherence")}<br/> <span className={classes.rightSide}>98%</span></Typography>
        </div>
        <div>
            <div className={classes.photoContainer}>
                <div className={classes.photo}>{patientStore.givenName[0]}</div>
            </div>
        </div>
        </div>
)
}

export default HealthProfile;