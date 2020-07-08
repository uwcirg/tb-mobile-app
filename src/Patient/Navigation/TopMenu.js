import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { inject, observer } from 'mobx-react';
import HealthProfile from '../Settings';
import { useTranslation } from 'react-i18next';
import Styles from '../../Basics/Styles';

const TopMenu = inject("uiStore", "patientStore")(observer(({ uiStore, patientStore, props }) => {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { t, i18n } = useTranslation('translation');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    uiStore.toggleMenu();
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="top"
      open={uiStore.menuOpened}
    >
      <div className={classes.contentContainer}>
        <HealthProfile />
      </div>
    </Drawer>
  );
}));

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
    minHeight: "100vh",
    marginTop: "60px",
    ...Styles.flexColumn,
    alignItems: "center"
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