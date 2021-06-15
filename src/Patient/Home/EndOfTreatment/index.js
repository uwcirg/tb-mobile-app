import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { observer } from 'mobx-react'
import Confetti from 'react-confetti'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import NewButton from '../../../Basics/NewButton'
import BallotIcon from '@material-ui/icons/Ballot'


const useStyles = makeStyles({
    congratsContainer:{
        padding: "1em",
        textAlign: "center",
        "& > h1":{
            fontSize: "1.5em"
        },
        "& > h2":{
            marginTop: "2em",
            fontSize: "1em",
            textAlign: "left"
        },
        "& > a":{
            marginTop: "2em",
            boxSizing: "border-box"
        }
    }
})

const EndOfTreatment = () => {
    
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
        <Typography variant="h1" >{t('archive.patientSide.congrats')}</Typography>
        <Typography variant="h2" color="initial">{t('archive.patientSide.subtitle')}</Typography>
        <Typography variant="h2" color="initial">{t('archive.patientSide.details')}</Typography>
        <Typography variant="h2" color="initial">{t('archive.patientSide.survey')}</Typography>
        <NewButton href="https://redcap.iths.org/surveys/?s=YXW3H4H7A3DNLYDP" icon={<BallotIcon />}  text={t('archive.patientSide.surveyButton')} />
    </div>
    </>)

}

export default EndOfTreatment;