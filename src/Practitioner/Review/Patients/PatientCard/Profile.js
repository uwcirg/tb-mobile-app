import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../../Basics/UseStores';
import { observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography'
import PatientPicture from '../../../../Basics/PatientIcon'
import Colors from '../../../../Basics/Colors'
import Priority from '../../../Shared/Priority'
import { useTranslation } from 'react-i18next';
import ProfileButton from '../../../../Components/FlatButton.js'
import { Button } from '@material-ui/core';
import Message from '@material-ui/icons/ChatBubble';
import Add from '@material-ui/icons/AddCircle';

const useStyles = makeStyles({

    priority:{
        width: "60%",
        marginTop: ".5em"
    },
    profile: {
        width: "120px",
        borderRight: `1px solid ${Colors.gray}`,
        height: "auto",
        display: "flex",
        flexDirection: "column"
    },
    top: {
        display: "flex",
        alignItems: "flex-end",
        "& > h3, & > a > h3": {
            fontSize: "1.25em",
        },
        "& > a":{
            textDecoration: "none",
            color: Colors.buttonBlue
        },
        "& > a:visited":{
            color: Colors.buttonBlue
        }
    },
    circle: {
        display: "flex",
        alignItems: "center",
        "& > div": {
            backgroundColor: Colors.accentBlue,
            height: "25px",
            width: "25px",
            marginTop: "0",
            paddingTop: "0",
            "& > p": {
                fontSize: "1em"
            }
        }
    },
    data:{
        margin: "auto 0",
        padding: "1em 0",
        "& > p":{
            margin: 0,
            padding: 0,
            "& > span":{
                fontWeight: "bold"
            }
        }
    },
    buttons:{
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        "& > button":{
            marginTop: ".5em"
        }
    }
})

const Profile = (props) => {

    const classes = useStyles();
    const { practitionerUIStore } = useStores();

    return (
        <div className={classes.profile}>
            <div className={classes.top}>
                {/* <PatientPicture className={classes.circle} name={props.givenName} /> */}
                <a href="/" onClick={(e)=>{ e.preventDefault(); practitionerUIStore.goToPatient(props.id)}}><Typography variant="h3">{props.givenName} {props.familyName[0]}.</Typography></a>
            </div>
            <div className={classes.priority}>
                <Priority index={props.priority} />
            </div>
            <div className={classes.data}>
                <Typography variant="body1"><span>Week: </span>{props.weeksInTreatment}/26</Typography> 
                <Typography variant="body1"><span>Adherence: </span>{Math.round(props.adherence * 100)}%</Typography>
            </div>
            <div>
                <Buttons id={props.id} channelId={props.channelId} />
            </div>
        </div>)

}


const Buttons = observer((props) => {
    const { practitionerUIStore, practitionerStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    const messagePatient = () => {
        practitionerUIStore.goToChannel(props.channelId);
    }

    return (
        <div className={classes.buttons}>
            <ProfileButton onClick={messagePatient}><Message />{t("coordinator.patientProfile.options.message")}</ProfileButton>
            <ProfileButton onClick={practitionerUIStore.openAddPatientNote} ><Add />{t("coordinator.patientProfile.options.note")}</ProfileButton>
        </div>
    )
})

export default Profile;