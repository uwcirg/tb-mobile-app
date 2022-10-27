import React from "react";

const PractitionerContext = React.createContext({
  patients: [],
  setPatients: null,
});

export default PractitionerContext;
