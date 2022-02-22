import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Colors from '../Basics/Colors';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles({
    error: {
        borderLeft: `5px solid ${Colors.warningRed}`,
        paddingLeft: "1em"
    }
})

const PermissionsError = () => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <Collapse appear in timeout={1000}>
            <div className={classes.error}>
                <p>{t('patient.report.photo.permissionsError')}</p>
            </div>
        </Collapse>
    )

}

export default PermissionsError;