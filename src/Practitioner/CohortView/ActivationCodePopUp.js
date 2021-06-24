import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react'
import PopOver from '../Shared/PopOver'
import ProfileButton from '../PatientProfile/ProfileButton'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { Typography } from '@material-ui/core'
import Colors from '../../Basics/Colors'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    textarea: {
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
    }
})

const ActivationCodePopup = ({activationCode, close}) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    if (activationCode) return (<PopOver ignoreClickAway title={t('coordinator.addPatientFlow.forPatient')} close={close}>
        <StyledTextCopy className={classes.textarea} readOnly value={activationCode} />
    </PopOver>)
    return ""

}

const CopyText = () => {
    const { t } = useTranslation('translation');
    return (<>{t('coordinator.addPatientFlow.clickToCopy')}</>)
}

const SuccessText = () => {
    const { t } = useTranslation('translation');
    return (<>{t('coordinator.addPatientFlow.success')}</>)
}


class TextCopy extends React.Component {

    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {success: false};
    }

    copyCodeToClipboard = () => {
        this.textInput.current.select();
        document.execCommand("copy")
        this.setState({success: true})
    }


    render() {
        return (
            <div className={this.props.classes.copyContainer}>
                <Typography className={this.props.classes.textDisplay}>{this.props.value}</Typography>
                <ProfileButton onClick={this.copyCodeToClipboard}>
                    <FileCopyIcon />
                    <CopyText />
                </ProfileButton>
                <textarea ref={this.textInput} className={this.props.className} readOnly value={this.props.value} />
                {this.state.success && <Typography className={this.props.classes.successMessage}>
                    <SuccessText />
                    </Typography>}
            </div>
        );
    }
}

const styles  = {
copyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    minHeight: "200px",
    "& > button":{
        marginTop: "1em"
    }

},
textDisplay:{
    fontSize: "1.5em",
    boxSizing: "border-box",
    width: "100%",
    textAlign: "center",
    backgroundColor: Colors.lightgray,
    borderRadius: "5px",
    padding: "1em"
},
successMessage:{
    marginTop: "auto",
    color: "white",
    backgroundColor: Colors.green,
    padding:"5px 1em"
}
}

const StyledTextCopy = withStyles(styles)(TextCopy)

export default ActivationCodePopup;