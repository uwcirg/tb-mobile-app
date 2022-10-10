import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import OverTopBar from "../Navigation/OverTopBar";
import { useTranslation } from "react-i18next";
import PatientInformationAPI from "../../API/PatientInformationAPI";
import useToggle from "../../Hooks/useToggle";
import Explanation from "./Explanation";
import Survey from "./Survey";
import ConfirmationScreen from "./Confirmation";
import { observer } from "mobx-react";

const ContactTracingUpdate = observer(() => {
  const { uiStore, patientStore } = useStores();
  const { t } = useTranslation("translation");

  const [numberOfContacts, setNumberOfContacts] = useState(0);
  const [numberOfTests, setNumberOfTests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitSurvey = () => {
    setIsLoading(true);
    new PatientInformationAPI(patientStore.userID)
      .createContactTracingSurvey(numberOfContacts, numberOfTests)
      .then(processResponse);
  };

  const pages = [
    <Explanation />,
    <Survey
      setNumberOfContacts={setNumberOfContacts}
      setNumberOfTests={setNumberOfTests}
      numberOfTests={numberOfTests}
      numberOfContacts={numberOfContacts}
      submitSurvey={submitSurvey}
    />,
    <ConfirmationScreen isLoading={isLoading} />,
  ];

  const pageInRange = (page) => {
    return page >= 0 && page < pages.length;
  };

  const processResponse = (json) => {
    setIsLoading(false);
    if (json.httpStatus !== 201) {
      setError(true);
    }
  };

  const handleNext = () => {
    if (pageInRange(uiStore.step + 1)) {
      uiStore.nextStep();
    } else {
      uiStore.push("/");
    }
  };

  const handleBack = () => {
    if (pageInRange(uiStore.step - 1)) {
      uiStore.prevStep();
    } else {
      uiStore.push("/");
    }
  };

  return (
    <>
      <OverTopBar
        notFixed
        handleBack={handleBack}
        title={t("householdTesting.title")}
      />
      {pageInRange(uiStore.step) &&
        React.cloneElement(pages[uiStore.step], {
          numberOfContacts: numberOfContacts,
          numberOfTests: numberOfTests,
          handleNext: handleNext,
          wasError: error,
        })}
    </>
  );
});

export default ContactTracingUpdate;
