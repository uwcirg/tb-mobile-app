import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import InputCard from '../../../Components/Shared/Appointments/AddAppointment/InputCard';

export default function IssueCard({
  title,
  icon,
  children,
  issueCount = null,
  childrenStyles = {},
}) {
  return (
    <Grid item xs={12}>
      <InputCard>
        <Box display="flex" style={{ columnGap: '1em' }}>
          {icon}
          <Typography>
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
