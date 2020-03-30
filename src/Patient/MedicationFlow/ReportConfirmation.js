import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import { useTranslation } from 'react-i18next'
import SimpleButton from '../../Basics/SimpleButton';
import CheckIcon from '@material-ui/icons/Check';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import HealingIcon from '@material-ui/icons/Healing';
import { ReactComponent as PillIcon } from '../../Basics/Icons/pill.svg'
import Colors from '../../Basics/Colors';
import { DateTime } from 'luxon';
import ClickableText from '../../Basics/ClickableText'
import ReportPopUp from './ReportPopUp'


const useStyles = makeStyles({
    superContainer:{
        marginBottom: "1em"
    },
    container: {
        ...Styles.flexColumn,
        maxWidth: "100vw",
        "& > div": {
            borderBottom: "1px solid lightgray"
        },
        marginBottom: "1em"
    },
    parent: {
        margin: "auto",
        width: "90%",
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gridTemplateRows: "auto auto",
        gridColumnGap: "0",
        gridRowGap: "0",
        paddingBottom: ".5em",

    },
    one: {
        gridArea: "1 / 1 / 2 / 3",
        justifyContent: "flex-start",
        padding: ".5em",
        "& > h2": {
            ...Styles.flexRow,
            alignItems: "center",
            fontSize: "1em",
            "& > svg": {
                margin: "0 .5em 0 .5em"
            }
        },
    },
    two: {
        gridArea: "2 / 1 / 3 / 3",
        color: Colors.textGray,
        alignItems: "flex-start",
        paddingLeft: ".5em",
        "& > p": {
            margin: "5px"
        }
    },
    three: {
        gridArea: "1 / 3 / 3 / 4",
        ...Styles.flexCenter
    },
    check: {
        color: Colors.approvedGreen
    },
    stripPhoto:{
        height: "10vh"
    }
})

const SymptomList = (props) => {
    const { t, i18n } = useTranslation('translation');

    return (
        props.symptoms.map((each) => {
            return <p>{t(`symptoms.${each}.title`)}</p>
        })
    )
}

const ReportConfirmation = observer(() => {

    const classes = useStyles();
    const { patientStore } = useStores();
    patientStore.report.headerText = "Confirm and Submit"

    return (
        <div className={classes.superContainer}>
            <div className={classes.container}>
                <ListItem icon={<PillIcon />} title={"Medication"} >
                    <p>Taken at {DateTime.fromISO(patientStore.report.timeTaken).toLocaleString(DateTime.TIME_24_SIMPLE)}</p>
                </ListItem>
                <ListItem icon={<HealingIcon />} title={"Symptoms"}>
                    <SymptomList symptoms={patientStore.report.selectedSymptoms} />
                    <ClickableText hideIcon text={"+ Add More"} />
                </ListItem>
                <PhotoListItem />
            </div>
            <SimpleButton alignRight onClick={patientStore.submitReport}>Confirm and Submit</SimpleButton>
        </div>
    )

});


const PhotoListItem = observer(() => {
    const { patientStore } = useStores();
    const classes = useStyles();

    if (patientStore.isPhotoDay) {
        return (
            <ListItem icon={<CameraIcon />} title={"Strip Photo"}>
                <img className={classes.stripPhoto} src={patientStore.report.photoString}/>
            </ListItem>
        )
    }

});


function ListItem(props) {

    const classes = useStyles();

    return (
        <div className={classes.parent}>
            <div className={classes.one}>
                <h2>{props.icon}
                    {props.title}</h2>
            </div>
            <div className={classes.two}>
                {props.children}
            </div>
            <div className={classes.three}>
                <CheckIcon className={classes.check} />
            </div>
        </div>
    )
}

export default ReportConfirmation;
