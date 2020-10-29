import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores'
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Lock from '@material-ui/icons/Lock';
import Colors from '../../Basics/Colors';


const useStyles = makeStyles({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > button": {
            alignSelf: "flex-start",
            marginLeft: "5%",
            color: Colors.buttonBlue,
            textTransform: "capitalize"
        },
    },
    header: {
        width: "90%",
        marginLeft: "1em",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        "& > svg":{
            fontSize: "1em",
            marginRight: "5px"
        },
        "& > h2": {
            fontSize: "1.25em",
        }
    },
})

const LanguageQuestion = () => {
    const classes = useStyles();
    const { patientUIStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Lock />
                <Typography variant="h2">{t("patient.profile.personalInfo")}</Typography>
            </div>
            <Button onClick={patientUIStore.goToPasswordUpdate} >{t("patient.profile.changePassword")}</Button>
            {/*
            <Button onClick={() => { }} >{t("patient.profile.editNotifications") } (Coming Soon)</Button>
            <Button onClick={() => { }} >{t("patient.profile.changeUsername")} (Coming Soon)</Button>
            */}
        </div>
    );
}

export default LanguageQuestion;