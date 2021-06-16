import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { observer } from 'mobx-react'
import Confetti from 'react-confetti'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import NewButton from '../../../Basics/NewButton'
import BallotIcon from '@material-ui/icons/Ballot'
import useStores from '../../../Basics/UseStores'
import { toJS } from 'mobx'


const useStyles = makeStyles({
    congratsContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "0 2em 1em 2em",
        textAlign: "center",
        "& > img":{
            objectFit: "contain",
            height: "150px",
            
        },
        "& > h1": {
            fontSize: "1.3em"
        },
        "& > h2": {
            marginTop: "1em",
            fontSize: "1em",
            textAlign: "left"
        },
        "& > a": {
            marginTop: "1em",
            boxSizing: "border-box"
        }
    }
})

const OptionRouter = observer(() => {

    const { patientStore } = useStores();

    let dynamicContent = ""

    if (patientStore.treatmentOutcome.treatmentOutcome === "success") dynamicContent = <TreatmentSuccess />
    if (patientStore.treatmentOutcome.treatmentOutcome !== "success") dynamicContent = <OtherOutcome />

    return (
        <>
            {dynamicContent}
        </>
    )
})

const TreatmentSuccess = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const [running, setRunning] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setRunning(false);
        }, 3500)

        return () => {
            clearTimeout(timer);
        }
    }, [])

    return (
        <>
            <Confetti numberOfPieces={running ? 200 : 0} />
            <div className={classes.congratsContainer}>
                <img src="img/success.png" />
                <Typography variant="h1" >{t('archive.patientSide.congrats')}</Typography>
                <Typography variant="h2" color="initial">{t('archive.patientSide.subtitle')}</Typography>
                <Typography variant="h2" color="initial">{t('archive.patientSide.details')}</Typography>
                <Typography variant="h2" color="initial">{t('archive.patientSide.survey')}</Typography>
                <NewButton href="https://redcap.iths.org/surveys/?s=YXW3H4H7A3DNLYDP" icon={<BallotIcon />} text={t('archive.patientSide.surveyButton')} />
            </div>
        </>)

}

const OtherOutcome = () => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <div className={classes.congratsContainer}>
            <img src="img/notify.png" />
            <Typography variant="h2" color="initial">
                Your study status has changed and you can no longer report. Please contact your assistant for more details.
                </Typography>
            <Typography variant="h2" color="initial">{t('archive.patientSide.survey')}</Typography>
            <NewButton href="https://redcap.iths.org/surveys/?s=YXW3H4H7A3DNLYDP" icon={<BallotIcon />} text={t('archive.patientSide.surveyButton')} />
        </div>

    )
}

export default OptionRouter;