import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Typography } from '@material-ui/core';
import Colors from '../Basics/Colors';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
    textArea: {
        opacity: ".01",
        cursor: "default"
    },
    copyBox: {
        border: `1px solid ${Colors.gray}`,
        borderRadius: "5px",
        width: "100%",
        overflow: "hiddden"
    },
    textDisplay: {
        color: Colors.textDarkGray,
        overflow: "scroll",
        fontSize: "1em",
        textAlign: "center",
        padding: ".25em",
        whiteSpace: "nowrap"
    },
    link: {
        padding: "0 .5em",
        borderRight: `1px solid ${Colors.gray}`,
        marginRight: ".5em"
    },
    copyButton: {
        padding: ".5em",
        fontSize: "1em",
        display: "flex",
        marginLeft: ".5em",
        color: "white",
        alignSelf: "stretch",
        textTransform: "capitalize",
        borderRadius: "0",
        backgroundColor: props => props.success ? Colors.green : Colors.buttonBlue,
        "&:hover": {
            backgroundColor: props => props.success ? Colors.green : Colors.buttonBlue,
        }
    },
    buttonIcon: {
        fontSize: "1em",
        marginRight: ".5em"
    }
})

const CopyTextInput = ({ text, className }) => {

    const { t } = useTranslation('translation');
    const [success, setSuccess] = useState(false);
    const textRef = useRef(null);
    const classes = useStyles({ success: success });

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
            <ButtonElement success={success} onClick={copyCodeToClipboard} />
        </Grid>
        <textarea ref={textRef} className={classes.textArea} readOnly value={text} />
    </div>);

}

const ButtonElement = ({ success, onClick }) => {
    const { t } = useTranslation('translation');
    const classes = useStyles({ success: success });
    return (
    <Tooltip title={t('commonWords.copyExplanation')}>
        <Button className={classes.copyButton} aria-label="copy-link" onClick={onClick} >
        {success ? <CheckIcon className={classes.buttonIcon} /> : <FileCopyIcon className={classes.buttonIcon} />}
        {success ? t('commonWords.copied') : t('commonWords.copy')}
    </Button>
    </Tooltip>)

}

export default CopyTextInput;