import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    photoPrompt: {
        width: "100%",
        display: "flex",
        borderRadius: "10px",
        padding: "1em",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: "1.5em",
        fontWeight: "bold",
        textAlign: "center",
        width: "auto"
    },
    button: {
        padding: "1em 0",
        width: "100%",
        display: "flex",
        backgroundColor: Colors.actionBlue,
        color: Colors.textDarkGray,
        borderRadius: "10px"
    },
    icon:{
        marginRight: "5px"
    }
})

const PhotoPrompt = ({ onClick }) => {

    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <ButtonBase onClick={onClick} className={classes.button}>
            <div className={classes.photoPrompt}>
                <CameraAltIcon className={classes.icon} />
                <Typography variant="body1" className={classes.buttonText}>
                    {t("patient.report.photo.openCamera")}
                </Typography>
            </div>
        </ButtonBase>
    )
}

export default PhotoPrompt;