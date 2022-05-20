import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import PopUp from '../Navigation/PopUp';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
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
    submitButton:{
        width: "100%",
        fontSize: "1em",
        justifyContent: "center"
    }
})

const Nausea = () => {

    const classes = useStyles();
    const { patientStore } = useStores();
    const { t } = useTranslation('translation');
    const [value, setValue] = useState(1)


    const valuetext = (value) => {
        return `${value} / 10 Nausea Rating`;
    }

    const handleClose = () => {
        patientStore.report.nauseaRating = parseInt(value);

    }

    const handleChange = (e, v) => {
        setValue(v);
    }

    const subtract = () => {
        if (value > 1) {
            setValue(value - 1)
        }
    }

    const add = () => {
        if (value < 10) {
            setValue(value + 1)
        }
    }

    const nums = [0, 2, 4, 6, 8, 10]


    return (
        <PopUp handleClickAway={handleClose} handleClose={handleClose}>
            <Box paddingTop="32px">
                <Typography variant='h1' className={classes.topText}>{t('patient.report.symptoms.instructions')}</Typography>
            </Box>
            <Box padding="32px 0">
                <Grid container>
                    {nums.map(num => {
                        return (
                            <Grid xs={4}>
                                <Box padding={".25em"}>
                                    <ButtonBase className={classes.selectionButton}>
                                        <Typography className={classes.buttonNumber} variant="body1">{num}</Typography>
                                        <Box padding="6px">
                                            <img className={classes.buttonImage} src={`/img/nausea-scale/${num}.jpg`} />
                                        </Box>
                                    </ButtonBase>
                                </Box>
                            </Grid>)}
                    )}
                </Grid>
            </Box>
            <FlatButton className={classes.submitButton}>{t('settings.submit')}</FlatButton>
        </PopUp>
    )

}

export default Nausea;