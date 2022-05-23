import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import PopUp from '../Navigation/PopUp';
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors'
import { Box, ButtonBase, Grid, Typography } from '@material-ui/core';
import FlatButton from '../../Components/FlatButton';

const useStyles = makeStyles({
    topText: {
        fontSize: "1.2rem",
        textAlign: "left",
        fontWeight: "bold"
    },
    selectionButton: {
        borderRadius: "5px",
        border: `solid 2px ${Colors.textGray}`,
        position: "relative",
        boxSizing: "border-box"
    },
    buttonNumber: {
        position: "absolute",
        fontSize: "1.5em",
        alignSelf: "flex-start",
        padding: "0 8px",
        top: 0,
        left: 0
    },
    buttonImage: {
        width: "100%",
        borderRadius: "5px"
    },
    submitButton: {
        width: "100%",
        fontSize: "1em",
        justifyContent: "center"
    },
    selectedButton: {
        border: `solid 2px ${Colors.buttonBlue}`,
        "& *": {
            color: Colors.buttonBlue
        }
    }
})

const Nausea = () => {

    const classes = useStyles();
    const { patientStore } = useStores();
    const { t } = useTranslation('translation');
    const [value, setValue] = useState(null)

    const handleClose = () => {
            patientStore.setReportNauseaRating(value !== null ? parseInt(value) : null);
    }

    const handleChange = (v) => {
        setValue(v);
    }

    const nums = [0, 2, 4, 6, 8, 10]

    return (
        <PopUp handleClickAway={handleClose} handleClose={handleClose}>
            <Box paddingTop="32px">
                <Typography variant='h1' className={classes.topText}>{t('patient.report.symptoms.instructions')}</Typography>
            </Box>
            <Box padding="32px 0">
                <Grid data-testid="nausea-selections" container>
                    {nums.map(num => {
                        return (
                            <Grid key={`nausea-selection-${num}`} item xs={4}>
                                <Box padding={".25em"}>
                                    <ButtonBase onClick={() => {
                                        handleChange(num)
                                    }} type="radio" className={`${classes.selectionButton} ${value === num ? classes.selectedButton : ""}`}>
                                        <Typography className={classes.buttonNumber} variant="body1">{num}</Typography>
                                        <Box padding="6px">
                                            <img className={classes.buttonImage} src={`/img/nausea-scale/${num}.jpg`} />
                                        </Box>
                                    </ButtonBase>
                                </Box>
                            </Grid>)})}
                </Grid>
            </Box>
            <FlatButton onClick={handleClose} disabled={value === null} className={classes.submitButton}>{t('settings.submit')}</FlatButton>
        </PopUp>
    )

}

export default Nausea;