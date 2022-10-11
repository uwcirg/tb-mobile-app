import React from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import useStores from "../../Basics/UseStores";
import useToggle from "../../Hooks/useToggle";
import Colors from "../../Basics/Colors";
import {
  makeStyles,
  Checkbox,
  Typography,
  Box,
  Collapse,
  Grid,
  IconButton,
} from "@material-ui/core";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { getSymptoms, localeSymptoms } from "../../Content/symptom-list";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  label: {
    minWidth: "50%",
    display: "block",
    wordWrap: "break-word",
  },
});

const SymptomsList = ({ symptomLocale = "argentina" }) => {
  const { t } = useTranslation("translation");
  const symptomList = getSymptoms(symptomLocale);

  return (
    <div data-testid="all-symptoms-list">
      {symptomList.map((symptom) => {
        const { name, severe } = symptom;
        return (
          <Symptom
            severe={severe}
            key={`symptom-${name}`}
            name={name}
            subtitle={t(`symptoms.${name}.subtitle`)}
            title={t(`symptoms.${name}.title`)}
          />
        );
      })}
    </div>
  );
};

SymptomsList.propTypes = {
  symptomLocale: PropTypes.oneOf(Object.keys(localeSymptoms)),
};

const Symptom = observer((props) => {
  const [showSubtitle, toggleShowSubtitle] = useToggle(false);

  const classes = useStyles();
  const { patientStore } = useStores();

  const handleSelection = (e) => {
    if (props.severe && e.target.checked === true) {
      patientStore.toggleSymptomWarningVisibility();
    }

    let symptomName = e.target.id;
    let index = patientStore.report.selectedSymptoms.indexOf(symptomName);

    if (index === -1) {
      patientStore.report.selectedSymptoms.push(symptomName);
    } else {
      patientStore.report.selectedSymptoms.splice(index, 1);

      if (symptomName === "nausea") {
        patientStore.report.nauseaRating = "";
      }
    }
  };

  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

  return (
    <Box
      marginBottom="8px"
      border={`solid 1px ${Colors.lightgray}`}
      borderRadius="5px"
    >
      <Box padding="0 4px">
        <Grid alignItems="center" container wrap="nowrap">
          <Checkbox
            id={props.name}
            checked={patientStore.report.selectedSymptoms.includes(props.name)}
            value="secondary"
            color="primary"
            inputProps={{
              "aria-label": `${props.name} checkbox`,
              "data-testid": `checkbox-${props.name}`,
            }}
            onChange={handleSelection}
          />
          <Box width="8px" aria-hidden />
          <label
            onClick={(event) => event.preventDefault()}
            onFocus={(event) => event.preventDefault()}
            className={classes.label}
            htmlFor={props.name}
          >
            {capitalize(props.title)}
          </label>
          <Box flexGrow={1} />
          <Box width="8px" aria-hidden />
          <IconButton
            data-testid={`dropdown-${props.name}`}
            style={{ color: Colors.textDarkGray }}
            onClick={toggleShowSubtitle}
          >
            {showSubtitle ? (
              <KeyboardArrowUpRounded />
            ) : (
              <KeyboardArrowDownRounded />
            )}
          </IconButton>
        </Grid>
      </Box>
      <Collapse in={showSubtitle}>
        <Box padding="16px" bgcolor={Colors.lighterGray}>
          <Typography
            data-testid={`subtitle-${props.name}`}
            style={{ color: Colors.textDarkGray }}
          >
            {props.subtitle}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
});

export default SymptomsList;
