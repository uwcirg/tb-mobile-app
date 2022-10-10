import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Outro = () => {
  const { t, i18n } = useTranslation("translation");

  return (
    <>
      <div>
        <h2>{t("patient.walkthrough.outro.header")} 👍</h2>
        <p>{t("patient.walkthrough.outro.one")}</p>
      </div>
    </>
  );
};

export default Outro;
