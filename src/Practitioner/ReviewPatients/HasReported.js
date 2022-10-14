import React from "react";
import {
  Block,
  CheckCircleOutline,
  AccessTimeOutlined,
} from "@material-ui/icons";
import Colors from "../../Basics/Colors";
import { DateTime } from "luxon";

export default function HasReported({ patient }) {
  const { unresolvedReports } = patient;

  const hasUnresolvedReports = unresolvedReports.length > 0;

  const today =
    hasUnresolvedReports &&
    unresolvedReports?.filter((report, i) => {
      return unresolvedReports[i]?.date === DateTime.local().toISODate()
        ? report
        : false;
    });

  const reportedToday = today || hasUnresolvedReports;

  if (!reportedToday)
    return <AccessTimeOutlined style={{ color: Colors.gray }} />;

  const tookMeds = today[0]?.medicationWasTaken;

  return (
    <>
      {reportedToday && tookMeds ? (
        <CheckCircleOutline style={{ color: Colors.green }} />
      ) : (
        <Block style={{ color: Colors.yellow }} />
      )}
    </>
  );
}
