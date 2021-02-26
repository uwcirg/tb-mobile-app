import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react'
import LinearProgress from '@material-ui/core/LinearProgress';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    container: {
        width: "80%",
        textAlign: "center",
        margin: "auto"
    }
})

const PhotoUploading = observer(() => {
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<div className={classes.container}>
        <LinearProgress className={classes.progressVisual} />
        <p className={classes.message}>{t('patient.report.photoUploading')}... </p>
    </div>)

})

export default PhotoUploading;