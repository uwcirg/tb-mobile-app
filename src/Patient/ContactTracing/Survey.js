import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NextButton from './NextButton';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import ProfileButton from '../../Components/FlatButton';
import Grid from '@material-ui/core/Grid';
import AddSubtractField from '../../Components/Patient/AddSubtractField';
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';


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

const SectionLabel = ({ text, number }) => {

    const classes = useStyles();

    return (<Grid className={classes.label} alignItems="center" wrap="nowrap" container>
        <Avatar className={classes.avatar} size="small">{number}</Avatar>
        <Typography variant="body1" color="initial">{text}</Typography>
    </Grid>)
}

const ContactTracingSurvey = ({numberOfTests,numberOfContacts,setNumberOfTests,setNumberOfContacts,submitSurvey}) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<div>
        <div className={classes.body}>
            <SectionLabel number="1" text={t('patient.onboarding.contactTracing.one')} />
            <AddSubtractField
                value={numberOfContacts}
                setValue={setNumberOfContacts} />
            {numberOfContacts > 0 && <>
                <SectionLabel number="2" text={t('patient.onboarding.contactTracing.two')} />
                <AddSubtractField
                    value={numberOfTests}
                    setValue={setNumberOfTests}
                    maxValue={numberOfContacts}
                />
            </>}
        </div>
    </div>)

}

export default ContactTracingSurvey;