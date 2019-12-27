import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ForumIcon from '@material-ui/icons/Forum';
import InfoIcon from '@material-ui/icons/Info';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    borderTop: "1px solid lightgray"
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
      <BottomNavigationAction icon={<AddCircleOutlineIcon />} />
      <BottomNavigationAction icon={<ForumIcon />} />
      <BottomNavigationAction icon={<InfoIcon  />} />
    </BottomNavigation>
  );
}));

export default BottomBar;