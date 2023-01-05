import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import OfflineIcon from "@material-ui/icons/WifiOff";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import Colors from "../../Basics/Colors";

import Settings from "@material-ui/icons/Settings";
import useStores from "../../Basics/UseStores";
import { Link } from "react-router-dom";
import isIndonesiaPilot from "../../Utility/check-indonesia-flag";

const useStyles = makeStyles({
  personIcon: {
    color: Colors.buttonBlue,
    fontSize: "1em",
  },
  menuContainer: {},
  appTitle: {
    flexGrow: 1,
    paddingLeft: "7px",
    display: "flex",
    flexDirection: "column",
  },
  bar: {
    position: "fixed",
    zIndex: "5",
    boxShadow: "none",
    borderBottom: `1px solid ${Colors.gray}`,
    height: "60px",
  },
  logo: {
    height: "40px",
    objectFit: "contain",
  },
  offlineAlert: {
    "& > svg": {
      color: "white",
      margin: 0,
      padding: 0,
      fontSize: "1em",
      marginLeft: ".5em",
    },
    padding: 0,
    margin: 0,
    display: "flex",
    alignItems: "center",
  },
});

const Logo = observer(() => {
  const { uiStore } = useStores();
  const classes = useStyles();

  const basePath = `${window?._env?.URL_CLIENT || ""}/${(
    window?._env?.MANIFEST_ICONS_FOLDER || "/logo/ar"
  ).substring(1)}/`;

  const offline = basePath + "white.png";
  const online = basePath + "main-logo.png";

  return (
    <>
      <img src={offline} aria-hidden style={{ display: "none" }} />
      <img src={online} aria-hidden style={{ display: "none" }} />
      <img className={classes.logo} src={uiStore.offline ? offline : online} />
    </>
  );
});

const TopBar = observer(() => {
  const classes = useStyles();
  const { uiStore } = useStores();

  return (
    <AppBar
      className={classes.bar}
      color={!uiStore.offline ? "secondary" : "primary"}
    >
      <Toolbar>
        <Logo />
        <GetTitle />
        <IconButton
          component={Link}
          className={classes.menuContainer}
          to="/information/settings"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Settings
            style={{ color: uiStore.offline ? "white" : Colors.buttonBlue }}
            className={classes.personIcon}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
});

const GetTitle = observer(() => {
  const { t } = useTranslation("translation");
  const { patientUIStore, uiStore } = useStores();
  const classes = useStyles();

  return (
    <div className={classes.appTitle}>
      <Typography variant="h1">
        {patientUIStore.tabNumber === 0
          ? t("title")
          : Object.values(t("patient.tabNames", { returnObjects: true }))[
              patientUIStore.tabNumber
            ]}
      </Typography>
      {uiStore.offline && (
        <>
          <p className={classes.offlineAlert}>
            {" "}
            {t("offline")}
            <OfflineIcon />
          </p>
        </>
      )}
    </div>
  );
});

export default TopBar;
