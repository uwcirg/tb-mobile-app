import React from "react";
import LaterIcon from "@material-ui/icons/Update";

const TestStripImage = () => {
  return <img width="64px" src="/img/test-instructions.png" alt="test strip" />;
};

const optionalRoutes = [
  {
    to: "/information/test-instructions",
    translationKey: "patient.information.testInstructions",
    icon: <TestStripImage />,
  },
  {
    to: "/",
    translationKey: "patient.report.photo.submitLater",
    icon: <LaterIcon />,
  },
];

export { optionalRoutes };
