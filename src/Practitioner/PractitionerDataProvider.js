import React, { useMemo } from "react";
import PractitionerContext from "./PractitionerContext";
import useAsync from "../Hooks/useAsync";
import PractitionerAPI from "../API/PractitionerAPI";

export default function PractitionerDataProvider({ children }) {
  const data = {
    patientIssues: {
      ...useAsync(PractitionerAPI.getPatientIssues),
    },
  };

  const memoData = useMemo(() => data, [data]);

  return (
    <PractitionerContext.Provider value={memoData}>
      {children}
    </PractitionerContext.Provider>
  );
}
