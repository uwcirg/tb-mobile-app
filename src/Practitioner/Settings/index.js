import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';
import Language from '../../Components/Shared/LanguageQuestion';
import { useTranslation } from 'react-i18next';
import { ButtonBase, Typography } from '@material-ui/core';
import GlobeIcon from '@material-ui/icons/Public';
import PasswordIcon from '@material-ui/icons/Lock';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import PasswordReset from '../../Components/PasswordUpdate';
import Documents from './Documents';
import PatientIcon from '@material-ui/icons/Accessibility';
import DocIcon from '@material-ui/icons/Description';
import ReportProblem from '@material-ui/icons/ReportProblem';
import PatientInformation from '../../Patient/Information';
import useLogout from '../../Basics/Logout';
import useWindowSize from '../../Hooks/Resize';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { PageLabel } from '../../Components/Shared/PageLabel';

const useStyles = makeStyles({

  report: {
    display: 'flex',
    width: '100%',
  },
  navigation: {
    minHeight: "100vh",
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
  navItemContainer: {
    listStyle: 'none',
    width: '100%',
    height: '2.5em',
  },
  navItem: {
    boxSizing: 'border-box',
    height: '100%',
    margin: '1em 0 0 0',
    padding: '1.5em 1.2em',
    display: 'flex',
    width: '100%',
    borderRadius: '7px',
    color: (props) => (props.selected ? 'white' : Colors.buttonBlue),
    backgroundColor: (props) =>
      props.selected ? Colors.textGray : Colors.lightgray,
    '& > span:first-letter': {
      textTransform: 'capitalize',
    },
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& > *:first-child': {
      marginRight: '5px',
    },
    fontSize: '1em',
  },
  header: {
    fontSize: '1.5em',
  },
  list: {
    padding: '1em 0 0 0',
    margin: 0,
  },
  body: {
    padding: '1em 0',
    flex: 1,
    height: '100vh',
    overflow: 'scroll',
    boxSizing: 'border-box',
  }
});

const Settings = (props) => {
  const classes = useStyles();
  const { isMobile } = useWindowSize();
  const location = useLocation();

  return (
    <div>
      {isMobile ? (
        <>{location.pathname === '/settings' ? <SettingsNav /> : <Routes />}</>
      ) : (
        <div className={classes.report}>
          <SettingsNav className={classes.body} />
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
  //   Links returned if isMobile
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
          to="patient-information"
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
        {/*<NavItem id="account" icon={<PersonIcon />} text={t('patient.profile.options.account')} /> */}
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

const NavItem = (props) => {
  const location = useLocation();

  const classes = useStyles({
    selected: (props.to === location.pathname.split('/')[2] && props.to),
    isLogout: props.isLogout,
  });

  const logout = useLogout();

  const LinkButton = (props) => (
    <ButtonBase
      component={props.to ? Link : 'button'}
      to={props.to}
      href={props.href}
      target={props.href ? 'blank' : null}
      onClick={props.onClick}
      className={`${classes.navItem}`}
    >
      {props.icon}
      <span>{props.text}</span>
    </ButtonBase>
  );

  return (
    <li className={classes.navItemContainer}>
      <LinkButton
        to={props.to && `/settings/${props.to}`}
        icon={props.icon}
        href={props.href}
        text={props.text}
        onClick={props.isLogout && logout}
      />
    </li>
  );
};

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
  const { isMobile } = useWindowSize();

  return (
    <Route {...props}>
      <PageLabel title={props.title} to="/settings" isMobile={isMobile} />
      {props.children}
    </Route>
  );
};

export default Settings;
