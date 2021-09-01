import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors';
import { SevereSymptoms } from '../../Basics/SymptomsSeperation'
import WarningIcon from '@material-ui/icons/WarningRounded';

const useStyles = makeStyles({
    severe: {
        color: Colors.warningRed,
        fontWeight: "500"
    },
    base: {
        display: "flex",
        alignItems: "center",
        position: "relative"
    },
    warning: {
        // position: "absolute",
        // left: "-1.5em",
        fontSize: "1em"
    }
})

const Symptom = (props) => {
    const { string } = props;
    const { t } = useTranslation('translation');
    const classes = useStyles();

    const isSevere = SevereSymptoms.includes(string);

    return (<span className={`${classes.base} ${isSevere && classes.severe}`} >
        {props.icon && isSevere && <WarningIcon className={classes.warning} />}
        {t(`symptoms.${string}.title`)}
    </span>)

}

export default Symptom;