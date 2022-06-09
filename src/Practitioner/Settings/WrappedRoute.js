import React from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route } from 'react-router-dom';
import Documents from './Documents';
import PatientInformation from '../../Patient/Information/OldInformation';
import Language from '../../Components/Shared/LanguageQuestion';
import PasswordReset from '../../Components/PasswordUpdate';
import useWindowSize from '../../Hooks/Resize';
import { PageLabel } from '../../Components/Shared/PageLabel';
import { Box, Typography } from '@material-ui/core';

const Routes = (props) => {
  const { t } = useTranslation('translation');

  return (
    <div>
      <Switch>
        <WrappedRoute
          path="/settings/documents"
          children={<Documents />}
          title={t('coordinator.settingsPage.documents')}
        />
        <WrappedRoute
          path="/settings/patient-information"
          children={<PatientInformation />}
          title={t('coordinator.settingsPage.patientInformation')}
        />
        <WrappedRoute
          title={t('coordinator.settingsPage.language')}
          path="/settings/language"
          children={<Language />}
        />
        <WrappedRoute
          title={t('coordinator.settingsPage.updatePassword')}
          path="/settings/update-password"
          children={<PasswordReset />}
        />
        <WrappedRoute
          path="/"
          children={<Documents />}
          title={t('coordinator.settingsPage.documents')}
        />
      </Switch>
    </div>
  );
};

const WrappedRoute = (props) => {
  const { children, title } = props;

  const { isMobile } = useWindowSize();

  return (
    <Route {...props}>
      {isMobile ? (
        <PageLabel title={title} to="/settings" isMobile />
      ) : (
        <Box padding="0 16px 16px 16px" borderBottom="solid 1px lightgray">
          <Typography style={{ fontSize: '24px' }} variant="h2">
            {title}
          </Typography>
        </Box>
      )}
      {children}
    </Route>
  );
};

export default Routes;
