import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import OverTopBar from '../Navigation/OverTopBar';
import { useTranslation } from 'react-i18next';
import ProfileButton from '../../Components/FlatButton';
import Grid from '@material-ui/core/Grid';
import AddSubtractField from '../../Components/Patient/AddSubtractField';
import Colors from '../../Basics/Colors';
import PatientInformationAPI from '../../API/PatientInformationAPI';
import useToggle from '../../Hooks/useToggle';
import Explanation from './Explanation';
import Survey from './Survey';
import ConfirmationScreen from './Confirmation'
import NextButton from './NextButton';
import { observer } from 'mobx-react';


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
    label: {
        margin: "1em 0"
    }
})

const ContactTracingUpdate = observer(() => {

    const { uiStore, patientStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    const [step, setStep] = useState(0);

    const [numberOfContacts, setNumberOfContacts] = useState(0);
    const [numberOfTests, setNumberOfTests] = useState(0);
    const [onConfirmation, toggleConfirmation] = useToggle(false);
    const [error, setError] = useState(false);


    const submitSurvey = () => {
        new PatientInformationAPI(patientStore.userID).createContactTracingSurvey(numberOfContacts, numberOfTests).then(processResponse)
    }

    const pages = [<Explanation />,
    <Survey
        setNumberOfContacts={setNumberOfContacts}
        setNumberOfTests={setNumberOfTests}
        numberOfTests={numberOfTests}
        numberOfContacts={numberOfContacts}
        submitSurvey={submitSurvey} />,
    <ConfirmationScreen />]

    const pageInRange = (page) => { return page >= 0 && page < pages.length }

    const processResponse = (json) => {
        toggleConfirmation();
        if (json.httpStatus !== 201) {
            setError(true);
        }
    }

    const handleNext = () => {
        if (pageInRange(uiStore.step + 1)) {
            uiStore.nextStep();
        } else {
            uiStore.push("/")
        }
    }

    const handleBack = () => {
        if (pageInRange(uiStore.step - 1)) {
            uiStore.prevStep();
        } else {
            uiStore.push("/")
        }
    }

    return (
        <>
            <OverTopBar notFixed handleBack={handleBack} title={t('householdTesting.title')} />
            {pageInRange(uiStore.step) && React.cloneElement(pages[uiStore.step], { 
                numberOfContacts: numberOfContacts, numberOfTests: numberOfTests, handleNext: handleNext, wasError: error })}
        </>
    )

})


export default ContactTracingUpdate;