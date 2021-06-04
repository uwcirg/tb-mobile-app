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
        minHeight: "75px",
        padding: "1em",
        marginRight: "1em",
        "& > h2:nth-of-type(2)": {
            paddingTop: "1em"
        }
    },
    title: {
        fontSize: "1em"
    }
})

const CohortAdherenceSummary = observer((props) => {

    const { practitionerStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <div className={classes.container}>
            <SectionTitle>{t('summaries.siteSummary')}</SectionTitle>
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

const SummaryCard = ({ children, title, adherence, loaded }) => {
    const classes = useStyles();

    return (<LightCard className={classes.card}>
        <Typography className={classes.title} variant="h2">{title}</Typography>
        <Fade in={loaded}>
            <AdherenceValue adherence={adherence} />
        </Fade>
        {children}
    </LightCard>)
}

export default CohortAdherenceSummary;