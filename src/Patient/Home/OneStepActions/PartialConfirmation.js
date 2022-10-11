import React from "react";
import {
  makeStyles,
  Box,
  ButtonBase,
  Collapse,
  Typography,
  Grid,
} from "@material-ui/core";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";

import useStores from "../../../Basics/UseStores";
import Colors from "../../../Basics/Colors";
import useToggle from "../../../Hooks/useToggle";
import Review from "./ReviewSubmission";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  container: {
    width: "100%",
    padding: ".5em",
  },
  text: {
    lineHeight: "1.25em",
    fontSize: ".9em",
  },
  editButton: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1em",
    color: Colors.buttonBlue,
  },
  editIcon: {
    fontSize: "1.5em",
  },
  editText: {
    fontSize: ".75em",
  },
});

const PartialConfirmation = ({ isPhoto = false }) => {
  const classes = useStyles();
  const [showPreview, toggleShowPreview] = useToggle(false);
  const { t } = useTranslation("translation");
  const { patientStore, patientUIStore } = useStores();

  const handlePhotoClick = () => {
    if (patientStore.isPhotoDay) {
      if (!patientStore.report.hasSubmitted) {
        patientUIStore.setSkippedToPhoto(true);
      }
      patientUIStore.openPhotoReport();
    }
  };

  const handleClick = () => {
    if (isPhoto) {
      handlePhotoClick();
    } else {
      toggleShowPreview();
    }
  };

  return (
    <div>
      <Grid
        wrap="nowrap"
        className={classes.container}
        container
        alignItems="center"
      >
        <CheckCircleIcon fontSize="large" style={{ color: Colors.green }} />
        <Box width="2em" />
        <Typography className={classes.text} variant="body1">
          {isPhoto
            ? t("patient.reportConfirmation.photoComplete")
            : t("patient.reportConfirmation.baseComplete")}
        </Typography>
        <ButtonBase onClick={handleClick} className={classes.editButton}>
          {isPhoto ? (
            <PhotoButtonContent />
          ) : (
            <ReportButtonContent
              showPreview={showPreview}
              toggleShowPreview={toggleShowPreview}
            />
          )}
        </ButtonBase>
      </Grid>
      <Collapse in={showPreview}>
        <Review />
      </Collapse>
    </div>
  );
};

const PhotoButtonContent = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <EditIcon />
      <Typography className={classes.editText} variant="body1">
        {t("commonWords.edit")}
      </Typography>
    </>
  );
};

const ReportButtonContent = ({ showPreview }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      {showPreview ? (
        <KeyboardArrowUp className={classes.editIcon} />
      ) : (
        <KeyboardArrowDown className={classes.editIcon} />
      )}
      <Typography className={classes.editText} variant="body1">
        {showPreview
          ? t("patient.reportConfirmation.hide")
          : t("patient.reportConfirmation.view")}
      </Typography>
    </>
  );
};

export default PartialConfirmation;
