import { Box, styled, Typography } from "@material-ui/core";
import React from "react";
import Colors from "../../Basics/Colors";

const getBackgroundColor = (priority) => {
  if (priority === 2) return Colors.calendarRed;
  if (priority === 1) return Colors.highlightYellow;
  return Colors.calendarGreen;
};

const Container = styled(Box)({
  height: "fit-content",
  backgroundColor: (props) => getBackgroundColor(props.priority),
  borderRadius: "4px",
  padding: "0 5px",
  minWidth: "3 0px",
  textAlign: "center",
});

const AdherenceLabel = ({ patient }) => {
  return (
    <Container priority={patient.priority}>
      <Typography style={{ fontSize: ".85em" }}>
        {Math.floor(patient.adherence * 100)}%
      </Typography>
    </Container>
  );
};

export default AdherenceLabel;
