import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import GlobeIcon from '@material-ui/icons/Public';
import PasswordIcon from '@material-ui/icons/Lock';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import PatientIcon from '@material-ui/icons/Accessibility';
import DocIcon from '@material-ui/icons/Description';
import ReportProblem from '@material-ui/icons/ReportProblem';
import useWindowSize from '../../Hooks/Resize';
import { useLocation } from 'react-router-dom';
import Routes from './Routes';
import NavItem from './NavItem';

const useStyles = makeStyles({
  desktopContainer: {
    display: 'flex',
    width: '100%',
  },
  navigation: {
    minHeight: '100vh',
    boxSizing: 'border-box',
    height: '100%',
    padding: '1em',
    borderRight: 'solid 1px lightgray',
  },
  mobileNav: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    padding: '1em',
  },
  mobileNavLinks: {
    textDecoration: 'none',
  },
  header: {
    fontSize: '1.5em',
    margin: 0
  },
  list: {
    padding: 0,
    margin: 0
  },
  body: {
    padding: '1em 0',
    flex: 1,
    height: '100vh',
    overflow: 'scroll',
    boxSizing: 'border-box',
  },
});

const Settings = () => {
  const classes = useStyles();
  const { isMobile } = useWindowSize();
  const location = useLocation();

  return (
    <div>
      {isMobile ? (
        <>{location.pathname === '/settings' ? <SettingsNav /> : <Routes />}</>
      ) : (
        <div className={classes.desktopContainer}>
          <SettingsNav />
          <div className={classes.body}>
            <Routes />
          </div>
        </div>
      )}
    </div>
  );
};

const SettingsNav = () => {
  const { t } = useTranslation('translation');
  const classes = useStyles();
  const { isMobile } = useWindowSize();
  
  return (
    <div className={isMobile ? classes.mobileNav : classes.navigation}>
      <Typography className={classes.header} variant="h2">
        {t('patient.tabNames.information')}
      </Typography>
      <ul className={classes.list}>
        <NavItem
          to="documents"
          icon={<DocIcon />}
          text={t('coordinator.settingsPage.documents')}
        />

        <NavItem
          to="information"
          icon={<PatientIcon />}
          text={t('coordinator.settingsPage.patientInformation')}
        />

        <NavItem
          href="https://forms.gle/rRxp9f4bbVT5uB4R9"
          icon={<ReportProblem />}
          text={t('patient.information.reportIssue')}
        />
      </ul>
      <br />
      <Typography className={classes.header} variant="h2">
        {t('patient.profile.title')}
      </Typography>
      <ul className={classes.list}>
        <NavItem
          to="language"
          icon={<GlobeIcon />}
          text={t('patient.profile.options.language')}
        />
        <NavItem
          to="update-password"
          icon={<PasswordIcon />}
          text={t('patient.profile.changePassword')}
        />
        <NavItem
          isLogout
          icon={<LogoutIcon />}
          text={t('patient.profile.logout')}
        />
      </ul>
    </div>
  );
};

export default Settings;
