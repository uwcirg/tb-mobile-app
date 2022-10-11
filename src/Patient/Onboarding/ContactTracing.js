import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import SurveyHeader from "./SurveyHeader";
import { useTranslation } from "react-i18next";

import AddSubtractField from "../../Components/Patient/AddSubtractField";

const ContactTracing = observer((props) => {
  const { t } = useTranslation("translation");
  const { activationStore } = useStores();

  return (
    <div className={props.bodyClass}>
      <SurveyHeader
        index={props.index}
        title={t("patient.onboarding.contactTracing.one")}
      />
      <AddSubtractField
        value={activationStore.onboardingInformation.numberOfContacts}
        setValue={activationStore.setNumberOfContacts}
      />
      {activationStore.onboardingInformation.numberOfContacts > 0 && (
        <>
          <br />
          <SurveyHeader
            index={props.index + 1}
            title={t("patient.onboarding.contactTracing.two")}
          />
          <AddSubtractField
            value={activationStore.onboardingInformation.numberOfContactsTested}
            setValue={activationStore.setNumberOfContactsTested}
            maxValue={activationStore.onboardingInformation.numberOfContacts}
          />
        </>
      )}
    </div>
  );
});

export default ContactTracing;
