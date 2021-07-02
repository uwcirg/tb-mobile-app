import React from 'react';
import Markdown from 'markdown-to-jsx';
import raw from "raw.macro";
import MarkdownRender from './Panel'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors'
import { Button } from '@material-ui/core';
import useStores from '../../Basics/UseStores';
import Videos from './Videos';
import Section from './Section'
import VideoIcon from '@material-ui/icons/OndemandVideo';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import { StaticVersion as ErrorReporting } from '../../Basics/ErrorBoundary'
import ErrorIcon from '@material-ui/icons/ReportProblem';
import Instructions from './TestInstructions'
import TestIcon from '@material-ui/icons/FormatColorFill'
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';

import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import HomeIcon from '@material-ui/icons/Home'
import ChatIcon from '@material-ui/icons/QuestionAnswer';
import CalendarIcon from '@material-ui/icons/EventAvailable';
import steps from '../Walkthrough/Steps';

import VersionNumber from './VersionNumber'

import ChangeLog from '../../Basics/Changelog'
import HelpVideos from './HelpVideos'
import { observer } from 'mobx-react'

import NotificationInstructions from './NotificationInstructions';

const file = raw("./information.md");

const TCButton = (props) => {
    const classes = useStyles();
    const { patientUIStore } = useStores();

    return (<Button
        className={classes.button}
        onClick={() => {
            patientUIStore.router.push(steps[props.step].push);
            patientUIStore.goToWalkThrough(props.step)

        }}>
        {props.children}
    </Button>)
}

const Info = observer(() => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientUIStore } = useStores();

    

    return (
        <div className={classes.container}>
            <Section highlight={Colors.highlightYellow} expanded={patientUIStore.onPushEnrollmentInstructions} title={<><HelpIcon />How to enable notifications</>}>
                <NotificationInstructions />
            </Section>
            <Section title={<><LiveHelpIcon />{t('patient.information.helpSection')}</>}>
                <div className={classes.help}>
                    <h2>{t('patient.information.walkthrough.title')}</h2>
                    <TCButton step={0}><><PlayIcon />{t('patient.information.walkthrough.start')}</></TCButton>
                    <TCButton step={3} ><HomeIcon />{t('patient.information.walkthrough.home')}</TCButton>
                    <TCButton step={7} ><CalendarIcon />{t('patient.information.walkthrough.calendar')}</TCButton>
                    <TCButton step={10} ><ChatIcon />{t('patient.information.walkthrough.messaging')}</TCButton>
                    <h2>{t('patient.information.helpVideos')}</h2>
                    <HelpVideos />
                </div>
            </Section>
            <Section title={<><VideoIcon />{t('patient.information.videos')}</>}>
                <Videos />
            </Section>
            <Section title={<><InfoIcon />{t('patient.information.education')}</>}>
                <TreatmentMessages />
            </Section>
            <Section expanded={patientUIStore.onInfoTestInstructions} title={<><TestIcon />{t('patient.information.testInstructions')}</>}>
                <Instructions />
            </Section>
            <Section title={<><HelpIcon />{t('patient.information.questions')}</>}>
                <Markdown options={{ overrides: { Drawer: { component: MarkdownRender } } }} children={file} />
            </Section>
            <Section title={<><ErrorIcon />{t('patient.information.techSupport')} / <br /> {t('patient.information.reportIssue')}</>}>
                <ErrorReporting />
            </Section>
            <Section title={<><TrackChangesIcon />{t('patient.information.changeLog')}</>}>
                <ChangeLog />
            </Section>
            <VersionNumber />
        </div>
    )
})

const TreatmentMessages = () => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    const messages = t('treatmentUpdates', { returnObjects: true })

    return (
        <div className={classes.treatmentMessages}>
            {Object.keys(messages).map(each => {
                return (
                    <div key={each}>
                        <span>{t('time.day')} {each}</span>
                        <p>{messages[each]}</p>
                    </div>)
            })}
        </div>
    )
}

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
        "& > span >  svg": {
            marginRight: ".5em"
        }
    },
    padding: {
        paddingLeft: "1em"
    },
    treatmentMessages: {
        display: "flex",
        flexDirection: "column",
        "& > div > span": {
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
        },
        "& > button": {
            marginLeft: "2em"
        },
        "& > button:first-of-type": {
            marginLeft: 0
        }
    }
})


export default Info;
