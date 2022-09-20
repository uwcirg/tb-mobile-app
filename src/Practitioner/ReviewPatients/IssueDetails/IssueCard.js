import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import InputCard from '../../../Components/Shared/Appointments/AddAppointment/InputCard';

export default function IssueCard({
  title,
  icon,
  children,
  issueCount,
  childrenStyles,
}) {
  return (
    <Grid item xs={12}>
      <InputCard>
        <Box display="flex" style={{ columnGap: '1em' }}>
          {icon}
          <Typography>
            {title} {issueCount}
          </Typography>
        </Box>
        <Box style={childrenStyles}>{children}</Box>
      </InputCard>
    </Grid>
  );
}
