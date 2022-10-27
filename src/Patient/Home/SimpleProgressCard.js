import React, { useState } from "react";
import { observer } from "mobx-react";
import useStores from "../../Basics/UseStores";
import { makeStyles } from "@material-ui/core/styles";
import Styles from "../../Basics/Styles";
import InteractionCard from "../../Basics/HomePageSection";
import Colors from "../../Basics/Colors";
import { useTranslation } from "react-i18next";
import ClickableText from "../../Basics/ClickableText";
import TreatmentTimeline, {
  Panel,
  MonthPreview,
} from "../../Basics/TreatmentTimeline";
import Typography from "@material-ui/core/Typography";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

const ProgressGraph = observer((props) => {
  const classes = useStyles();
  const { patientStore } = useStores();
  const { t } = useTranslation("translation");

  return (
    <InteractionCard
      id="intro-progress-card"
      upperText={
        <>
          <TrendingUpIcon /> {t("patient.home.cardTitles.myProgress")}
        </>
      }
    >
      <div className={classes.container}>
        <div className={classes.topSection}>
          <Typography className={classes.greatWork} variant="h2">
            Great work! 👍
          </Typography>
          <div className={classes.statContainer}>
            <div className={classes.daysInTreatment}>
              <span className={classes.treatmentDay}>
                {patientStore.patientInformation.daysInTreatment}
              </span>
              <Typography variant="h2"> days in treatment</Typography>
            </div>
            <div className={classes.daysInTreatment}>
              <span className={classes.streakDay}>
                {patientStore.getCurrentStreak}
              </span>
              <Typography variant="h2"> consecutive reports</Typography>
            </div>
          </div>
        </div>
      </div>
      <BottomSection {...props} />
    </InteractionCard>
  );
});

const BottomSection = (props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation("translation");
  const [showTimeline, setShowTimeline] = useState(false);
  const { patientStore } = useStores();
  const expand = () => {
    setShowTimeline(!showTimeline);
  };

  return (
    <div className={classes.bottomSection}>
      <div className={classes.timelineHeader}>
        <Typography variant="h2">{t("timeline.title")}</Typography>
        <ClickableText
          onClick={expand}
          hideIcon
          text={
            showTimeline
              ? t("patient.home.progress.close")
              : t("patient.home.progress.viewAll")
          }
        />
      </div>
      <div className={classes.timeline}>
        {!showTimeline ? (
          <>
            <span>{t("timeline.here")} 📍</span>
            <div className="preview">
              <MonthPreview
                month={Math.floor(
                  patientStore.patientInformation.weeksInTreatment / 4
                )}
              />
              <Panel
                weeksInTreatment={props.weeksInTreatment}
                title={`${t("timeline.followUp")}`}
                weekValue={24}
                noWeek
                week={t("timeline.twoMonths")}
              />
            </div>
          </>
        ) : (
          <>
            <br />
            <TreatmentTimeline
              weeksInTreatment={
                patientStore.patientInformation.weeksInTreatment
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  actionButton: {
    position: "relative",
    top: "-2em",
  },
  topSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row-reverse",
    padding: ".5em",
    paddingLeft: "1em",
    borderBottom: `solid 2px ${Colors.lightgray}`,
  },
  bottomSection: {
    ...Styles.flexColumn,
    position: "relative",
    width: "100%",
    alignItems: "flex-start",
    "& > button": {
      position: "relative",
      right: 0,
    },
  },
  bottomText: {
    fontSize: "1em",
    margin: ".5em",
    textAlign: "right",
  },
  milestone: {
    width: "85%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
  },
  timeline: {
    boxSizing: "border-box",
    width: "100%",
    paddingBottom: ".5em",
    "& > span": {
      display: "block",
      fontSize: ".8em",
      color: Colors.textGray,
      margin: "0 0 1em 5%",
      padding: 0,
    },
    "& > button": {
      marginLeft: "auto",
    },
    "& > .preview": {
      display: "flex",
      alignItems: "flex-start",
      width: "90%",
      padding: "0 1em 0 1em",
      "& > .monthPreview": {
        marginRight: "1em",
      },
      "& > div:nth-of-type(2)": {
        marginTop: 0,
      },
    },
  },
  timelineHeader: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    margin: "1em 0 0 0",
    "& > h2": {
      marginLeft: "1em",
      fontSize: "1em",
      textTransform: "capitalize",
      fontWeight: "bold",
    },
    "& >  button": {
      marginLeft: "auto",
      marginRight: "1em",
    },
  },
  daysInTreatment: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > h2": {
      fontSize: "1em",
      color: "black",
    },
    "&:first-of-type": {
      borderBottom: `solid 2px ${Colors.lightgray}`,
    },
    padding: ".5em 0 .5em 0",
  },
  treatmentDay: {
    color: Colors.accentBlue,
    fontWeight: "bold",
    fontSize: "1.5em",
    marginRight: "15px",
  },
  streakDay: {
    color: Colors.approvedGreen,
    fontWeight: "bold",
    fontSize: "1.5em",
    marginRight: "15px",
  },
  greatWork: {
    fontSize: "1.5em",
    textAlign: "center",
    width: "40%",
  },
  statContainer: {
    width: "50%",
  },
});

export default ProgressGraph;
