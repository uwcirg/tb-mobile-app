import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, IconButton } from '@material-ui/core';
import { PageLabelTitle } from '../../Components/Shared/PageLabel';
import { Search, Add } from '@material-ui/icons';
import Colors from '../../Basics/Colors';
import { Link } from 'react-router-dom';

export default function TopBar() {
  const { t } = useTranslation('translation');
  return (
    <Box bgcolor="white" borderBottom="solid 1px lightgray" padding=".5em 1em">
      <Grid alignItems="center" container>
        {/* Why does it say all patients? */}
        <PageLabelTitle title={`${t('coordinator.cardTitles.allPatients')}`} />
        <Box flexGrow="1" />
        <IconButton
          style={{
            backgroundColor: Colors.lightgray,
            padding: '5px',
            marginRight: '.5em',
          }}
        >
          <Search />
        </IconButton>
        <IconButton
          style={{
            backgroundColor: Colors.buttonBlue,
            color: 'white',
            padding: '5px',
          }}
          component={Link}
          to={'/patients/add-patient'}
        >
          {<Add />}
        </IconButton>
      </Grid>
    </Box>
  );
}
