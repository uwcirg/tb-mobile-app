import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import HorizontalButtons from './HorizontalOptions';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const useStyles = makeStyles({
    header: {
        width: "100%",
        boxSizing: "border-box",
        padding: "1em",
        display: "flex",
        alignItems: "center",
        ...Styles.profileCard

    },
    profileHeader: {
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        "& > h1": {
            ...Styles.header,
            margin: 0
        }
    },
    phoneIcon:{
        height: ".75em",
        color: Colors.blue
    }
})

const ProfileHeader = observer(() => {

    const classes = useStyles();
    const {patientProfileStore} = useStores();
    

    return (<div className={classes.header}>
        <div className={classes.profileHeader}>
            <Avatar style={{ backgroundColor: Colors.green, marginRight: "1em" }} size="small">{patientProfileStore.selectedPatient.details.fullName[0]}</Avatar>
            <Grid container direction="column">
                <Typography variant="h1">{patientProfileStore.selectedPatient.details.fullName}</Typography>
                <Grid wrap="nowrap" justify="flex-end" container alignItems="center" >
                    <WhatsAppIcon className={classes.phoneIcon} />
                    <Typography variant="body1" color="initial">{patientProfileStore.selectedPatient.details.phoneNumber}</Typography>
                </Grid>
            </Grid>
        </div>
        <HorizontalButtons />
    </div>)

});

export default ProfileHeader;