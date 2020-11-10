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
import Section from './Section'
import VideoIcon from '@material-ui/icons/OndemandVideo';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import { StaticVersion as ErrorReporting } from '../../Basics/ErrorBoundary'
import ErrorIcon from '@material-ui/icons/ReportProblem';
import Instructions from './TestInstructions'
import TestIcon from '@material-ui/icons/Colorize'
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

import HomeIcon from '@material-ui/icons/Home'
import ChatIcon from '@material-ui/icons/QuestionAnswer';
import CalendarIcon from '@material-ui/icons/EventAvailable';


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
        paddingBottom: ".5em",
        marginBottom: "1em",
        paddingLeft: "1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"

    },
    button: {

        color: Colors.buttonBlue,
        textTransform: "capitalize",
        "& > span >  svg":{
            marginRight: ".5em"
        }
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
    },
    help: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        "& > h2": {
            fontSize: "1em"
        }
    }
})

export default function Info() {
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();
    return (
        <div className={classes.container}>
            <Section title={<><LiveHelpIcon />{t('patient.information.helpSection')}</>}>
                <div className={classes.help}>
                    <h2>Interactive Walkthrough</h2>
                    <Button className={classes.button} onClick={patientUIStore.goToWalkThrough}>{<><HomeIcon />Start From Begining</>}</Button>
                    <Button className={classes.button} onClick={patientUIStore.goToWalkThrough}>{<><CalendarIcon />Calendar Page</>}</Button>
                    <Button className={classes.button} onClick={patientUIStore.goToWalkThrough}>{<><ChatIcon />Messaging Page</>}</Button>
                    <h2>Videos</h2>
                    <Button className={classes.button} href="https://youtu.be/6zq6E_COEYo">Instrucciones para hacer un reporte diaria </Button>
                    <Button className={classes.button} href="https://youtu.be/3xDBB3MVmeU">Instrucciones para hacer una prueba de las tiras reactivas</Button>
                </div>
            </Section>
            <Section title={<><VideoIcon />{t('patient.information.videos')}</>}>
                <Videos />
            </Section>
            <Section title={<><InfoIcon />{t('patient.information.education')}</>}>
                <TreatmentMessages />
            </Section>
            <Section title={<><TestIcon />{t('patient.information.testInstructions')}</>}>
                <Instructions />
            </Section>
            <Section title={<><HelpIcon />{t('patient.information.questions')}</>}>
                <Interactioncard className={classes.topCard} >
                    <Markdown options={{ overrides: { Drawer: { component: MarkdownRender } } }} children={file} />
                </Interactioncard>
            </Section>
            <Section title={<><ErrorIcon />{t('patient.information.techSupport')} / <br /> {t('patient.information.reportIssue')}</>}>
                <ErrorReporting />
            </Section>

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
