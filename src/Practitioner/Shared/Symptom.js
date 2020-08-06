import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors';
import {SevereSymptoms} from '../../Basics/SymptomsSeperation'

const useStyles = makeStyles({
  severe:{
      color: Colors.warningRed
  }
})

const Symptom = (props) => {
    const {string} = props;
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();

    return(<span className={`${SevereSymptoms.includes(string) && classes.severe}`} >
        {t(`symptoms.${string}.title`)}
    </span>)

}

export default Symptom;