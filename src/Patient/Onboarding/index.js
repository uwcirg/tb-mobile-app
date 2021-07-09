import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OverTopBar from '../Navigation/OverTopBar';
import useStores from '../../Basics/UseStores';
import SimpleButton from '../../Basics/SimpleButton';
import { useTranslation } from 'react-i18next';
import MobileStepper from '@material-ui/core/MobileStepper';
import Gender from './Gender';
import Age from './Age';
import Notification from './Notification';
import ContactTracing from './ContactTracing';
import End from './End';
import Password from './Password';
import { observer } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Landing from './Landing';
import PushPermissionsNotice from './PushPermissionNotice';
import AssistantFAQ from './AssistantFAQ';
import Styles from '../../Basics/Styles';

const useStyles = makeStyles({
    body: {
        minHeight: "90vh",
        width: "100vw",
        backgroundColor: "white"
    },
    navBarGhost: {
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
    button: {
        position: "fixed",
        bottom: "2em"
    },
    stepper: {
        backgroundColor: "white",
        padding: "1.5em",
        "& > div": {
            width: "100%"
        }
    },
    surveyBody: {
        padding: "1.5em"
    },
    loading: {
        ...Styles.flexCenter,
        width: "100vw",
        height: "100vh",
        alignItems: "center"
    }
})

const Tabs = [<Landing />, <AssistantFAQ />, <Password overrideNext />, <Gender />, <Age />, <PushPermissionsNotice overrideNext />, <Notification />, <ContactTracing />, <End overrideNext />]

const Onboarding = observer(() => {

    const classes = useStyles();
    const { patientStore, activationStore, patientUIStore } = useStores();
    const { t } = useTranslation('translation');

    const index = patientUIStore.reportStep;

    const handleNext = () => {patientUIStore.updateOnboardingStep(index + 1)}
    const handleBack = () => { index < 1 ? patientStore.logout() : patientUIStore.updateOnboardingStep(index - 1) }

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
                    <OverTopBar handleBack={handleBack} title={t(getHeaderTitleKey(index))} />
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
                        {React.cloneElement(Tabs[index], { index: index, length: Tabs.length, bodyClass: classes.surveyBody, button: <SimpleButton className={classes.button} alignRight>{t('patient.onboarding.next')}</SimpleButton>, handleNext: handleNext })}
                        {!Tabs[index].props.overrideNext && <SimpleButton onClick={handleNext} className={classes.button} alignRight>{t('patient.onboarding.next')}</SimpleButton>}
                    </div>
                </div>}
        </>
    )

})

const getHeaderTitleKey = (index) => {

    if(index === 5 || index === 6)return 'patient.onboarding.notificationsTitle'
    if(index < 2) return 'patient.onboarding.landing.welcome'
    return 'patient.onboarding.profileInformation'

}

export default Onboarding;