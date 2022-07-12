import React from "react";
import { Box } from "@material-ui/core";
import { observer } from "mobx-react";
import useStores from "../../Basics/UseStores";
import AppointmentList from "../../Components/Shared/Appointments/List";

const Appointments = observer(() => {
  const id = useStores().patientStore.userID;

  return <Box>{id && <AppointmentList patientId={id} />}</Box>;
});

export default Appointments;
