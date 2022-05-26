import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import LightCard from '../../Components/LightCard';
import Typography from '@material-ui/core/Typography'
import AdherenceValue from '../../Components/AdherenceValue';
import { useTranslation } from 'react-i18next';
import Fade from '@material-ui/core/Fade'
import SectionTitle from '../../Components/Practitioner/SectionTitle';
import Colors from '../../Basics/Colors';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({

    container: {
        padding: "2em",
        width: "100%",
        boxSizing: "border-box",
        background: Colors.lighterGray
    },
    summary: {
        width: "100%",
        marginTop: "1em"
    },
    card: {
        display: "flex",
        flexDirection: "column",
        minHeight: "75px",
        padding: "1em",
        marginRight: "1em",
        "& > h2:nth-of-type(2)": {
            marginTop: "auto"
        },
        width: "150px"
    },
    title: {
        fontSize: "1em"
    },
    loading:{
        height: "100%",
        margin:"auto"
    },
    loadingText:{
        fontSize: "1em",
        marginBottom: ".5em"
    }
})

const CohortAdherenceSummary = observer((props) => {

    const { practitionerStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <div className={classes.container}>
            <SectionTitle>{t('summaries.siteSummary')}</SectionTitle>
            {!practitionerStore.patientsLoaded && <LoadingElement />}
            <Grid container className={classes.summary}>
                <SummaryCard
                    loaded={practitionerStore.patientsLoaded}
                    title={t('summaries.averageAdherence')}
                    adherence={practitionerStore.cohortAverageAdherence}
                />
                <SummaryCard
                    loaded={practitionerStore.patientsLoaded}
                    title={t('summaries.averagePhotoAdherence')}
                    adherence={practitionerStore.cohortAveragePhotoAdherence} />
            </Grid>
        </div>
    )

});

const LoadingElement = () => {
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<Grid container direction="column" alignItems="center" justify="center" className={classes.loading}>
        <div>
        <Typography className={classes.loadingText} variant="body2">{t('summaries.loading')}...</Typography>
        <LinearProgress style={{height: "10px",width: "100%"}} variant="indeterminate" />
        </div>
    </Grid>)
}

const SummaryCard = ({ children, title, adherence, loaded }) => {
    const classes = useStyles();

    return (
        <Fade in={loaded}>
            <LightCard className={classes.card}>
                <Typography className={classes.title} variant="h2">{title}</Typography>
                <AdherenceValue adherence={adherence} />
                {children}
            </LightCard>
        </Fade>)
}

export default CohortAdherenceSummary;