import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { PageLabel } from '../../Components/Shared/PageLabel';
import { Settings as SettingsIcon, AccessAlarmRounded, ContactSupportRounded, FeedbackRounded, OndemandVideoRounded, QuestionAnswerRounded, YouTube, ExitToApp, Notifications, Map } from '@material-ui/icons';
import HelpVideos from './HelpVideos';
import { useTranslation } from 'react-i18next';
import QuestionsAndAnswers from './QuestionsAndAnswers';
import Videos from './Videos';
import MedicationReminder from './MedicationReminder';
import Colors from '../../Basics/Colors';
import InformationLink from './InformationLink';
import TestInstructions from './TestInstructions';
import VersionNumber from './VersionNumber';
import ChangeLog from '../../Basics/Changelog';
import { StaticVersion } from '../../Basics/ErrorBoundary';
import Settings from '../Settings';
import FlatButton from '../../Components/FlatButton';
import useLogout from '../../Basics/Logout';
import NotificationInstructions from './NotificationInstructions';
import Walkthough from './Walkthrough';

const useStyles = makeStyles({
    logout: {
        width: "100%",
        justifyContent: "center",
        fontSize: "1rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)"
    },
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
            { translationKey: 'patient.information.otherSettings', to: "/information/settings", page: <Settings />, icon: <SettingsIcon /> },
        ]
    },
    {
        sectionTitle: 'patient.information.infoSection', items: [
            { translationKey: 'patient.information.questions', to: "/information/faq", icon: <QuestionAnswerRounded />, page: <QuestionsAndAnswers /> },
            { translationKey: 'patient.information.videos', to: "/information/videos", icon: <OndemandVideoRounded />, page: <Videos /> },
        ]
    },
    {
        sectionTitle: 'patient.information.helpSection',
        items: [
            { translationKey: 'patient.information.testInstructions', to: "/information/test-instructions", icon: <TestStripImage />, page: <TestInstructions /> },
            { translationKey: 'patient.information.helpVideos', to: "/information/help-videos", icon: <YouTube />, page: <HelpVideos /> },
            { translationKey: 'patient.information.walkthrough.title', to: "/information/walkthrough", icon: <Map />, page: <Walkthough /> },
            { translationKey: 'patient.information.techSupport', to: "/information/tech-support", icon: <ContactSupportRounded />, page: <StaticVersion /> },
            { translationKey: 'patient.information.reportIssue', href: "https://forms.gle/gZHLZ4CGJT2J1V6p7", icon: <FeedbackRounded /> },
            { translationKey: 'notificationInstructions.steps.title', to: "/information/notification-instructions", icon: <Notifications />, page: <NotificationInstructions /> },

        ]
    }
]

const InfoRoute = (props) => {

    const { title, children } = props;

    return <Route {...props} to={`*/${props.to}`}>
        <Box width="100%" bgcolor="white" zIndex={10} position="fixed" top={0}>
            <PageLabel title={<Translate>{title}</Translate>} />
        </Box>
        {children}
    </Route>
}

export default function InformationPage() {

    const { t } = useTranslation('translation');

    const { pathname } = useLocation();

    useEffect(() => {
        const element = document.getElementById('main-patient-app-content')
        if (element) {
            element.scrollTop = 0;
        }
    }, [pathname])

    const classes = useStyles();
    const logout = useLogout();

    const buttons = []

    content.forEach(d => {
        buttons.push(...d.items)
    })

    return (
        <Switch>
            {buttons.filter((item) => {return !!item.to}).map(_each => {
                const { to, translationKey, page } = _each;
                return <InfoRoute key={`route-${translationKey}`} title={translationKey} path={to}>
                    {page || <>
                        <p>{t('commonWords.error')}</p>
                        <Link to="/">{t('patient.report.photo.back')}</Link>
                    </>}
                </InfoRoute>
            })}
            <InfoRoute path="/information/change-log" title={'patient.information.changeLog'} >
                <ChangeLog />
            </InfoRoute>
            <Route>
                <Buttons />
                <Box padding="1rem">
                    <FlatButton className={classes.logout} onClick={logout}>
                        <span>{t('patient.profile.logout')}</span>
                        <Box width=".5rem" />
                        <ExitToApp />
                    </FlatButton>
                </Box>
                <Box padding="0 1rem 1rem 1rem">
                    <VersionNumber />
                </Box>
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
            {content.map((each) => {
                return <div key={`information-section-${each.sectionTitle}}`}>
                    <SectionTitle>
                        <Translate>
                            {each.sectionTitle}
                        </Translate>
                    </SectionTitle>
                    <div className={classes.grid}>
                        {each.items.map(_each => <InformationLink {..._each} key={_each.translationKey} />)}
                    </div>
                </div>
            })}
        </Box >
    )
}

const practitionerContent = [
    { translationKey: 'patient.information.questions', to: "/settings/information/faq", icon: <QuestionAnswerRounded />, page: <QuestionsAndAnswers /> },
    { translationKey: 'patient.information.videos', to: "/settings/information/videos", icon: <OndemandVideoRounded />, page: <Videos /> },
    { translationKey: 'patient.information.testInstructions', to: "/settings/information/test-instructions", icon: <TestStripImage />, page: <TestInstructions /> },
    { translationKey: 'patient.information.helpVideos', to: "/settings/information/help-videos", icon: <YouTube />, page: <HelpVideos /> },
    { translationKey: 'patient.information.techSupport', to: "/settings/information/tech-support", icon: <ContactSupportRounded />, page: <StaticVersion /> },
    { translationKey: 'notificationInstructions.steps.title', to: "/settings/information/notification-instructions", icon: <Notifications />, page: <NotificationInstructions /> },
]


export function PractitionerView() {

    const { t } = useTranslation();

    const classes = useStyles();
    return <Switch>
        {practitionerContent.map(_each => {
            const { to, translationKey, page } = _each;
            return <InfoRoute key={`route-${translationKey}`} title={translationKey} path={to}>
                {page || <>
                    <p>{t('commonWords.error')}</p>
                    <Link to="/">{t('patient.report.photo.back')}</Link>
                </>}
            </InfoRoute>
        })}

        <Route>
            <Box padding="1rem">
                <div className={classes.grid}>
                    {practitionerContent.map(_each => <InformationLink {..._each} key={_each.translationKey} />)}
                </div>
            </Box>
        </Route>
    </Switch>

}