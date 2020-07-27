import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import PopUp from '../Navigation/PopUp';
import { useTranslation } from 'react-i18next';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    slider:{
        width: "80%",
        marginTop: "2em"
    },
    picture: {
        width: "80%",
        objectFit: "contain"
    },
    button:{
        textTransform: "capitalize"
    }
})

const Nausea = () => {

    const classes = useStyles();
    const { patientStore } = useStores();
    const { t, i18n } = useTranslation('translation');
    const [value,setValue] = useState(1)


    const valuetext = (value) => {
        return `${value} / 10 Nausea Rating`;
    }

    const handleClose = () => {
        patientStore.report.nauseaRating = parseInt(value);

    }

    const handleChange = (e,v) =>{
        setValue(v);
    }

    return (
        <PopUp handleClickAway={handleClose} handleClose={handleClose}>
            <Typography>{t('patient.report.symptoms.nauseaRating')}</Typography>
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
            <Button onClick={handleClose} className={classes.button} color="primary">{t('settings.submit')}</Button>
        </PopUp>
    )

}

export default Nausea;