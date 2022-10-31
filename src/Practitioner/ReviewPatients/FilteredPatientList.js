import React from "react";
import { Box } from "@material-ui/core";
import PatientCard from "./PatientCard";
import { makeStyles } from "@material-ui/core";
import Switcher from "../../Layouts/Switcher";
import "./every-layout.css";
import Grid from "../../Layouts/Grid";

export default function FilteredPatientList({ patients }) {
  const classes = useStyles();

  return (
    <>
      <Grid>
        {patients?.map((patient) => {
          return (
            <div
              key={`review-patient-${patient.id}`}
              // className={classes.switcherChildren}
            >
              <Box>
                <PatientCard isSimpleView patient={patient} />
              </Box>
            </div>
          );
        })}
      </Grid>
    </>
  );
}

const useStyles = makeStyles(() => ({
  switcher: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1em",
    "& > *": {
      flexGrow: "1",
      flexBasis: "calc((40em - 100%) * 999)",
    },
    "&:nth-last-child(5n)": {
      flexBasis: "100%",
    },
    "&:nth-last-child(n+5) ~ *": {
      flexBasis: "100%",
    },
  },
  // switcherChildren: {

  // },
}));
