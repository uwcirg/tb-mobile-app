import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import OverTopBar from "../Navigation/OverTopBar";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Styles from "../../Basics/Styles";
import { observer } from "mobx-react";
import ExitToApp from "@material-ui/icons/ExitToApp";
import PasswordUpdate from "../../Components/PasswordUpdate";
import PersonalInformation from "./PersonalInformation";
import useLogout from "../../Basics/Logout";
import Debugging from "./Debugging";
import Language from "../../Components/Shared/LanguageQuestion";
import Colors from "../../Basics/Colors";
import { Avatar, Box, Grid } from "@material-ui/core";
import { LanguageOutlined, Lock } from "@material-ui/icons";
import FlatButton from "../../Components/FlatButton";

const SectionLabel = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.sectionLabel} container alignItems="center">
      {children}
    </Grid>
  );
};

const Settings = observer(() => {
  const { patientUIStore } = useStores();
  const { t } = useTranslation("translation");

  return patientUIStore.onPasswordUpdate ? (
    <>
      <OverTopBar
        notFixed
        title={t("settings.updatePassword")}
        handleBack={patientUIStore.closePasswordUpdate}
      ></OverTopBar>
      <Box padding="1em">
        <PasswordUpdate />
      </Box>
    </>
  ) : (
    <MainSettings />
  );
});

const MainSettings = observer(() => {
  const classes = useStyles();
  const { patientStore } = useStores();
  const { t } = useTranslation("translation");
  const logout = useLogout();

  return (
    <div className={classes.fullContainer}>
      <Box height="1em" />
      <div className={classes.header}>
        <Avatar className={classes.avatar}>{patientStore.givenName[0]}</Avatar>
        <Typography variant="body1">
          {patientStore.givenName} {patientStore.familyName}
        </Typography>
      </div>
      <SectionLabel>
        <Lock />
        <Typography variant="h2">
          {t("patient.profile.personalInfo")}
        </Typography>
      </SectionLabel>
      <PersonalInformation />
      <SectionLabel>
        <LanguageOutlined />
        <Typography variant="h2">
          {t("patient.profile.options.language")}
        </Typography>
      </SectionLabel>
      <Language />
      <Box height="1em" />
      <FlatButton onClick={logout} className={classes.logout}>
        <ExitToApp />
        {t("patient.profile.logout")}
      </FlatButton>
      <Debugging />
    </div>
  );
});

const useStyles = makeStyles({
  sectionLabel: {
    display: "flex",
    justifyContent: "flex-start",
    "& > svg": {
      fontSize: "1em",
      marginRight: "5px",
    },
    "& > h2": {
      fontSize: "1em",
    },
    padding: "1em 0",
  },
  avatar: {
    backgroundColor: Colors.approvedGreen,
  },
  fullContainer: {
    width: "100%",
    padding: "0 1em",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  logout: {
    width: "100%",
    fontSize: "1em",
    display: "flex",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    ...Styles.flexColumn,
    alignItems: "center",
    padding: "1em 0",
    backgroundColor: Colors.lightgray,
    borderRadius: "4px",
  },
  name: {
    textAlign: "center",
    fontSize: "1em",
    margin: ".5em 0 .5em 0",
  },
});

export default Settings;
