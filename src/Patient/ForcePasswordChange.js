import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../Basics/UseStores";
import { useTranslation } from "react-i18next";
import PasswordUpdate from "../Components/PasswordUpdate";
import ClickableText from "../Basics/ClickableText";
import Typography from "@material-ui/core/Typography";
import Exit from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  container: {
    width: "100%",
    padding: "2em",
    boxSizing: "border-box",
  },
  form: {
    margin: "auto",
  },
  title: {
    fontSize: "1.25em",
  },
  exitButton: {
    width: "100%",
    justifyContent: "center",
    marginTop: "4em",
    "& > span": {
      marginRight: ".5em",
    },
  },
});

const ForcePasswordChange = () => {
  const classes = useStyles();
  const { t } = useTranslation("translation");
  const { patientStore } = useStores();

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h2">
        {t("forcePasswordUpdate.title")}
      </Typography>
      <div className={classes.form}>
        <PasswordUpdate isForced />
      </div>

      <ClickableText
        onClick={patientStore.exitForcedPasswordChange}
        className={classes.exitButton}
        text={
          <>
            <span>{t("forcePasswordUpdate.exit")}</span>
            <Exit />
          </>
        }
        hideIcon
      />
    </div>
  );
};

export default ForcePasswordChange;
