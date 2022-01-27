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
        alignItems: "flex-start",
        "& > button": {
            alignSelf: "flex-start",
            color: Colors.buttonBlue,
            textTransform: "capitalize"
        },
    },
    header: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        "& > svg":{
            fontSize: "1em",
            marginRight: "5px"
        },
        "& > h2": {
            fontSize: "1.25em",
        }
    },
})

const PersonalInformation = () => {
    const classes = useStyles();
    const { patientUIStore } = useStores();
    const { t } = useTranslation('translation');

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Lock />
                <Typography variant="h2">{t("patient.profile.personalInfo")}</Typography>
            </div>
            <Button onClick={patientUIStore.goToPasswordUpdate} >{t("patient.profile.changePassword")}</Button>
            <Button onClick={patientUIStore.goToContactTracingUpdate} >{t('householdTesting.button')}</Button>
        </div>
    );
}

export default PersonalInformation;