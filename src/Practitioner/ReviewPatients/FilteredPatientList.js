import React from "react";
import { Box } from "@material-ui/core";
import PatientCard from "./PatientCard";
import Grid from "../../Layouts/Grid";

export default function FilteredPatientList({
  patients,
  isSimpleView = false,
  markPatientAsReviewed,
  isReviewed = false,
}) {
  return (
    <>
      <Grid>
        {patients?.map((patient) => {
          return (
            <div key={`review-patient-${patient.id}`}>
              <Box>
                {isSimpleView ? (
                  <PatientCard isSimpleView={isSimpleView} patient={patient} />
                ) : (
                  <PatientCard
                    isSimpleView={isSimpleView}
                    patient={patient}
                    markPatientAsReviewed={markPatientAsReviewed}
                    isReviewed={isReviewed}
                  />
                )}
              </Box>
            </div>
          );
        })}
      </Grid>
    </>
  );
}
