import { Box, styled, Typography } from "@material-ui/core";
import React from "react";
import Colors from "../../Basics/Colors";
import { useTranslation } from "react-i18next";

const Container = styled(Box)({
  height: "fit-content",
  backgroundColor: Colors.lightgray,
  color: Colors.textDarkGray,
  borderRadius: "4px",
  padding: "0 5px",
  minWidth: "3 0px",
  textAlign: "center",
  "& p": { fontSize: ".85em" },
});

const TreatmentWeek = ({ patient }) => {
  const { t } = useTranslation("translation");
  return (
    <Container>
      <Typography>{t('time.week')} {patient.weeksInTreatment}</Typography>
    </Container>
  );
};

export default TreatmentWeek;
