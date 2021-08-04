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
import TracingOptions from './TracingOptions';


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
        padding: "1em"
    },
    label: {
        margin: "1em 0"
    }
})

const ContactTracingUpdate = () => {

    const { uiStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    const [numberOfContacts, setNumberOfContacts] = useState(0);
    const [numberOfTests, setNumberOfTests] = useState(0);

    return (<div>
        <OverTopBar notFixed handleBack={() => { uiStore.push("/") }} title={t('updatedContactTracing.title')} />
        <div className={classes.body}>
            <Typography variant="body1" color="initial">{t('patient.onboarding.contactTracing.explanation')}</Typography>
            <SectionLabel number="1" text={t('patient.onboarding.contactTracing.one')} />
            <AddSubtractField
                value={numberOfContacts}
                setValue={setNumberOfContacts} />
                {numberOfContacts > 0 && <>
            <SectionLabel number="2" text={t('patient.onboarding.contactTracing.two')} />
            <AddSubtractField
                value={numberOfTests}
                setValue={setNumberOfTests} />
                </>}
        </div>
        <Grid className={classes.buttonContainer} justify="flex-end" container spacing={1}>
            <ProfileButton>{t('coordinator.patientProfile.editDetails.submit')}</ProfileButton>
        </Grid>
    </div>)

}

const SectionLabel = ({ text, number }) => {

    const classes = useStyles();

    return (<Grid className={classes.label} alignItems="center" wrap="nowrap" container>
        <Avatar className={classes.avatar} size="small">{number}</Avatar>
        <Typography variant="body1" color="initial">{text}</Typography>
    </Grid>)
}

export default ContactTracingUpdate;