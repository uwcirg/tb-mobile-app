import React from 'react';
import { Box } from '@material-ui/core';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import AppointmentList from '../../Components/Shared/Appointments/List';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Appointments = observer(() => {
  const id = useStores().patientStore.userID;
  const { t } = useTranslation('translation');

  return (
    <Box padding="1rem">
      <Link to={'/add-appointment'}>{t('appointments.addAppointment')}</Link>
      {id && <AppointmentList patientId={id} />}
    </Box>
  );
});

export default Appointments;
