import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import { useTranslation } from "react-i18next";
import { ButtonBase } from "@material-ui/core";
import Colors from "../../Basics/Colors";

const useStyles = makeStyles({
  uncapitalize: {
    textTransform: "unset",
  },
  noReport: {
    "& > p": {
      margin: "5px 0 .5em 0",
    },
  },
  description: {
    color: Colors.buttonBlue,
    fontSize: "1em",
    display: "flex",
    "& > span": {
      textAlign: "left",
    },
    "& > svg": {
      marginLeft: "auto",
      padding: ".5em",
    },
  },
});

const MissedReportInfo = (props) => {
  const { t } = useTranslation("translation");
  const classes = useStyles();
  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div className={`${classes.noReport} ${props.className}`}>
      {!props.hideReport && <p>{t("patient.progress.noReport")}</p>}
      <ButtonBase onClick={toggleDetail} className={classes.description}>
        <span>{t("patient.progress.whenBackReport")}</span>
        {showDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </ButtonBase>
      <Collapse in={showDetail}>
        <p>{t("patient.progress.submissionLimit")}</p>
      </Collapse>
    </div>
  );
};
export default MissedReportInfo;
