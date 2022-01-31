import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LanguageQuestion from '../Components/Shared/LanguageQuestion';
import { Box, Grid, Typography } from '@material-ui/core';
import { Language } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles({

})

const LoginLanguage = () => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<Box width="75%" maxWidth="400px" margin="0 auto" >
        <Grid style={{ color: "white", padding: ".5em 0" }} container alignItems='center'>
            <Language />
            <Box width=".25em" />
            <Typography variant="body1">{t('coordinator.settingsPage.language')}:</Typography>
        </Grid>
        <LanguageQuestion isLoginPage />
    </Box>)

}

export default LoginLanguage;