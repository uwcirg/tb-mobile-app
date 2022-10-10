import React from "react";
import useStores from "../../../Basics/UseStores";
import EditIcon from "@material-ui/icons/Edit";
import MissedActionCard from "./MissedActionCard";
import { useTranslation } from "react-i18next";
import ButtonLayout from "./ButtonLayout";

const ContactTracingCard = () => {
  const { uiStore } = useStores();
  const { t } = useTranslation("translation");

  const openContactTracing = () => {
    uiStore.push("/contact-tracing");
  };

  return (
    <MissedActionCard>
      <ButtonLayout
        text={t("householdTesting.button")}
        icon={<EditIcon />}
        onClick={openContactTracing}
      />
    </MissedActionCard>
  );
};

export default ContactTracingCard;
