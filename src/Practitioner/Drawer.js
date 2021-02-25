import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import { observer } from 'mobx-react';
import useStores from '../Basics/UseStores';
import PatientsIcon from '@material-ui/icons/SupervisorAccount';
import IconButton from '@material-ui/core/IconButton';
import LogOut from '@material-ui/icons/ExitToApp';
import Settings from '@material-ui/icons/Settings'
import MessagingIcon from '@material-ui/icons/QuestionAnswer';
import Colors from "../Basics/Colors";
import Badge from '@material-ui/core/Badge'
import Tooltip from '@material-ui/core/Tooltip'
import { useTranslation } from 'react-i18next';
import ReportIssue from '@material-ui/icons/ReportProblem';

const drawerWidth = 200;

//boxShadow: "5px 0px 5px 0px lightgray",

const useStyles = makeStyles({
  drawer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "1px 0px 5px 0px lightgray",
    backgroundColor: "white"
  },
  list: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    "& > div > div > svg": {
      fontSize: "3em",
      color: "black"
    },
    "& > div > div > span > svg": {
      fontSize: "3em",
      color: "black"
    },
    "& > div > div": {
      display: "flex",
      width: "100%",
      justifyContent: "flex-end",
    },
    marginBottom: "auto"
  },
  settingsIcon: {
    boxSizing: "border-box",
    width: "100%",
    borderRadius: 0
  },
  selected: {
    "& > div > svg, & > div > span > svg": {
      fill: Colors.buttonBlue
    },

  }
});

const PractitionerDrawer = observer(() => {
  const classes = useStyles();
  const { routingStore, practitionerStore, practitionerUIStore, messagingStore, loginStore } = useStores();
  const { location, push, goBack } = routingStore;
  const { t, i18n } = useTranslation('translation');

  const handleLogout = () => {
    practitionerStore.logout();
    loginStore.logout();
    push("/")
  }

  return (
    <>
      <div className={classes.drawer}>
        <List className={classes.list}>
          <ListItem className={`${practitionerUIStore.tabNumber === 0 && classes.selected}`} button key={"Home"} onClick={() => { push('/home') }}>
            <ListItemIcon><HomeIcon className={classes.test} /></ListItemIcon>
          </ListItem>

          <ListItem button className={practitionerUIStore.tabNumber === 1 ? classes.selected : ""} key={"Patients"} onClick={() => { push('/patients') }}>
            <ListItemIcon><PatientsIcon /></ListItemIcon>
          </ListItem>

          <ListItem button className={practitionerUIStore.tabNumber === 2 ? classes.selected : ""} key={"Messaging"} onClick={practitionerUIStore.goToMessaging}>
            <ListItemIcon>
              <Badge color="primary" badgeContent={messagingStore.numberUnread}>
                <MessagingIcon />
              </Badge>
            </ListItemIcon>
          </ListItem>

          <ListItem button className={practitionerUIStore.tabNumber === 3 ? classes.selected : ""} key={"Settings"} onClick={() => { push('/settings') }}>
            <ListItemIcon><Settings /></ListItemIcon>
          </ListItem>
        </List>
        <div className={classes.bottomButtons}>
          <Tooltip title={t('patient.information.reportIssue')}>
            <IconButton href="https://forms.gle/rRxp9f4bbVT5uB4R9" target="blank" className={classes.settingsIcon}><ReportIssue /></IconButton>
          </Tooltip>
          <Tooltip title={t('patient.profile.logout')}>
            <IconButton onClick={handleLogout} className={classes.settingsIcon}><LogOut /></IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );
});

export default PractitionerDrawer;