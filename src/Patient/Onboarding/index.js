import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OverTopBar from '../Navigation/OverTopBar';
import useStores from '../../Basics/UseStores';
import { useTranslation } from 'react-i18next';
import MobileStepper from '@material-ui/core/MobileStepper';
import { observer } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Styles from '../../Basics/Styles';
import Tabs from './StepList';
import BottomButton from './BottomButton';

const useStyles = makeStyles({
    body: {
        width: "100vw",
        backgroundColor: "white",
        flex: "1 1 0"
    },
    navBarGhost: {
        width: "100%",
        height: "60px"
    },
    container: {
        width: "100%",
        minHeight: "95vh",
        display: "flex",
        flexDirection: "column"
    },
    stepper: {
        backgroundColor: "white",
        padding: "1.5em",
        "& > div": {
            width: "100%"
        }
    },
    surveyBody: {
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column",
        padding: "1em",
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

    const handleBack = () => { index < 1 ? patientStore.logout() : patientUIStore.updateOnboardingStep(index - 1) }

    return (
        <>
            <OverTopBar handleBack={handleBack} title={t(getHeaderTitleKey(index))} />
            {activationStore.isLoading ? <LoadingScreen /> :
                <div className={classes.container}>
                    <div className={classes.navBarGhost} />
                    <VisualPosition index={index} />
                        <div className={classes.surveyBody}>
                            {React.cloneElement(Tabs[index], { index: index, length: Tabs.length })}
                            {!Tabs[index].props.overrideNext && <BottomButton />}
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

const LoadingScreen = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (
        <div className={classes.loading}>
            <div>
                <p>{t('patient.onboarding.success')}</p>
                <CircularProgress size="50vw" />
            </div>
        </div>
    )
}

const getHeaderTitleKey = (index) => {

    if (index === 5 || index === 6) return 'patient.onboarding.notification.title'
    if (index < 2) return 'patient.onboarding.landing.welcome'
    return 'patient.onboarding.profileInformation'

}

export default Onboarding;