import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from './UseStores'
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { observer } from 'mobx-react'
import Globe from '@material-ui/icons/Language';
import Colors from './Colors'

const useStyles = makeStyles({
    group: {
        width: "70%",
        margin: "1em"
    },
    language: {
        width: "90%",
        marginLeft: "1em",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        "& > svg": {
            fontSize: "1em",
            marginRight: "5px"
        },
        "& > h2": {
            fontSize: "1.25em",
        }
    },
    languageContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    selected: {
        backgroundColor: Colors.buttonBlue,
        color: "white",
        "&:hover": {
            color: Colors.white,
            backgroundColor: Colors.accentBlue
        }
    },
    default: {
        backgroundColor: "white",
        color: Colors.buttonBlue,
        "&:hover": {
            color: Colors.buttonBlue,
            backgroundColor: Colors.accentBlue
        }
    }
})



const LanguageQuestion = observer((props) => {
    const classes = useStyles();
    const { uiStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    return (
        <div className={classes.languageContainer}>
            {!props.noTitle && <div className={classes.language}>
                <Globe />
                <Typography variant="h2">{t("patient.profile.options.language")}</Typography>
            </div>}
            <ButtonGroup className={classes.group} fullWidth color="primary">
                <Button onClick={() => { uiStore.setLocale("en") }} className={uiStore.locale === "en" ? classes.selected : classes.default}>{t("patient.profile.options.english")}</Button>
                <Button onClick={() => { uiStore.setLocale("es-AR") }} className={uiStore.locale === "es-AR" ? classes.selected : classes.default}>{t("patient.profile.options.spanish")}</Button>
            </ButtonGroup>
        </div>
    );
})

export default LanguageQuestion;