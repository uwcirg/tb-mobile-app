import React, { useState } from 'react';
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import Typography from '@material-ui/core/Typography';
import OverTopBar from '../Navigation/OverTopBar';
import { useTranslation } from 'react-i18next';
import ProfileButton from '../../Components/FlatButton';
import Grid from '@material-ui/core/Grid';
import AddSubtractField from '../../Components/Patient/AddSubtractField';
import Colors from '../../Basics/Colors';
import PatientInformationAPI from '../../API/PatientInformationAPI';
import useToggle from '../../Hooks/useToggle';
import NextButton from './NextButton';



const useStyles = makeStyles({
    body: {
        padding: "1em 1.5em",
        minHeight: "60vh",
    },
    avatar: {
        width: "30px",
        height: "30px",
        fontSize: ".8em",
        marginRight: "1em",
        backgroundColor: Colors.accentBlue
    },
    buttonContainer: {
        marginTop: "1em",
        padding: "1.5em",
        "& > button": {
            fontSize: "1em"
        }
    },
    label: {
        margin: "1em 0"
    }
})


const ConfirmationScreen = ({ nContacts, nTested, error }) => {


    const completed = nTested >= nContacts;
    const { uiStore, patientStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    const completeSurvey = () => {
        uiStore.push("/");
        patientStore.initalize();
    }

    return (
        <div>
            <Typography variant="body1" color="initial">
                Thank you for your input!
                {completed ? "It is great that all of your contacts have been tested. Keep up the great work." :
                    "Its very important for the health of your loved ones to ensure that they all get tested for TB. Please reach out to your treatment assistant to set up testing"}
            </Typography>
        </div>

    )
}

export default ConfirmationScreen;