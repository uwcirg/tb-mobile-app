import React from 'react';
import { Box } from '@material-ui/core';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import AppointmentList from '../../Components/Shared/Appointments/List';
import { useTranslation } from 'react-i18next';
import FlatButton from '../../Components/FlatButton';
import { Add } from '@material-ui/icons';

const Appointments = observer(() => {
  const id = useStores().patientStore.userID;
  const { t } = useTranslation('translation');

  return (
    <Box padding="1rem">
      <Box display="flex" justifyContent="space-between">
        <Box></Box>
        <FlatButton to="/add-appointment">
          <Add />
          {t('appointments.addAppointment')}
        </FlatButton>
      </Box>
      {id && <AppointmentList patientId={id} />}
    </Box>
  );
});

export default Appointments;
