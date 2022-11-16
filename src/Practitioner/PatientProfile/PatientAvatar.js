import React from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import Colors from "../../Basics/Colors";
import { WhatsApp } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import Item from "./Details/Item";

export default function PatientAvatar({ patient }) {
  const { t } = useTranslation("translation");
  return (
    <>
      <Grid item xs={12} md={3} spacing={2}>
        <Avatar
          style={{ backgroundColor: Colors.green, marginRight: "1em" }}
          size="small"
        >
          {patient.fullName[0]}
        </Avatar>
      </Grid>
      <Grid container spacing={1} direction="column">
        <Grid item xs={12} md={3} spacing={2}>
          <Typography variant="h1">{patient.fullName}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          spacing={2}
          style={{ display: "flex", alignItems: "center" }}
        >
          <WhatsApp style={{ height: ".75em", color: Colors.blue }} />
          <Typography variant="body1" color="initial">
            {patient.phoneNumber}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={3}
          style={{ display: "flex", alignItems: "center", marginLeft: "1em" }}
        >
          <Item
            top={t("coordinator.patientProfile.age")}
            bottom={patient.age || "N/A"}
          />
          <Item
            top={t("coordinator.patientProfile.gender")}
            bottom={patient.gender || "N/A"}
          />
        </Grid>
      </Grid>
      <div style={{ marginLeft: "1em" }}></div>
    </>
  );
}
