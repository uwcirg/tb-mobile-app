import { Box, ButtonBase, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TopPageLabel from '../../Components/Shared/TopPageLabel';
import { PageLabel } from '../../Components/Shared/PageLabel';
import { AccessAlarm, AccessAlarmRounded, MenuBook, QuestionAnswerRounded, VideoCallOutlined, YouTube } from '@material-ui/icons';
import HelpVideos from './HelpVideos';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import QuestionsAndAnswers from './QuestionsAndAnswers';

const useStyles = makeStyles({
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "16px"
    },
    box: {
        // border: `solid 2px gray`,
        backgroundColor: "#E3F2FD",
        borderRadius: "5px",
        display: "flex",
        padding: "8px",
        aspectRatio: "1",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        "& *": {
            textAlign: "center"
        },
        "& svg": {
            fontSize: "4em"
        }
    },
    sectionTitle: {
        fontSize: "1.25rem"
    },
    buttonText: {
        lineHeight: "1.1rem",
        fontWeight: "500",
        textTransform: "capitalize"
    }
})

const Translate = ({ children }) => {
    const { t } = useTranslation();
    return <>{t(children)}</>
}


const buttonData = [
    {
        sectionTitle: 'patient.profile.title', items: [
            { translationKey: 'patient.profile.options.medicationReminder', to: "/information/reminder", icon: <AccessAlarmRounded /> },
        ]
    },
    {
        sectionTitle: 'patient.information.infoSection', items: [
            { translationKey: 'patient.information.questions', to: "/information/faq", icon: <QuestionAnswerRounded />, page: <QuestionsAndAnswers /> },
            { translationKey: 'patient.information.videos', to: "/information/videos", icon: <YouTube /> },
        ]
    },
    {
        sectionTitle: 'patient.information.helpSection',
        items: [
            { translationKey: "Help Videos", to: "/information/help-videos", icon: <YouTube />, page: <HelpVideos /> },
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

    buttonData.forEach(d => {
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
            {buttonData.map(each => {
                return <React.Fragment key={each.sectionTitle}>
                    <SectionTitle>
                        <Translate>
                            {each.sectionTitle}
                        </Translate>
                    </SectionTitle>
                    <div className={classes.grid}>
                        {each.items.map(_each => {
                            const { icon, translationKey, to } = _each;
                            return <Paper elevation={2} key={`button-${to}`}>
                                <ButtonBase className={classes.box} component={Link} to={to}>
                                    {icon}
                                    <Box height="8px" />
                                    <Typography className={classes.buttonText}>
                                        <Translate>
                                            {translationKey}
                                        </Translate>
                                    </Typography>
                                </ButtonBase>
                            </Paper>
                        })}
                    </div>
                </React.Fragment>
            })}
            <Box height="60px" />
        </Box >
    )
}