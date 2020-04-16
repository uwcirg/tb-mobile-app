import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HomeIcon from '@material-ui/icons/Home'
import ForumIcon from '@material-ui/icons/Forum';
import InfoIcon from '@material-ui/icons/Info';
import { inject, observer } from 'mobx-react';

import EventAvailableIcon from '@material-ui/icons/EventAvailable';

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "60px",
    position: "fixed",
    bottom: 0,
    borderTop: "1px solid lightgray",
  }

});

const BottomBar = inject("uiStore","patientStore")(observer(({ uiStore,patientStore, props }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(uiStore.activeTab);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        uiStore.updateTab(newValue);
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction className="intro-home-button" icon={<HomeIcon />} />
      <BottomNavigationAction className="intro-progress-button" icon={<EventAvailableIcon />} />
      <BottomNavigationAction icon={<ForumIcon />} />
      <BottomNavigationAction icon={<InfoIcon  />} />
    </BottomNavigation>
  );
}));

export default BottomBar;