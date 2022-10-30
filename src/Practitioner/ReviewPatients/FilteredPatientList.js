import React from "react";
import { Box } from "@material-ui/core";
import PatientCard from "./PatientCard";
import { makeStyles } from "@material-ui/core";

export default function FilteredPatientList({ patients }) {
  const classes = useStyles();

  return (
    <>
      <div
        className={classes.switcher}
        style={{ marginRight: "1em", marginLeft: "1em" }}
      >
        {patients?.map((patient) => {
          return (
            <div
              key={`review-patient-${patient.id}`}
              className={classes.switcherChildren}
            >
              <Box>
                <PatientCard isSimpleView patient={patient} />
              </Box>
            </div>
          );
        })}
      </div>
    </>
  );
}

const useStyles = makeStyles(() => ({
  switcher: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1em",
  },
  switcherChildren: {
    flexGrow: "1",
    flexBasis: "20em",
    "& > :nth-last-child(n+5)": {
      flexBasis: "100%",
    },
    "& > :nth-last-child(n+5) ~ *": {
      flexBasis: "100%",
    },
  },
}));
