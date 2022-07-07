import React, { useState } from 'react';
import ReminderLineItem from '../../../../Patient/Home/Reminder/ReminderLineItem';
import InteractionCard from '../../../../Basics/HomePageSection';
import EventIcon from '@material-ui/icons/Event';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import NewButton from '../../../../Basics/NewButton';
import ClickableText from '../../../../Basics/ClickableText';
import Colors from '../../../../Basics/Colors';
import SharedAPI from '../../../../API/SharedAPI';
import useAsyncWithParams from '../../../../Hooks/useAsyncWithParams';
import useToggle from '../../../../Hooks/useToggle';

export default function ViewAppointments({ patientId = 3 }) {
  const { translations } = useRelevantTranslations();

  const {
    execute,
    status,
    value: appointments,
    error,
    reset,
  } = useAsyncWithParams({
    asyncFunc: SharedAPI.getAppointments,
    immediate: true,
    funcParams: [patientId],
    initialData: [],
  });

  return (
      <InteractionCard
        upperText={
          <>
            <EventIcon />
            {translations.appointments}
          </>
        }
      >
        <AppointmentList
          appointments={appointments}
          header={translations.header}
        />

        <NewButton
          to="/add-appointment"
          icon={<EventIcon />}
          text={translations.addAppointment}
        />
      </InteractionCard>
  );
};

const AppointmentList = ({ appointments, header }) => {
  const [fullListVisible, toggleFullListVisible] = useToggle(false);

  return (
    <Box width="100%">
      <Box
        color={Colors.buttonBlue}
        width="90%"
        margin="0 1rem"
        borderBottom={`solid 2px ${Colors.lightgray}`}
        marginBottom="1rem"
      >
        <h3>
          <span style={{ color: Colors.approvedGreen }}>
            {appointments.length}
          </span>
          {' ' + header}
        </h3>
      </Box>

      {appointments &&
        appointments.slice(0, fullListVisible ? -1 : 1)
          .map(each => <ReminderLineItem key={`reminder-${each.datetime}`} reminder={each} />)}

      {appointments?.length > 1 && (
        <ToggleAppointments
          fullListVisible={fullListVisible}
          onClick={toggleFullListVisible}
        />
      )}
    </Box>

  );
};

const ToggleAppointments = ({ onClick, fullListVisible }) => {

  const { t } = useTranslation('translation');

  return (
    <Box
      padding="1rem"
      marginRight="1rem"
      width="100%"
      display="flex"
      justifyContent="space-between"
    >
      <ClickableText
        text={fullListVisible === false ? t('appointments.showAll') : t('appointments.showLess')}
        icon={fullListVisible === false ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
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
