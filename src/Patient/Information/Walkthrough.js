import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import {
  PlayCircleOutline,
  Home,
  QuestionAnswer,
  EventAvailable,
} from "@material-ui/icons";
import steps from "../Walkthrough/Steps";
import Colors from "../../Basics/Colors";
import { useTranslation } from "react-i18next";
import useStores from "../../Basics/UseStores";

const useStyles = makeStyles({
  button: {
    color: Colors.buttonBlue,
    textTransform: "capitalize",
    "& > span >  svg": {
      marginRight: ".5em",
    },
  },
  help: {
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "& > h2": {
      fontSize: "1em",
    },
    "& > button": {
      marginLeft: "2em",
    },
    "& > button:first-of-type": {
      marginLeft: 0,
    },
  },
});

const TCButton = (props) => {
  const classes = useStyles();
  const { patientUIStore } = useStores();

  return (
    <Button
      className={classes.button}
      onClick={() => {
        patientUIStore.router.push("/" + steps[props.step].push);
        patientUIStore.goToWalkThrough(props.step);
      }}
    >
      {props.children}
    </Button>
  );
};

export default function Walkthough() {
  const { t } = useTranslation("translation");
  const classes = useStyles();

  return (
    <div className={classes.help}>
      <h2>{t("patient.information.walkthrough.title")}</h2>
      <TCButton step={0}>
        <>
          <PlayCircleOutline />
          {t("patient.information.walkthrough.start")}
        </>
      </TCButton>
      <TCButton step={3}>
        <Home />
        {t("patient.information.walkthrough.home")}
      </TCButton>
      <TCButton step={7}>
        <EventAvailable />
        {t("patient.information.walkthrough.calendar")}
      </TCButton>
      <TCButton step={10}>
        <QuestionAnswer />
        {t("patient.information.walkthrough.messaging")}
      </TCButton>
    </div>
  );
}
