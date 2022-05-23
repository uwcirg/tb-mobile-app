import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react'
import { Box, Grid } from '@material-ui/core';
import { toJS } from 'mobx';

import motivationalMessages from '../../Content/motivational-messages';

const useStyles = makeStyles({
  container: {

  },
  greeting: {
    fontWeight: "medium",
    fontSize: "1.25em"
  },
  date: {
    marginLeft: "auto",
    textTransform: "uppercase",
    color: Colors.textGray,
    fontSize: ".75em"
  }
})

const Greeting = observer(() => {

  const { t } = useTranslation('translation');

  const classes = useStyles();
  const { patientStore } = useStores();

  const isIndonesia = process.env.REACT_APP_IS_INDONESIA === 'true';

  return (<Box width="100%" padding="1em" style={{ boxSizing: "border-box" }} id="intro-greeting">
    <Grid container>
      <div className={classes.greeting}>{t("greeting")} {patientStore.givenName} 👋 </div>
      <Box flexGrow={1} />
      <div className={classes.date}>{DateTime.fromISO(patientStore.reportStore.todaysDate).toLocaleString(DateTime.DATE_FULL)}</div>
    </Grid>
    {isIndonesia && <MotivationalMessage treatmentDay={patientStore.patientInformation.daysInTreatment} />}
  </Box>)

})

const MotivationalMessage = ({ treatmentDay }) => {

  const messages = motivationalMessages.indonesia;
  const todaysMessage = messages[treatmentDay.toString()];

  if(!todaysMessage) return "";

  return (<p data-testid='motivational-message' >{todaysMessage || treatmentDay}</p>)

}

export default Greeting;