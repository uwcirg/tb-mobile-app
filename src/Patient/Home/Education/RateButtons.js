import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores';
import Button from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Colors from '../../../Basics/Colors';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    buttonGroup: {
        alignSelf: "center",
        width: "90%",
        marginTop: "auto",
        "& > button": {
            width: "50%",
            color: Colors.buttonBlue
        }
    },
    thumbsContainer: {
        width: "100%",
        "& > p": {
            fontWeight: "bold",
            marginBottom: 0
        }
    },
})

const RateButtons = () => {

    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { patientUIStore, patientStore } = useStores();
    const { educationStore: education } = patientStore;

    const handleRate = (rate) => {
        education.setExited(true);
        education.markEducationAsRead(rate);
        patientUIStore.setAlert(t("educationalMessages.feedback"), "success")
    }

    return (
        <div className={classes.thumbsContainer}>
            <p>{t("educationalMessages.helpful")}</p>
            <ButtonGroup className={classes.buttonGroup}>
                <Button onClick={() => { handleRate(false) }}> <ThumbDownIcon /></Button>
                <Button onClick={() => { handleRate(true) }}><ThumbUpIcon /></Button>
            </ButtonGroup>
        </div>
    )

}

export default RateButtons;