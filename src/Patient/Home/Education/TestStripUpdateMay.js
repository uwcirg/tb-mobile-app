import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import NewButton from '../../../Basics/NewButton'
import useStores from '../../../Basics/UseStores';
import Info from '@material-ui/icons/InfoRounded';
import Video from '@material-ui/icons/Videocam';
import RateButtons from './RateButtons';

const useStyles = makeStyles({
    image: {
        width: "100%"
    },
    subTitle: {
        fontSize: "1em"
    },
    title: {
        marginTop: "1em"
    },
    messageBody: {
        padding: "1em 0 1em 0",
        textAlign: "left"
    },
    buttons: {
        width: "100%",
        "& > button, & > a": {
            fontFamily: "Roboto",
            width: "100% !important",
            boxSizing: "border-box",
            display: "flex"
        }
    },
    container:{
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    body: {
        flex: "1 1 0",

    }
})

const Update = () => {

    const classes = useStyles();
    const { uiStore, patientStore } = useStores();
    const { educationStore: education } = patientStore;
    const { t } = useTranslation('translation');

    const handleTextClick = () => {
        uiStore.goToTestInstructions()
        education.setExited(true);
    }


    return (<div className={classes.container}>
        <Typography className={classes.title} variant="h1">{t('mayTestStripUpdate.title')}</Typography>
        <Typography className={classes.subTitle} variant="h2">{t('mayTestStripUpdate.subtitle')}</Typography>
        <div className={classes.body}>
            <img className={classes.image} src="/img/new_test.png" />
            <Typography data-testid="education-body" className={classes.messageBody} variant="body1">{t('mayTestStripUpdate.body')}</Typography>
            <div className={classes.buttons}>
                <NewButton onClick={handleTextClick} icon={<Info />} text={t('mayTestStripUpdate.textInstructions')} />
                <NewButton href="https://youtu.be/zkalmeCLaO8" icon={<Video />} text={t('mayTestStripUpdate.videoInstructions')} />
            </div>
        </div>
        <RateButtons />

    </div>)

}

export default Update;