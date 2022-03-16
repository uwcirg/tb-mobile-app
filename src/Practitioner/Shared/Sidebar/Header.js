import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import Colors from '../../../Basics/Colors';
import { Link } from 'react-router-dom';
import { Avatar, Box, Grid } from '@material-ui/core';
import ProfileButton from '../../../Components/FlatButton';
import Message from '@material-ui/icons/ChatBubbleOutlineRounded';
import Add from '@material-ui/icons/AddCircle';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    headerContainer: {

    },
    buttonContainer: {

    },
    profileLink: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: Colors.buttonBlue
    },
    avatar:{
        backgroundColor: Colors.green
    }
})

const Header = observer(({ selectedPatient }) => {

    const { t } = useTranslation('translation');
    const { practitionerUIStore } = useStores();

    const openNewNote = () => {
        practitionerUIStore.openNoteForSelectedPatient(selectedPatient.id)
    }

    const classes = useStyles();

    const initals = () => {
        return selectedPatient.givenName.charAt(0) + selectedPatient.familyName.charAt(0);
    }

    return (<div className={classes.headerContainer}>
        <Link className={classes.profileLink} to={`/patients/${selectedPatient.id}`}>
            <Avatar className={classes.avatar}>{initals()}</Avatar>
            <Box width=".5em" />
            <h2>{selectedPatient.fullName}</h2>
        </Link>
        <Grid container className={classes.buttonContainer}>
            <ProfileButton onClick={() => { practitionerUIStore.goToChannel(selectedPatient.channelId) }} ><Message />{t("coordinator.patientProfile.options.message")}</ProfileButton>
            <Box width=".5em" />
            <ProfileButton backgroundColor={"white"}
                border color={Colors.buttonBlue}
                onClick={openNewNote}
            ><Add />{t("coordinator.patientProfile.options.note")}</ProfileButton>
        </Grid>
    </div>)

});

export default Header;