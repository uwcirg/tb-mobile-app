import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import OfflineIcon from '@material-ui/icons/WifiOff';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors';

import Settings from '@material-ui/icons/Settings'
import useStores from '../../Basics/UseStores';

const useStyles = makeStyles({
  personIcon: {
    color: Colors.buttonBlue,
    fontSize: "1em"
  },
  menuContainer: {

  },
  appTitle: {
    flexGrow: 1,
    paddingLeft: "5px"
  },
  bar: {
    position: "fixed",
    zIndex: "5",
    boxShadow: "none",
    borderBottom: `1px solid ${Colors.gray}`,
    height: '60px'
  },
  logo: {
    height: "40px",

    borderRadius: "50%"
  }
})

const TopBar = observer(() => {

  const classes = useStyles();
  const { patientUIStore, uiStore } = useStores();

  //Conditional Logic to Display back button during treatment flow
  let buttonToDisplay = (
    <IconButton className={classes.menuContainer} onClick={patientUIStore.goToSettings} edge="start" color="inherit" aria-label="menu">
      {uiStore.offline ? <OfflineIcon style={{ color: "white" }} /> : <Settings className={classes.personIcon} />}
    </IconButton>
  )
  return (
    <AppBar className={classes.bar} color={!uiStore.offline ? "secondary" : "primary"} >
      <Toolbar>
        <img className={classes.logo} src="logo.png" />
        <GetTitle />
        {buttonToDisplay}
      </Toolbar>
    </AppBar>
  )
});


const GetTitle = observer(() => {

  const { t } = useTranslation('translation');
  const { patientUIStore } = useStores();
  const classes = useStyles();

  return (
    <Typography variant="h6" className={classes.appTitle}>
      {Object.values(t('patient.tabNames', { returnObjects: true }))[patientUIStore.tabNumber]}
    </Typography>
  )

})


export default TopBar;
