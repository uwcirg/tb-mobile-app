import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react'
import useStores from '../../../Basics/UseStores';
import symptomList from '../../../Content/symptom-list';
import useToggle from '../../../Hooks/useToggle';
import Colors from '../../../Basics/Colors';
import { makeStyles, Checkbox, Typography, Box, Collapse, Grid, IconButton } from '@material-ui/core';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';

const useStyles = makeStyles({
  label: {
    minWidth: "50%",
    display: "block",
    wordWrap: "break-word"
  }
});

const SymptomsList = () => {

  const { t } = useTranslation('translation');

  return (
    <>
      {symptomList.map((symptom) => {
        const { name, severe } = symptom;
        return (
          <Symptom severe={severe} key={`symptom-${name}`} name={name} subtitle={t(`symptoms.${name}.subtitle`)} title={t(`symptoms.${name}.title`)} />
        )
      })}
    </>
  )
};

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

  const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

  return (
    <Box marginBottom="8px" border={`solid 1px ${Colors.lightgray}`} borderRadius="5px">
      <Box padding="0 4px">
        <Grid alignItems='center' container wrap="nowrap">
          <Checkbox
            data-testid={`checkbox-${props.name}`}
            id={props.name}
            checked={patientStore.report.selectedSymptoms.includes(props.name)}
            value="secondary"
            color="primary"
            inputProps={{ 'aria-label': `${name} checkbox` }}
            onChange={handleSelection}
          />
          <Box width="8px" aria-hidden />
          <label onClick={event => event.preventDefault()}
            onFocus={event => event.preventDefault()} className={classes.label} htmlFor={props.name}>
            {capitalize(props.title)}
          </label>
          <Box flexGrow={1} />
          <Box width="8px" aria-hidden />
          <IconButton style={{ color: Colors.textDarkGray }} onClick={toggleShowSubtitle}>
            {showSubtitle ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
          </IconButton>
        </Grid>
      </Box>
      <Collapse in={showSubtitle}>
        <Box padding="16px" bgcolor={Colors.lighterGray}>
          <Typography style={{ color: Colors.textDarkGray }}>
            {props.subtitle}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  )
});

export default SymptomsList;