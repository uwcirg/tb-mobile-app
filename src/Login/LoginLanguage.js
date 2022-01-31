import React from 'react';
import LanguageQuestion from '../Components/Shared/LanguageQuestion';
import { Box, Grid, Typography } from '@material-ui/core';
import { Language } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import Colors from '../Basics/Colors';

const LoginLanguage = () => {

    const { t } = useTranslation('translation');

    return (<Box width="75%" maxWidth="400px" margin="0 auto" >
        <Grid style={{ color: "white", padding: ".5em 0" }} container alignItems='center'>
            <Language />
            <Box width=".25em" />
            <Typography variant="body1">{t('coordinator.settingsPage.language')}:</Typography>
        </Grid>
        <LanguageQuestion
            selectedBorderColor={Colors.gray}
            selectedBackgroundColor={Colors.gray}
            selectedTextColor={"#04193c"}
            defaultBackgroundColor={"#295aad"}
            defaultTextColor={"#efefef"}
            defaultBorderColor={"#efefe"}
            />
    </Box>)

}

export default LoginLanguage;