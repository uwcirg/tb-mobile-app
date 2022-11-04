import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Colors from "../../../Basics/Colors";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { useTranslation } from "react-i18next";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CompletionButton from "./CompletionButton";
import useStyles from "./styles";

const ProgressLinks = () => {
  const classes = useStyles();
  const { t } = useTranslation("translation");

  return (
    <div className={classes.progressLinks}>
      <CompletionButton
        to="/progress"
        icon={<DateRangeIcon />}
        text={t("patient.progress.calendar")}
      />
      <Box height=".5em" />
      <CompletionButton
        to="/progress/photos"
        icon={<PhotoLibraryIcon />}
        text={t("redoPhoto.viewMyPhotos")}
      />
    </div>
  );
};

export default ProgressLinks;
