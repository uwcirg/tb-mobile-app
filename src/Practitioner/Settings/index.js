import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors';
import { observer } from 'mobx-react';
import Language from '../../Components/Shared/LanguageQuestion';
import { useTranslation } from 'react-i18next';
import { Box, ButtonBase, Typography } from '@material-ui/core';
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
import Profile from './Profile';
import useWindowSize from '../../Hooks/Resize';
import { Switch, Route, Link, Redirect, useLocation } from 'react-router-dom';
import { PageLabel } from '../../Components/Shared/PageLabel';

const useStyles = makeStyles({
  image: {
    height: '100px',
    marginLeft: 'auto',
  },
  report: {
    display: 'flex',
    width: '100%',
    border: '2px solid lightgray',
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    marginLeft: '1em',
  },
  reportContainer: {
    width: '50%',
  },
  patient: {
    backgroundColor: 'lightgray',
  },
  button: {
    display: 'block',
    margin: 'auto',
    marginTop: '2em',
  },
  navigation: {
    boxSizing: 'border-box',
    width: '250px',
    minWidth: '250px',
    height: '100%',
    paddingTop: '1em',
    borderRight: 'solid 1px lightgray',
  },
  mobileNav: {
    boxSizing: 'border-box',
    width: '95%',
    height: '100%',
    paddingTop: '1em',
  },

  mobileNavLinks: {
    textDecoration: 'none',
  },

  navItemContainer: {
    listStyle: 'none',
    height: '2.5em',
  },
  navItem: {
    boxSizing: 'border-box',
    height: '100%',
    margin: '.5em 0 0 0',
    padding: '.25em',
    display: 'flex',
    width: '90%',
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
    padding: '1em',
    flex: 1,
    height: '100vh',
    overflow: 'scroll',
    boxSizing: 'border-box',
  },
  bodyContent: {
    borderTop: '1px solid black',
    marginTop: '1em',
    width: '100%',
  },
  patientInformation: {
    width: '50%',
  },
  topInfo: {
    padding: '1em',
  },
  password: {
    width: '50%',
  },
});

const Settings = (props) => {
  const classes = useStyles();
  const { practitionerUIStore } = useStores();
  const { isMobile } = useWindowSize();
  const location = useLocation();

  //Default To Account Page
  useEffect(() => {
    practitionerUIStore.settingsTab = 'documents';
  }, []);

  return (
    <div>
      {isMobile ? (
        <>{location.pathname === '/settings' ? <SettingsNav /> : <Routes />}</>
      ) : (
        <>
          <SettingsNav />
          <Routes />
        </>
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

const NavItem = observer((props) => {
  const { t } = useTranslation('translation');
  const { practitionerUIStore } = useStores();
  const classes = useStyles({
    selected: practitionerUIStore.settingsTab === props.id,
    isLogout: props.id === 'logout',
  });
  const logout = useLogout();

  const LinkButton = (props) => (
    <ButtonBase
      component={props.to ? Link : 'button'}
      to={props.to}
      href={props.href}
      target={props.href ? 'blank' : null}
      onClick={props.onClick}
      className={classes.navItem}
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
});

const Routes = observer((props) => {
  const { t } = useTranslation('translation');
  const { isMobile } = useWindowSize();
  const location = useLocation();
  return (
    <>
      <Switch>
        <WrappedRoute
          path="/settings/documents"
          children={<Documents />}
          title={t('coordinator.settingsPage.documents')}
        />
        <WrappedRoute
          path="/settings/patient-information"
          children={<PatientInformation />}
          title=""
        />
        <Route path="/settings/language" children={<Language />} />
        <Route path="/settings/update-password" children={<PasswordReset />} />
        <WrappedRoute
          path="/"
          children={<Documents />}
          title={t('coordinator.settingsPage.documents')}
        />
      </Switch>
    </>
  );
});

const WrappedRoute = (props) => {
  return (
    <Route {...props}>
      <PageLabel title={props.title} to="/settings" />
      {props.children}
    </Route>
  );
};

// const BodyRouter = observer((props) => {
//   const classes = useStyles();
//   return (
//     <div className={classes.body}>
//       <div>
//         <Routes />
//       </div>
//     </div>
//   );
// });

export default Settings;
