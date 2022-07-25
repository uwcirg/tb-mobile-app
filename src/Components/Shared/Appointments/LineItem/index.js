import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import Options from './Menu';
import { Box, Grid, makeStyles } from '@material-ui/core';
import Styles from '../../../../Basics/Styles';
import Colors from '../../../../Basics/Colors';
import Tag from '../../../Tag';

import useAsyncWithParams from '../../../../Hooks/useAsyncWithParams';
import SharedAPI from '../../../../API/SharedAPI';
import ShortDate from '../../ShortDate';

const LineItem = ({ reminder, showMenu, isNextAppointment, handleRefresh }) => {
  const date = DateTime.fromISO(reminder.datetime);
  const { t } = useTranslation('translation');

  const {
    execute: handleDelete,
    status,
    reset,
  } = useAsyncWithParams({
    asyncFunc: SharedAPI.deleteAppointment,
    immediate: false,
    funcParams: [reminder.id],
    initialData: [],
  });

  useEffect(() => {
    if (status === 'success') {
      handleRefresh();
      reset();
    }
  }, [status]);

  return (
    <Box padding="8px">
      <Grid container wrap="nowrap" alignItems="flex-start">
        <Box paddingRight=".5rem">
          <ShortDate date={date} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          flex="1 1 0"
          paddingLeft=".5rem"
          borderLeft={`solid 2px ${Colors.lightgray}`}
        >
          <Grid alignItems="center" container>
            <span style={{ fontWeight: '450' }} className="title">
              {(reminder.title !== '' && (
                <>
                  {reminder.title?.length > 15
                    ? reminder.title?.slice(0, 15) + '...'
                    : reminder.title}{' '}
                  {'@ '}
                  {date.toLocaleString(DateTime.TIME_SIMPLE)}
                </>
              )) ||
                (reminder.category && (
                  <>
                    {t(`appointments.types.${reminder.category}`)} {'@ '}
                    {date.toLocaleString(DateTime.TIME_SIMPLE)}
                  </>
                ))}
            </span>
            <Box flex="1" />
            <Box width=".5rem" />
            {showMenu && (
              <Options
                handleDelete={handleDelete}
                disabled={!showMenu}
                reminderID={reminder.id}
              />
            )}
          </Grid>
          {isNextAppointment && (
            <Box paddingTop=".25rem">
              <Tag backgroundColor={Colors.calendarGreen}>
                {t('appointments.nextAppointment')}
              </Tag>
            </Box>
          )}
          <span style={{ fontSize: '.85rem', paddingTop: '.25rem' }}>
            {reminder.note}
          </span>
        </Box>
      </Grid>
    </Box>
  );
};

export default LineItem;
