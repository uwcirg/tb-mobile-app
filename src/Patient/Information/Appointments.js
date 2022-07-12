import React from "react";
import { Box } from "@material-ui/core";
import { observer } from "mobx-react";
import useStores from "../../Basics/UseStores";
import AppointmentList from "../../Components/Shared/Appointments/List";

const Appointments = observer(() => {
  const id = useStores().patientStore.userID;

  return <Box padding="1rem">{id && <AppointmentList patientId={id} />}</Box>;
});

export default Appointments;
