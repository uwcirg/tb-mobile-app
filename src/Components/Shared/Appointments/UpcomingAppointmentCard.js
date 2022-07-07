import React, { useEffect, useState } from 'react';
import ReminderLineItem from '../../../Patient/Home/Reminder/ReminderLineItem';
import useStores from '../../../Basics/UseStores';
import InteractionCard from '../../../Basics/HomePageSection';
import EventIcon from '@material-ui/icons/Event';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import NewButton from '../../../Basics/NewButton';
import ClickableText from '../../../Basics/ClickableText';
import Colors from '../../../Basics/Colors';
import { observer } from 'mobx-react';
import useAsync from '../../../Hooks/useAsync';
import SharedAPI from '../../../API/SharedAPI';

export const UpcomingAppointment = observer(() => {
  const [toggle, setToggle] = useState(false);
  const appointments = useStores().reminderStore.reminders;
  const { translations } = useRelevantTranslations();

  // const { patientStore } = useStores();
  // // placeholder until I can get ID from non mobx state
  // const patientId = patientStore.userID;

  // const { execute, status, value, error, reset } = useAsync({
  //   asyncFunc: SharedAPI.getAppointment,
  //   immediate: false,
  //   funcParams: [patientId],
  // });

  // We will need to listen to the deletion of an appointment from the server
  // Unless we want to pass down state to the delete button from here

  return (
    <Box width="100%">
      <InteractionCard
        upperText={
          <>
            <EventIcon />
            {translations.appointments}
          </>
        }
      >
        <AppointmentList
          toggle={toggle}
          appointments={appointments}
          header={translations.header}
        />
        {appointments.length > 1 && (
          <ToggleAppointments
            showAll={translations.showAll}
            showLess={translations.showLess}
            toggle={toggle}
            onClick={() => setToggle(!toggle)}
          />
        )}

        <NewButton
          to="/add-appointment"
          icon={<EventIcon />}
          text={translations.addAppointment}
        />
      </InteractionCard>
    </Box>
  );
});

const AppointmentList = ({ toggle, appointments, header }) => {
  console.log(appointments[0]);
  return (
    <>
      <Box width="100%">
        <Box
          color={Colors.buttonBlue}
          width="90%"
          margin="0 1rem"
          borderBottom={`solid 2px ${Colors.lightgray}`}
          marginBottom="1rem"
        >
          <h3>
            <strong style={{ color: Colors.approvedGreen }}>
              {appointments.length}
            </strong>{' '}
            {header}
          </h3>
        </Box>
        {appointments &&
          appointments.length > 0 &&
          toggle === true &&
          appointments.map((a) => {
            return (
              <ReminderLineItem key={`reminder-${a.datetime}`} reminder={a} />
            );
          })}
        {appointments && appointments.length > 0 && toggle === false && (
          <ReminderLineItem
            key={`reminder-${appointments[0].datetime}`}
            reminder={appointments[0]}
          />
        )}
      </Box>
    </>
  );
};

const ToggleAppointments = ({ onClick, showAll, showLess, toggle }) => {
  return (
    <Box
      padding="1rem"
      marginRight="1rem"
      width="100%"
      display="flex"
      justifyContent="space-between"
    >
      <div></div>
      <ClickableText
        text={toggle === false ? showAll : showLess}
        icon={toggle === false ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
        onClick={onClick}
      />
    </Box>
  );
};

const useRelevantTranslations = () => {
  const { t } = useTranslation('translation');

  const translations = {
    header: `${t(`patient.progress.upcoming`)} ${t(
      `patient.reminders.appointments`
    )}`,
    noScheduledApp: `${t('appointments.noUpcoming')}`,
    appointments: `${t('patient.reminders.appointments')}`,
    showAll: `${t('appointments.showAll')} ${t(
      'patient.reminders.appointments'
    )}`,
    showLess: `${t('appointments.showLess')}`,
    addAppointment: `${t('appointments.addAppointment')}`,
  };
  return { translations };
};
