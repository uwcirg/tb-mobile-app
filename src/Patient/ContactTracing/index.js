import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import Typography from '@material-ui/core/Typography';
import OverTopBar from '../Navigation/OverTopBar';
import XIcon from '@material-ui/icons/Clear';
import { useTranslation } from 'react-i18next';
import ProfileButton from '../../Practitioner/PatientProfile/ProfileButton';

const useStyles = makeStyles({
    body: {
        padding: "1em"
    }
})

const ContactTracingUpdate = () => {

    const { uiStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<div>
        <OverTopBar notFixed handleBack={() => { uiStore.push("/") }} title={t('updatedContactTracing.title')} />
        <div className={classes.body}>
            <p>Hello</p>
            <ProfileButton>Submit</ProfileButton>
        </div>
    </div>)

}

export default ContactTracingUpdate;