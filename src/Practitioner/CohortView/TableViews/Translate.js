import React from "react";
import { useTranslation } from "react-i18next";

const Translate = ({ string }) => {
  const { t } = useTranslation("translation");
  const text = t(string);
  return <>{text}</>;
};

export default Translate;
