import React from 'react';
import ReminderLineItem from '../../../Patient/Home/Reminder/ReminderLineItem';
import { useTranslation } from 'react-i18next';

import useAsyncWithParams from '../../../Hooks/useAsyncWithParams';
import PropTypes from 'prop-types';
import SharedAPI from '../../../API/SharedAPI';
import { Collapse, Typography, Grid } from '@material-ui/core';
import ExpansionToggle from '../../ExpansionToggle';
import useToggle from '../../../Hooks/useToggle';
import groupAppointments from '../../../Utility/group-appointments';

export default function AppointmentList({ patientId }) {
  const { t } = useTranslation('translation');

  const { value: appointments } = useAsyncWithParams({
    asyncFunc: SharedAPI.getAppointments,
    immediate: true,
    funcParams: [patientId],
    initialData: [],
  });

  const grouped = groupAppointments(appointments);
  return (
    <>
      {Object.keys(grouped).length > 0 &&
        Object.keys(grouped).map((each) => (
          <Group key={`group-${each}`} title={each} items={grouped[each]} />
        ))}
    </>
  );
}

const Group = ({ items, title }) => {
  const [expanded, toggle] = useToggle(true);
  return (
    <>
      <Grid onClick={toggle} container wrap="nowrap">
        <Typography style={{ fontSize: '1.2rem' }} variant="h2">
          {title} {items.length}
        </Typography>
        <ExpansionToggle expanded={expanded} />
      </Grid>
      <Collapse in={expanded}>
        <Items items={items} />
      </Collapse>
    </>
  );
};

const Items = ({ items }) => {
  return (
    <>
      {items.map((each) => (
        <ReminderLineItem key={`reminder-${each.id}`} reminder={each} />
      ))}
    </>
  );
};

AppointmentList.propTypes = {
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
