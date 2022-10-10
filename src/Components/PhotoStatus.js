import React from "react";
import { useTranslation } from "react-i18next";
import Colors from "../Basics/Colors";
import Tag from "../Practitioner/PatientProfile/ReportTable/ReportTag";

const getColor = (conclusive) => {
  if (conclusive === false) {
    return Colors.calendarRed;
  } else if (conclusive === true) {
    return Colors.calendarGreen;
  } else {
    return Colors.gray;
  }
};

const PhotoStatus = ({ conclusive = null, className }) => {
  const { t } = useTranslation("translation");
  let text;

  if (conclusive === false) {
    text = t("report.inconclusive");
  } else if (conclusive === true) {
    text = t("report.conclusive");
  } else {
    text = t("report.pending");
  }

  return (
    <Tag className={className} backgroundColor={getColor(conclusive)}>
      {text}
    </Tag>
  );
};

export default PhotoStatus;
