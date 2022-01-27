import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { inject, observer } from 'mobx-react';
import Settings from '../Settings';
import Styles from '../../Basics/Styles';
import useStores from '../../Basics/UseStores';

const TopMenu = observer(() => {

  const classes = useStyles();
  const {patientUIStore} = useStores();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="top"
      open={patientUIStore.onSettings}
    >
      <div className={classes.contentContainer}>
        <Settings />
      </div>
    </Drawer>
  );
});

const drawerWidth = "100%";

const useStyles = makeStyles(theme => ({
  icon: {
    justifySelf: "flex-end"
  },
  header: {
    fontSize: "1.5em",
    marginRight: "auto",
    marginLeft: "1em"
  },
  contentContainer: {
    height: "100vh",
    ...Styles.flexColumn,
    alignItems: "center",
    boxSizing: "border-box"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'center',
  },
  logout:{
    marginTop: "2em"
  }
}));

export default TopMenu;