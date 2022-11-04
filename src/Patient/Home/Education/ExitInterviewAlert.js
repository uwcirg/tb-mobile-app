import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import NewButton from "../../../Basics/NewButton";
import Home from "@material-ui/icons/Home";
import useStores from "../../../Basics/UseStores";

const useStyles = makeStyles({
  container: {
    padding: ".5em",
    "& img": {
      width: "90%",
      margin: "auto",
      marginBottom: ".5em",
    },
    "& p": {
      marginBottom: "1em",
    },
  },
  body: {
    textAlign: "left",
  },
});

const ExitInterviewAlert = () => {
  const { t } = useTranslation("translation");
  const classes = useStyles();

  const { patientStore } = useStores();
  const { educationStore: education } = patientStore;

  const handleRate = () => {
    education.setExited(true);
    education.markEducationAsRead();
  };

  return (
    <div className={classes.container}>
      <Typography variant="h1" color="initial">
        {t("exitInterviewAlert.title")}
      </Typography>
      <img src="img/feedback.png"></img>
      <div className={classes.body}>
        <Typography variant="body1">{t("exitInterviewAlert.intro")}</Typography>
        <Typography variant="body1">{t("exitInterviewAlert.ask")}</Typography>
        <Typography variant="body1">
          {t("exitInterviewAlert.survey")}
        </Typography>
      </div>
      <Typography>{t("exitInterviewAlert.thanks")} 🙂</Typography>
      <NewButton
        icon={<Home />}
        text={t("patient.home.progress.close")}
        onClick={handleRate}
      />
    </div>
  );
};

export default ExitInterviewAlert;
