import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import PopUp from '../Navigation/PopUp';
import { useTranslation } from 'react-i18next';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Colors from '../../Basics/Colors'


const useStyles = makeStyles({
    slider: {
        width: "80%",
        marginTop: "2em"
    },
    picture: {
        width: "80%",
        objectFit: "contain"
    },
    button: {
        textTransform: "capitalize",
        marginTop: "2em"
    },
    buttons:{
        width: "70%",
        display: "flex",
        justifyContent: "space-between",
       "& > button":{
        border: `1px solid ${Colors.buttonBlue}`,
        padding: 0
       },
        "& > button > span":{
            color: Colors.buttonBlue,
            fontSize: "1.75em"
        }
    },
    topText: {
        marginTop: "1em",
        marginBottom: "1em"
    }
})

const Nausea = () => {

    const classes = useStyles();
    const { patientStore } = useStores();
    const { t, i18n } = useTranslation('translation');
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


    return (
        <PopUp handleClickAway={handleClose} handleClose={handleClose}>
            <Typography className={classes.topText}>{t('patient.report.symptoms.nauseaRating')}</Typography>
            <img className={classes.picture} src="/scale.jpg" />
            <Slider
                value={value}
                className={classes.slider}
                getAriaValueText={valuetext}
                onChange={handleChange}
                aria-labelledby="nausea-rating-slider"
                valueLabelDisplay="on"
                step={1}
                marks
                min={0}
                max={10}
            />
            <div className={classes.buttons}>
                <Button onClick={subtract}>-</Button>
                <Button onClick={add} >+</Button>
            </div>
            <Button onClick={handleClose} className={classes.button} color="primary">{t('settings.submit')}</Button>
        </PopUp>
    )

}

export default Nausea;