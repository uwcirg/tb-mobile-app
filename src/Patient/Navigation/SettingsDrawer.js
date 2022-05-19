import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { observer } from 'mobx-react';
import Settings from '../Settings';
import useStores from '../../Basics/UseStores';
import isIndonesiaPilot from '../../Utility/check-indonesia-flag';
import IndonesiaSettingsPage from '../../Indonesia/Settings';

const SettingsDrawer = observer(() => {

  const classes = useStyles();
  const { patientUIStore } = useStores();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={patientUIStore.onSettings}
    >
      <div className={classes.contentContainer}>
        {isIndonesiaPilot ? <IndonesiaSettingsPage /> : <Settings />}
      </div>
    </Drawer>
  );
});

const drawerWidth = "100%";

const useStyles = makeStyles(theme => ({
  contentContainer: {
    height: "100vh",
    width: "100vw",
    boxSizing: "border-box"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  }
}));

export default SettingsDrawer;