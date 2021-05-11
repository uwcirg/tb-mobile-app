import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import NewButton from '../../../Basics/NewButton'
import useStores from '../../../Basics/UseStores';
import Info from '@material-ui/icons/InfoRounded';
import Video from '@material-ui/icons/Videocam';

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
    body: {
        textAlign: "left",
        margin: "1em 0 1em 0"
    },
    buttons:{
        width: "100%",
        "& > button, & > a":{
            fontFamily: "Roboto",
            width: "100% !important",
            boxSizing: "border-box",
            display: "flex"
        }
    }
})

const Update = () => {

    const classes = useStyles();
    const { uiStore } = useStores();
    const { t } = useTranslation('translation');




    return (<>
        <Typography className={classes.title} variant="h1">{t('mayTestStripUpdate.title')}</Typography>
        <Typography className={classes.subTitle} variant="h2">{t('mayTestStripUpdate.subtitle')}</Typography>
        <img className={classes.image} src="/img/new_test.png" />
        <Typography className={classes.body} variant="body1">{t('mayTestStripUpdate.body')}</Typography>
        <div className={classes.buttons}>
            <NewButton onClick={uiStore.goToTestInstructions} icon={<Info />} text={"Text instructions"} />
            <NewButton href="https://youtube.com" icon={<Video />} text={"Video Instructions"} />
        </div>

    </>)

}

export default Update;