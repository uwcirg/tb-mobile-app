import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import InputCard from "../../../Components/Shared/Appointments/AddAppointment/InputCard";

export default function IssueCard({
  title,
  icon,
  children,
  issueCount = null,
  colors = "inherit",
  childrenStyles = {},
  typeColor = colors,
}) {
  return (
    <Grid item xs={12}>
      <InputCard colors={colors}>
        <Box display="flex" style={{ columnGap: "1em" }}>
          {icon}
          <Typography style={{ fontWeight: 600, color: typeColor }}>
            {title} {issueCount && `: ${issueCount}`}
          </Typography>
        </Box>
        <Box style={childrenStyles} paddingTop="1em">
          {children}
        </Box>
      </InputCard>
    </Grid>
  );
}
