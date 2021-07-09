import React, { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ProfileButton from '../Practitioner/PatientProfile/ProfileButton'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { Typography } from '@material-ui/core'
import Colors from '../Basics/Colors'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    textArea: {
        resize: "none",
        display: "flex",
        padding: ".5em",
        fontFamily: "sans-serif",
        fontSize: "1em",
        borderRadius: "5px",
        verticalAlign: "center",
        height: "1em",
        width: "50px",
        opacity: ".01"
    },
    copyContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        width: "100%",
        minHeight: "200px",
        "& > button": {
            marginTop: "1em"
        }
    },
    textDisplay: {
        fontSize: "1.5em",
        boxSizing: "border-box",
        width: "100%",
        textAlign: "center",
        backgroundColor: Colors.lightgray,
        borderRadius: "5px",
        padding: "1em"
    },
    successMessage: {
        marginTop: "auto",
        color: "white",
        backgroundColor: Colors.green,
        padding: "5px 1em"
    }
})


const CopyTextInput = ({text}) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const [success,setSuccess] = useState(false)
    const textRef = useRef(null);

    const copyCodeToClipboard = () => {
        textRef.current.select();
        document.execCommand("copy");
        setSuccess(true);
    }

    return (  <div className={classes.copyContainer}>
        <Typography className={classes.textDisplay}>{text}</Typography>
        <ProfileButton onClick={copyCodeToClipboard}>
            <FileCopyIcon />
            {t('coordinator.addPatientFlow.clickToCopy')}
        </ProfileButton>
        <textarea ref={textRef} className={classes.textArea} readOnly value={text} />
        {success && <Typography className={classes.successMessage}>
        {t('coordinator.addPatientFlow.success')}
        </Typography>}
    </div>);

}

export default CopyTextInput;