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
import Videos from './Videos';
import TreatmentTimeline from '../../Basics/TreatmentTimeline'
import Section from './Section'
import VideoIcon from '@material-ui/icons/OndemandVideo';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';


const file = raw("./information.md");
const messagesFile = raw("../../Content/TreatmentMessages.json")

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
    },
    treatmentMessages: {
        display: "flex",
        flexDirection: "column",
        "& > span": {
            textTransform: "capitalize",
            color: Colors.textGray
        }
    }
})

export default function Info() {
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();
    return (
        <div className={classes.container}>

            <Typography variant="h1">{t('patient.information.infoSection')}</Typography>
            {/*
            <Section title={t('timeline.title')}>
                <TreatmentTimeline weeksInTreatment={patientStore.patientInformation.weeksInTreatment} />
            </Section>
            */}
            <Section title={<><VideoIcon />{t('patient.information.videos')}</>}>
                <Videos />
            </Section>
            <Section title={<><InfoIcon />{t('patient.information.education')}</>}>
                <TreatmentMessages />
            </Section>
            <Section title={<><HelpIcon />{t('patient.information.questions')}</>}>
                <Interactioncard className={classes.topCard} >
                    <Markdown options={{ overrides: { Drawer: { component: MarkdownRender } } }} children={file} />
                </Interactioncard>
            </Section>

            <Typography variant="h1">{t('patient.information.helpSection')}</Typography>
            <div className={classes.appInfo}>
                <Button className={classes.button} onClick={patientUIStore.goToWalkThrough}>{t('patient.information.launchWalkthrough')}</Button>
                <Button className={classes.button} onClick={patientUIStore.goToWalkThrough}>{t('patient.information.video')}</Button>
            </div>

        </div>
    )
}

const TreatmentMessages = () => {
    const messages = JSON.parse(messagesFile)
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (
        <div className={classes.treatmentMessages}>
            {Object.keys(messages).map(each => {
                return (
                    <>
                        <span>{t('time.day')} {each}</span>
                        <p>{messages[each]}</p>
                    </>)
            })}
        </div>
    )
}
