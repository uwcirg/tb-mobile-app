import React from 'react';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import PopUp from '../Navigation/PopUp';
import { makeStyles } from '@material-ui/core/styles/';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import FlatButton from '../../Components/FlatButton';
import { WarningRounded } from '@material-ui/icons';
import { Box } from '@material-ui/core';

const SymptomWarning = observer(() => {

    const { patientStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    const handleClick = () => {
        patientStore.toggleSymptomWarningVisibility();
    }

    const handleExit = () => {
        patientStore.toggleSymptomWarningVisibility();
    }

    return (
        <PopUp handleClickAway={handleExit}>
            <Box className={classes.container} padding="1em 0">
                <WarningRounded style={{ color: Colors.warningRed, fontSize: "100px" }} />
                <h1 data-testid="severe-symptom-warning">{t("patient.report.symptoms.warning.title")}</h1>
                <p>{t("patient.report.symptoms.warning.subtitle")}</p>
            </Box>
            <FlatButton className={classes.bottomButton} onClick={handleClick}>
                {t("patient.report.symptoms.warning.button")}
            </FlatButton>
        </PopUp>
    )
});

const useStyles = makeStyles({
    bottomButton: {
        width: "100%",
        fontSize: "1em",
        justifyContent: "center"
    },
    container:{
        "& h1": {
            fontSize: "1.2rem",
            textAlign: "center"
        },
        "& p":{
            fontsize: "1rem",
            textAlign: "left"
        }
    }
})


export default SymptomWarning;