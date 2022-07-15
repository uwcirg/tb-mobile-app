import { Event } from "@material-ui/icons";
import { observer } from "mobx-react";
import React from "react";
import { useTranslation } from "react-i18next";
import HomePageSection from "../../Basics/HomePageSection";
import useStores from "../../Basics/UseStores";
import ViewAppointments from "../../Components/Shared/Appointments/ViewAppointments";

const NextAppointment = observer(() => {
  const { patientStore } = useStores();
  const { t } = useTranslation("translation");

  return (
    <HomePageSection
      upperText={
        <>
          <Event />
          {t("patient.reminders.appointments")}
        </>
      }
    >
      {patientStore.userID && (
        <ViewAppointments patientId={patientStore.userID} />
      )}
    </HomePageSection>
  );
});

export default NextAppointment;
