import React from 'react';
import InputCard from '../Appointments/AddAppointment/InputCard';
import { Box, Typography } from '@material-ui/core';
import Colors from '../../../Basics/Colors';

export default function ReportCard({
  title,
  titleIcon,
  color,
  statusIcon,
  statusText,
  children,
}) {
  return (
    <InputCard>
      <Box display="flex" flexDirection="column" style={{ rowGap: '1em' }}>
        <Box display="flex" justifyContent="center" alignContent="center">
          {titleIcon}
          <Typography style={{ fontSize: '1.2em' }}>{title}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ columnGap: '1em' }}
        >
          {React.createElement(statusIcon, {
            style: { color: Colors[color] },
          })}
          <Typography style={{ fontSize: '1.1em' }}>{statusText}</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        {children}
      </Box>
    </InputCard>
  );
}
