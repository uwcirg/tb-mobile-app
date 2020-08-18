import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import InteractionCard from '../../Basics/InteractionCard';
import Styles from '../../Basics/Styles';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import TreatmentTimeline from '../../Basics/TreatmentTimeline'
import AddIcon from '@material-ui/icons/Add';
import AddMilestones from './AddMilestone';
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  title:{
      fontSize: "1em",
      textAlign: "left",
      fontWeight: "bold",
      width: "90%",
      margin: ".5em 0 1em 0"
  }
})

const TimelineCard = observer(() => {

    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();

    return(<InteractionCard upperText={""} >
        <Typography className={classes.title} variant="h2">{t("timeline.title")}</Typography>
        <TreatmentTimeline weeksInTreatment={patientStore.patientInformation.weeksInTreatment} />
    </InteractionCard >)

});

export default TimelineCard;