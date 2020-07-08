import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors';

import Settings from '../../Basics/Icons/Settings'
import useStores from '../../Basics/UseStores';

const useStyles = makeStyles({
  personIcon: {
    color: Colors.buttonBlue,
    fontSize: "1.5em"
  },
  menuContainer: {

  },
  appTitle: {
    marginRight: "auto"
  },
  bar: {
    position: "fixed",
    zIndex: "5",
    boxShadow: "none",
    borderBottom: `1px solid ${Colors.gray}`,
    height: '60px'
  }
})

const TopBar = observer(() => {

  const classes = useStyles();
  const {patientUIStore, patientStore,uiStore} = useStores();
  const { t, i18n } = useTranslation('translation');

  //Conditional Logic to Display back button during treatment flow
  let buttonToDisplay = (
    patientStore.isLoggedIn && <IconButton className={classes.menuContainer} onClick={patientUIStore.goToSettings} edge="start" color="inherit" aria-label="menu"> <Settings className={classes.personIcon} /></IconButton>
  )
  return (
    <AppBar className={classes.bar} color={!uiStore.offline ? "secondary" : "primary"} >
      <Toolbar>
        <Typography variant="h6" className={classes.appTitle}> {t("title")}</Typography>
        {buttonToDisplay}
        <Typography variant="h6" color={!uiStore.offline ? "secondary" : "primary"} style={{ color: "flex-end" }} >
          {uiStore.offline ? <OfflineBoltIcon style={{ color: "white" }} /> : ""}
        </Typography>
      </Toolbar>
    </AppBar>
  )
});


export default TopBar;
