import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PopOver from "../../Shared/PopOver";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import CopyableText from "../../../Utility/Copiable";
import Button from "@material-ui/core/Button";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles({
  bottomButton: {
    marginLeft: "auto",
    display: "flex",
  },
  surveyArea: {
    marginTop: "1em",
  },
  copyOverride: {
    margin: "1em 0",
  },
  body: {
    "& > h1": {
      fontWeight: "500",
      textTransform: "capitalize",
      margin: ".5em 0",
      "&:first-of-type": {
        marginTop: 0,
      },
    },
  },
});

const ArchiveWarningDialog = ({ handleClose }) => {
  const { t } = useTranslation("translation");
  const classes = useStyles();
  // make sure to set this in the .env file
  const link =
    window._env.REDCAP_EOT_SURVEY_LINK || "https://redcap.link/krdumr8b";

  return (
    <PopOver close={handleClose} ignoreClickAway>
      <div className={classes.body}>
        <Typography variant="h1">{t("archive.warningTitle")}</Typography>
        <Typography>{t("archive.warningLong")}</Typography>
        <Typography variant="h1">{t("archive.endSurvey")}</Typography>
        <Typography variant="body1" color="initial">
          {t("archive.surveyText")}
        </Typography>
        <CopyableText className={classes.copyOverride} text={link} />
        <Button className={classes.bottomButton} onClick={handleClose}>
          {t("archive.continue")}
          <KeyboardArrowRight />
        </Button>
      </div>
    </PopOver>
  );
};

export default ArchiveWarningDialog;
