import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react'
import useStores from '../../Basics/UseStores';
import NauseaPopUp from './NauseaPopUp';
import symptomList from '../../Content/symptom-list';
import useToggle from '../../Hooks/useToggle';
import Colors from '../../Basics/Colors';
import { makeStyles, Checkbox, Typography, Box, Collapse, Grid, IconButton } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

const useStyles = makeStyles({
  label: {
    minWidth: "50%",
    display: "block",
    wordWrap: "break-word",
  }
});

const SymptomsList = observer(() => {

  const { t } = useTranslation('translation');
  const { patientStore } = useStores();

  const _symptoms = symptomList;

  let list = _symptoms.mild.map((name, index) => {
    return (
      <Symptom key={`symptom-${name}`} name={name} subtitle={t(`symptoms.${name}.subtitle`)} title={t(`symptoms.${name}.title`)} />
    )
  })

  const severeList = _symptoms.severe.map((name, index) => {
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

const Symptom = observer((props) => {

  const [showSubtitle, toggleShowSubtitle] = useToggle(false);

  const classes = useStyles();
  const { patientStore } = useStores();

  const handleSelection = (e) => {
    if (props.severe && e.target.checked === true) {
      patientStore.toggleSymptomWarningVisibility();
    }

    let symptomName = e.target.id
    let index = patientStore.report.selectedSymptoms.indexOf(symptomName);

    if (index === -1) {
      patientStore.report.selectedSymptoms.push(symptomName);
    } else {
      patientStore.report.selectedSymptoms.splice(index, 1);

      if (symptomName === "nausea") {
        patientStore.report.nauseaRating = ""
      }
    }
  }

  return (
    <Box marginBottom="8px" border={`solid 1px ${Colors.lightgray}`} borderRadius="5px">
      <Box padding="0 4px">
        <Grid alignItems='center' container wrap="nowrap">
          <Checkbox
            id={props.name}
            checked={patientStore.report.selectedSymptoms.includes(props.name)}
            value="secondary"
            color="primary"
            inputProps={{ 'aria-label': `${name} checkbox` }}
            onChange={handleSelection}
          />
          <Box width="8px" aria-hidden />
          <label onClick={event => event.preventDefault()}
            onFocus={event => event.preventDefault()} className={classes.label} for={props.name}>
            {props.title}
          </label>
          <Box flexGrow={1} />
          <Box width="8px" aria-hidden />
          <IconButton onClick={toggleShowSubtitle}>
            {showSubtitle ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Grid>
      </Box>
      <Collapse in={showSubtitle}>
        <Box padding="16px" bgcolor={Colors.lightgray}>
          <Typography style={{ color: Colors.textDarkGray }}>
            {props.subtitle}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  )
});

export default SymptomsList;