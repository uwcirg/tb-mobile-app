import React, { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { Typography } from '@material-ui/core'
import Colors from '../Basics/Colors'
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid'
import LinkIcon from '@material-ui/icons/Link'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
    textArea: {
        opacity: ".01",
        cursor: "default"
    },
    copyBox: {
        overflowX: "hidden",
        border: `1px solid ${Colors.gray}`,
        borderRadius: "5px",
        width: "100%"
    },
    textDisplay: {
        color: Colors.textDarkGray,
        overflow: "scroll",
        fontSize: "1em",
        boxSizing: "border-box",
        flexGrow: "1",
        textAlign: "center",
        padding: ".25em",
        borderLeft: `1px solid ${Colors.gray}`,
        whiteSpace: "nowrap"
    },
    link:{
        padding: "0 .5em"
    },
    copyButton:{
        color: "white",
        textTransform: "capitalize",
        borderRadius: "0",
        backgroundColor: props => props.success ?  Colors.green : Colors.buttonBlue,
        "&:hover":{
            backgroundColor: props => props.success ?  Colors.green : Colors.buttonBlue,
        }
    }
})

const CopyTextInput = ({ text, className }) => {

    const { t } = useTranslation('translation');
    const [success, setSuccess] = useState(false);
    const textRef = useRef(null);

    const classes = useStyles({success: success});

    const copyCodeToClipboard = () => {
        textRef.current.select();
        document.execCommand("copy");
        setSuccess(true);
    }

    return (<div className={`${classes.copyContainer} ${className}`}>
        <Grid wrap="nowrap" alignItems="center" container className={classes.copyBox}>
            <LinkIcon className={classes.link} />
            <div className={classes.textDisplay}>
                 <Typography variant="body1">{text}</Typography>
            </div>
           
            <Button className={classes.copyButton} aria-label="copy-link" onClick={copyCodeToClipboard}>
                {success ? t('commonWords.copied') : t('commonWords.copy')}
            </Button>
        </Grid>
        <textarea ref={textRef} className={classes.textArea} readOnly value={text} />
    </div>);

}

export default CopyTextInput;