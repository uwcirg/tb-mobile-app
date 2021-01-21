import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import { observer } from 'mobx-react'
import useStores from '../../Basics/UseStores';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NauseaPopUp from './NauseaPopUp';
import {Symptoms,SevereSymptoms} from '../../Basics/SymptomsSeperation'

/*
Object that maps all symptoms to strings which are used to fetch thier locations
Translations are stored in public/locales/ in their resective lanugates folder

They will be built as strings following this format:

nausea: {
    title: "symptoms.nausea.title",
    subtitle: "symptoms.nausea.subtitle"
}
*/

//Renders whole list of symptoms
const SymptomsList = observer((props) => {

  const {t} = useTranslation('translation');
  const {patientStore} = useStores();

  let list = Symptoms.map((name, index) => {
    return (
      <Symptom key={`symptom-${name}`} name={name} subtitle={t(`symptoms.${name}.subtitle`)} title={t(`symptoms.${name}.title`)} />
    )
  })

  const severeList = SevereSymptoms.map((name, index) => {
    return (
      <Symptom severe key={`symptom-${name}`} name={name} subtitle={t(`symptoms.${name}.subtitle`)} title={t(`symptoms.${name}.title`)} />
    )
  })

  list = list.concat(severeList)

  return (
    <>
      {patientStore.nasueaSelected && <NauseaPopUp />}
      {list}
    </>
  )
});

//Single Symptom in List
const Symptom = observer((props) => {
  const classes = useStyles();
  const { patientStore } = useStores();

  const handleSelection = (e) => {
    if(props.severe && e.target.checked === true){
      patientStore.toggleSymptomWarningVisibility();
    }

    let symptomName = e.target.id
    let index = patientStore.report.selectedSymptoms.indexOf(symptomName);

    

    if (index === -1) {
      patientStore.report.selectedSymptoms.push(symptomName);
    } else {
      //Remove from list
      patientStore.report.selectedSymptoms.splice(index, 1);

      if(symptomName === "nausea"){
        patientStore.report.nauseaRating = ""
      }
    }
  }

  const check = (
    <Checkbox
      id={props.name}
      checked={patientStore.report.selectedSymptoms.includes(props.name)}
      style={{ marginLeft: "auto", marginRight: "1em" }}
      value="secondary"
      color="primary"
      inputProps={{ 'aria-label': `${name} checkbox` }}
      onChange={handleSelection}
    />
  )

  return (
    <ExpansionPanel className={classes.panel}>
      <ExpansionPanelSummary
        className={classes.summary}
        expandIcon={<ExpandMoreIcon />}
        aria-label="expand"
        aria-controls={`additional-${props.title.split()[0]}-content`}
        id={`additional-${props.title.split()[0]}-header`}
      >
        <FormControlLabel
          aria-label="Acknowledge"
          onClick={event => event.stopPropagation()}
          onFocus={event => event.stopPropagation()}
          control={check}
          label={props.title}
        />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography color="textSecondary">
          {props.subtitle}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
});

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  panel: {
    boxShadow: "none",
    border: "none",
    padding: 0,
    margin: 0,
    justifyContent: "flex-start",
    width: "100%",
    zIndex: 0

  },
  summary: {
    "& > div": {
      marginTop: "0",
      marginBottom: "0",
      paddingTop: ".25em",
      paddingBottom: ".25em"
    }
  },
  check: {

  }
});


export default SymptomsList;