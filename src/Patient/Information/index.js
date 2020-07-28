import React from 'react';
import Markdown from 'markdown-to-jsx';
import raw from "raw.macro";
import MarkdownRender from './Panel'
import Interactioncard from '../../Basics/InteractionCard'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors'
import { Button } from '@material-ui/core';
import useStores from '../../Basics/UseStores';
import Typography from '@material-ui/core/Typography';
import TreatmentTimeline from '../../Basics/TreatmentTimeline'
import Section from './Section'
const file = raw("./information.md");

//Convert markdown file to expandable cards format
const useStyles = makeStyles({
    container: {
        "& > h1": {
            marginBottom: "1em",
            marginTop: "1em",
            paddingLeft: "1em"
        },
        boxSizing: "border-box"
    },
    appInfo: {
        borderBottom: "solid gray 1px",
        paddingBottom: ".5em",
        marginBottom: "1em",
        paddingLeft: "1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"

    },
    button: {

        color: Colors.buttonBlue,
        textTransform: "capitalize"
    },
    padding: {
        paddingLeft: "1em"
    }
})

export default function Info() {
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();
    return (
        <div className={classes.container}>
            <Typography variant="h1">Help with Application</Typography>
            <div className={classes.appInfo}>
                <Button className={classes.button} onClick={patientUIStore.goToWalkThrough}>Launch App Walkthrough</Button>
                <Button className={classes.button} onClick={patientUIStore.goToWalkThrough}>Watch Video</Button>
            </div>

            <Typography variant="h1">Information about Tuberculosis</Typography>
            <Section title={t('timeline.title')}>
                <TreatmentTimeline weeksInTreatment={patientStore.patientInformation.weeksInTreatment} />
            </Section>

            <Section title={t('patient.information.education')}>
                <p> Coming Soon</p>
            </Section>
            <Section title={t('patient.information.questions')}>
            <Interactioncard className={classes.topCard} >
                <Markdown options={{ overrides: { Drawer: { component: MarkdownRender } } }} children={file} />
            </Interactioncard>
            </Section>

        </div>
    )
}
