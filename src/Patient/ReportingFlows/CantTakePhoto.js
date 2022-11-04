import React from "react";
import useStores from "../../Basics/UseStores";
import useStyles from "../Home/OneStepActions/styles";
import { useTranslation } from "react-i18next";
import { Box, TextField } from "@material-ui/core";
import ClickableText from "../../Basics/ClickableText";
import { KeyboardArrowLeft } from "@material-ui/icons";

const CantTakePhoto = () => {
  const { patientStore } = useStores();
  const classes = useStyles();
  const { t } = useTranslation("translation");

  return (
    <>
      <Box display={"flex"} flexWrap="wrap" style={{ rowGap: "1rem" }}>
        <TextField
          fullWidth
          rows={3}
          label={t("patient.report.photo.whyUnable")}
          multiline
          value={patientStore.report.whyPhotoWasSkipped}
          onChange={(e) => {
            patientStore.report.whyPhotoWasSkipped = e.target.value;
          }}
          className={classes.textArea}
          variant="outlined"
        />
        <ClickableText
          icon={<KeyboardArrowLeft />}
          onClick={() => {
            patientStore.report.photoWasSkipped = false;
          }}
          text={t("patient.report.photo.back")}
        />
      </Box>
    </>
  );
};

export default CantTakePhoto;
