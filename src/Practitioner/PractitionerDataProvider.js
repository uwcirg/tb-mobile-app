import React from "react";
import PractitionerContext from "./PractitionerContext";
import useAsync from "../Hooks/useAsync";
import PractitionerAPI from "../API/PractitionerAPI";

async function getAllPatients() {
  return PractitionerAPI.getPatients(true);
}

export default function PractitionerDataProvider({ children }) {
  const data = {
    patientIssues: {
      ...useAsync(PractitionerAPI.getPatientIssues),
    },
    patients: {
      ...useAsync(getAllPatients),
    },
  };

  return (
    <PractitionerContext.Provider value={data}>
      {children}
    </PractitionerContext.Provider>
  );
}
