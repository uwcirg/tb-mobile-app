import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OverTopBar from '../Navigation/OverTopBar';
import useStores from '../../Basics/UseStores';
import SimpleButton from '../../Basics/SimpleButton';
import { useTranslation } from 'react-i18next';
import MobileStepper from '@material-ui/core/MobileStepper';
import { observer } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Styles from '../../Basics/Styles';
import Tabs from './StepList';

const useStyles = makeStyles({
    body: {
        width: "100vw",
        backgroundColor: "white"
    },
    navBarGhost: {
        width: "100%",
        height: "60px"
    },
    container: {
        width: "100%",
        minHeight: "100vh"
    },
    button: {
        marginTop: "auto",
        display: "flex"
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


const Onboarding = observer(() => {

    const classes = useStyles();
    const { patientStore, activationStore, patientUIStore } = useStores();
    const { t } = useTranslation('translation');

    const index = patientUIStore.reportStep;

    const handleNext = () => {
        if (patientUIStore.reportStep !== Tabs.length - 1) {
            patientUIStore.updateOnboardingStep(index + 1);
        }
    }

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
                    <div className={classes.navBarGhost} />
                    <VisualPosition index={index} />
                    <div className={classes.body}>
                        {React.cloneElement(Tabs[index], { index: index, length: Tabs.length, bodyClass: classes.surveyBody, button: <SimpleButton className={classes.button} alignRight>{t('patient.onboarding.next')}</SimpleButton>, handleNext: handleNext })}
                        {!Tabs[index].props.overrideNext && <SimpleButton onClick={handleNext} className={classes.button} alignRight>{t('patient.onboarding.next')}</SimpleButton>}
                    </div>
                </div>}
        </>
    )

})

const VisualPosition = ({ index }) => {
    const classes = useStyles();
    if (index <= 1) {
        return ""
    }
    return (<MobileStepper
        className={classes.stepper}
        variant="progress"
        steps={Tabs.length - 2}
        position="static"
        activeStep={index - 2}
    />)
}

const getHeaderTitleKey = (index) => {

    if (index === 5 || index === 6) return 'patient.onboarding.notification.title'
    if (index < 2) return 'patient.onboarding.landing.welcome'
    return 'patient.onboarding.profileInformation'

}

export default Onboarding;