import React from "react";
import useStores from "../../../Basics/UseStores";
import { useTranslation } from "react-i18next";
import BottomButton from "./BottomButton";
import GenericErrorMessage from "../../../Components/GenericErrorMessage";
import ContentContainer from "./ContentContainer";

const ErrorMessage = () => {
  const { patientUIStore } = useStores();
  const { t } = useTranslation("translation");

  return (
    <>
      <ContentContainer>
        <GenericErrorMessage />
      </ContentContainer>
      <BottomButton onClick={patientUIStore.goToHome}>
        {t("patient.report.symptoms.warning.button")}
      </BottomButton>
    </>
  );
};

export default ErrorMessage;
