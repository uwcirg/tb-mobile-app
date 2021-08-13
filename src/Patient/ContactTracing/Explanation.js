import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles({
    body: {
        minHeight: "70vh",
        display: "flex",
        alignItems: "center"
    }
})

const Explanation = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (
        <div className={classes.body}>
            <Typography variant="body1" color="initial">{t('patient.onboarding.contactTracing.explanation')}</Typography>
        </div>)

}

export default Explanation;