import React from "react";
import { useTranslation } from "react-i18next";

const StepFive = () => {
  const { t } = useTranslation("translation");
  return (
    <>
      {t("testStripInstructions.five.main") + " "}
      {t("testStripInstructions.five.a")}
    </>
  );
};

const testStripInstructions = [
  "testStripInstructions.one",
  "testStripInstructions.two",
  "testStripInstructions.three",
  "testStripInstructions.four",
  <StepFive />,
  "testStripInstructions.six",
];

export default testStripInstructions;
