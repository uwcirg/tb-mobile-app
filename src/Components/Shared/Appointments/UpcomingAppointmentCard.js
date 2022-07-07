import React from 'react';
import { useState } from 'react';
import ReminderLineItem from '../../../Patient/Home/Reminder/ReminderLineItem';
import useStores from '../../../Basics/UseStores';
import InteractionCard from '../../../Basics/HomePageSection';
import EventIcon from '@material-ui/icons/Event';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import NewButton from '../../../Basics/NewButton';
import ClickableText from '../../../Basics/ClickableText';

export const UpcomingAppointment = () => {
  const [toggle, setToggle] = useState(false);
  const { t } = useTranslation('translation');
  console.log(toggle);

  return (
    <Box width="100%">
      <InteractionCard
        upperText={
          <>
            <EventIcon />
            {t('patient.reminders.appointments').split(' ')[0]}
          </>
        }
      >
        <AppointmentList toggle={toggle} />
        {/* move ToggleAppointments component into appt List ? unless we get infor elsewhere */}
        <ToggleAppointments
          showAll={`${t('appointments.showAll')} ${t(
            'patient.reminders.appointments'
          )}`}
          showLess={`${t('appointments.showLess')}`}
          toggle={toggle}
          onClick={() => setToggle(!toggle)}
        />
        <NewButton
          to="/add-appointment"
          icon={<EventIcon />}
          text={t('appointments.addAppointment')}
        />
      </InteractionCard>
    </Box>
  );
};

const AppointmentList = ({ toggle }) => {
  // fetch appointment information from here
  const appointments = useStores().reminderStore.reminders;

  return (
    <>
      <Box width="100%">
        <h3>{appointments.length} Upcoming Appointments!</h3>
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
        icon={<KeyboardArrowDown />}
        onClick={onClick}
      />
    </Box>
  );
};
