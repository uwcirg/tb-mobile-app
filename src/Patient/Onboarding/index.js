import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import OverTopBar from '../Navigation/OverTopBar';
import useStores from '../../Basics/UseStores';
import { ReactComponent as DoctorIcon } from '../../Basics/Icons/DoctorGroup.svg';
import SimpleButton from '../../Basics/SimpleButton';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@material-ui/icons/Check';
import XIcon from '@material-ui/icons/Clear';
import Styles from '../../Basics/Styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Gender from './Gender'

const useStyles = makeStyles({
    body: {
        minHeight: "90vh",
        width: "100vw",
        backgroundColor: "white",
    },
    navBarGhost:{
        width: "100%",
        height: "60px"
    },
    container: {
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 10,
    },
    landing: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1em",
        textAlign: "center"
    },
    button: {
        position: "fixed",
        bottom: "2em"
    },
    faq: {
        height: "60vh",
        ...Styles.flexColumn,
        justifyContent: "space-evenly",
        padding: "1em",
        "& > h1": { fontSize: "1.5em" },
        "& > h2": { fontSize: "1.25em", margin: 0, padding: 0 },
        "& > ul > li": {
            listStyle: "none",
            display: "flex",
            alignItems: "center",
            "& > svg": {
                fontSize: ".8em",
                marginRight: ".5em"
            }
        }
    },
    green: {
        color: "green"
    },
    red: {
        color: "red"
    },
    bottom: {
        borderTop: "1px solid lightgray",
        padding: "1em",
        marginTop: "auto"
    },
    stepper: {
        backgroundColor: "white",
        "& > div": {
            width: "100%"
        }
    }

})

const Landing = () => {
    const { patientStore } = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('onboarding');

    return (
        <div className={classes.landing}>
            <DoctorIcon />
            <h2>{t('landing.welcome')} {patientStore.givenName}</h2>
            <p>{t('landing.message')}</p>
        </div>
    )
}

const CoordinatorFAQ = () => {
    const { patientStore } = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('onboarding');



    return (
        <div className={classes.faq}>
            <h1>{t('coordinator.title')}</h1>
            <h2>{t('coordinator.will.title')}</h2>
            <ul>
                {t('coordinator.will.items', { returnObjects: true }).map(each => {
                    return <li> <CheckIcon className={classes.green} /> {each}</li>
                })}
            </ul>


            <h2>{t('coordinator.wont.title')}</h2>
            <ul>
                {t('coordinator.wont.items', { returnObjects: true }).map(each => {
                    return <li><XIcon className={classes.red} /> {each}</li>
                })}
            </ul>

            <div className={classes.bottom}>
                <p>{t('coordinator.outro')}</p>
            </div>
        </div>
    )
}


const Tabs = [<Landing />, <CoordinatorFAQ />, <Gender />, <Gender />, <Gender />]

const Onboarding = () => {

    const [index, setIndex] = useState(0);
    const classes = useStyles();
    const { patientStore } = useStores();
    const { t, i18n } = useTranslation('onboarding');

    const handleNext = () => { setIndex(index + 1) }
    const handleBack = () => { index < 1 ? patientStore.logout() : setIndex(index - 1) }

    return (
        <div className={classes.container}>
            <OverTopBar handleBack={handleBack} title={t('landing.welcome')} />
            <div className={classes.navBarGhost}></div>
            <MobileStepper
                    className={classes.stepper}
                    variant="progress"
                    steps={Tabs.length}
                    position="static"
                    activeStep={index}
                />
            <div className={classes.body}>
                {React.cloneElement(Tabs[index], { index: index, length: Tabs.length })}
                <SimpleButton onClick={handleNext} className={classes.button} alignRight> Next</SimpleButton>
            </div>
        </div>)

}

export default Onboarding;