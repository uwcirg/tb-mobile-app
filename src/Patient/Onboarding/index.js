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
import Age from './Age';
import Notification from './Notification'
import ContactTracing from './ContactTracing'
import End from './End'
import Password from './Password'
import {observer} from 'mobx-react'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    body: {
        minHeight: "90vh",
        width: "100vw",
        backgroundColor: "white"
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
        padding: "1.5em",
        "& > div": {
            width: "100%"
        }
    },
    surveyBody:{
        padding: "1.5em"
    },
    loading:{        
        ...Styles.flexCenter,
        width: "100vw",
        height: "100vh",
        alignItems: "center"
    }
})

const Landing = () => {
    const { patientStore } = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (
        <div className={classes.landing}>
            <DoctorIcon />
            <h2>{t('patient.onboarding.landing.welcome')} {patientStore.givenName}</h2>
            <p>{t('patient.onboarding.landing.message')}</p>
        </div>
    )
}

const CoordinatorFAQ = () => {
    const { patientStore } = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (
        <div className={classes.faq}>
            <h1>{t('patient.onboarding.coordinator.title')}</h1>
            <h2>{t('patient.onboarding.coordinator.will.title')}</h2>
            <ul>
                {t('patient.onboarding.coordinator.will.items', { returnObjects: true }).map(each => {
                    return <li> <CheckIcon className={classes.green} /> {each}</li>
                })}
            </ul>

            <h2>{t('patient.onboarding.coordinator.wont.title')}</h2>
            <ul>
                {t('patient.onboarding.coordinator.wont.items', { returnObjects: true }).map(each => {
                    return <li><XIcon className={classes.red} /> {each}</li>
                })}
            </ul>

            <div className={classes.bottom}>
                <p>{t('patient.onboarding.coordinator.outro')}</p>
            </div>
        </div>
    )
}


const Tabs = [<Landing />, <CoordinatorFAQ />,<Password overrideNext />, <Gender />, <Age />, <Notification />, <ContactTracing />, <End overrideNext />]

const Onboarding = observer(() => {

    const classes = useStyles();
    const { patientStore , activationStore,patientUIStore} = useStores();
    const { t, i18n } = useTranslation('translation');

    const index = patientUIStore.reportStep

    const handleNext = () => { 
        if( patientUIStore.reportStep === Tabs.length - 1){
            //activationStore.submitActivation();
        }else{ 
          patientUIStore.updateOnboardingStep( index + 1)
        }
    }
    const handleBack = () => { index < 1 ? patientStore.logout() : patientUIStore.updateOnboardingStep( index - 1) }

    return (
        <>
        {activationStore.isLoading ?
        <div className={classes.loading}>
            <div>
            <p>{t('patient.onboarding.success')}</p>
            <CircularProgress size="50vw" />
            </div>
            </div>
        :
        <div className={classes.container}>
            <OverTopBar handleBack={handleBack} title={ index < 2 ? t('patient.onboarding.landing.welcome') : t('patient.onboarding.profileInformation')} />
            <div className={classes.navBarGhost}></div>
            {index > 1 && <MobileStepper
                    className={classes.stepper}
                    variant="progress"
                    steps={Tabs.length - 2}
                    position="static"
                    activeStep={index - 2}
                />}
            <div className={classes.body}>
                {/* Clone the element from the list of steps, pass in additonal props. Below code allows for overide of next button, and provides a default one */}
                {React.cloneElement(Tabs[index], { index: index, length: Tabs.length, bodyClass: classes.surveyBody, button: <SimpleButton className={classes.button} alignRight> Next</SimpleButton>, handleNext: handleNext })}
            {!Tabs[index].props.overrideNext && <SimpleButton onClick={handleNext} className={classes.button} alignRight>{t('next')}</SimpleButton>}
            </div>
        </div>}
        </>
        )

})

export default Onboarding;