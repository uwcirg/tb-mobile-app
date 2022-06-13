import { Box} from '@material-ui/core';
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { PageLabel } from '../../Components/Shared/PageLabel';
import { AccessAlarm, AccessAlarmRounded, MenuBook, QuestionAnswerRounded, VideoCallOutlined, YouTube } from '@material-ui/icons';
import HelpVideos from './HelpVideos';
import { useTranslation } from 'react-i18next';
import QuestionsAndAnswers from './QuestionsAndAnswers';
import Videos from './Videos';
import MedicationReminder from './MedicationReminder';
import Colors from '../../Basics/Colors';
import InformationLink from './InformationLink';
import TestInstructions from './TestInstructions';
import capitalizeFirstLetter from '../../Utility/StringUtils';

const useStyles = makeStyles({
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "16px",
        maxWidth: "400px"
    },
    sectionTitle: {
        fontSize: "1.15rem",
        fontWeight: "500",
        color: Colors.textDarkGray
    },
})


const Translate = ({ children }) => {
    const { t } = useTranslation();
    return <>{t(children)}</>
}

const TestStripImage = () => {
    return <img width="64px" src="/img/test-instructions.png" />
}


const content = [
    {
        sectionTitle: 'patient.profile.title', items: [
            { translationKey: 'patient.profile.options.medicationReminder', to: "/information/medication-reminder", icon: <AccessAlarmRounded />, page: <MedicationReminder /> },
        ]
    },
    {
        sectionTitle: 'patient.information.infoSection', items: [
            { translationKey: 'patient.information.questions', to: "/information/faq", icon: <QuestionAnswerRounded />, page: <QuestionsAndAnswers /> },
            { translationKey: 'patient.information.videos', to: "/information/videos", icon: <YouTube />, page: <Videos /> },
        ]
    },
    {
        sectionTitle: 'patient.information.helpSection',
        items: [
            { translationKey: 'patient.information.testInstructions', to: "/information/test-instructions", icon: <TestStripImage />, page: <TestInstructions /> },
            { translationKey: 'patient.information.helpVideos', to: "/information/help-videos", icon: <YouTube />, page: <HelpVideos /> },
        ]
    }


]

const InfoRoute = (props) => {

    const { title, children } = props;

    return <Route {...props}>
        <Box width="100%" bgcolor="white" zIndex={10} position="fixed" top={0}>
            <PageLabel title={<Translate>{title}</Translate>} />
        </Box>
        {children}
    </Route>
}

export default function InformationPage() {

    const buttons = []

    content.forEach(d => {
        buttons.push(...d.items)
    })

    return (
        <Switch>
            {buttons.map(_each => {
                const { to, translationKey, page } = _each;
                return <InfoRoute key={`route-${to}`} title={translationKey} path={to}>
                    {page || <p>Content missing, please add it</p>}
                </InfoRoute>
            })}
            <Route>
                <Buttons />
            </Route>
        </Switch>
    )
}

const SectionTitle = ({ children }) => {
    const classes = useStyles()

    return (<h2 className={classes.sectionTitle}>{children}</h2>)
}

const Buttons = () => {
    const classes = useStyles();

    return (
        <Box padding="0 16px">
            {content.map(each => {
                return <React.Fragment key={each.sectionTitle}>
                    <SectionTitle>
                        <Translate>
                            {each.sectionTitle}
                        </Translate>
                    </SectionTitle>
                    <div className={classes.grid}>
                        {each.items.map(_each => <InformationLink {..._each} />)}
                    </div>
                </React.Fragment>
            })}
            <Box height="60px" />
        </Box >
    )
}