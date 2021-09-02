import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OverTopBar from './Navigation/OverTopBar';
import Typography from '@material-ui/core/Typography';
import ClickableText from '../Basics/ClickableText';
import useStores from '../Basics/UseStores';
import NewButton from '../Basics/NewButton';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    body: {
        padding: "1em",
        
    },
    graphic: {
        width: "90%"

    }
})

const CompName = () => {

    const classes = useStyles();
    const { patientUIStore } = useStores();
    const { t } = useTranslation('translation');

    return (<div>
        <OverTopBar handleBack={patientUIStore.goToHome} notFixed title="App Survey" />
        <div className={classes.body}>
            
            <Grid container justify="center" alignItems="center" direction="column" className={classes.body}>
                <img className={classes.graphic} src="treatment-update.png" />
                {/* <Typography variant="body1" color="initial"> {t('patient.onboarding.contactTracing.important')}</Typography>
                <Typography variant="body1" color="initial">{t('patient.onboarding.contactTracing.explanation')}</Typography> */}
                <NewButton icon={<ListAltIcon />} text={"Go To Survey"} />
            </Grid>
            <Typography variant="body1" color="initial">If you have already completed the survey:</Typography>
            <ClickableText text="Click here to hide the prompt" hideIcon />
        </div>
    </div>)

}

export default CompName;