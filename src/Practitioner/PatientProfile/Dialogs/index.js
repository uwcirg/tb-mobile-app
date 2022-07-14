import React from "react";
import useStores from "../../../Basics/UseStores";
import { observer } from "mobx-react";
import AddNote from "./AddNote";
import ChangePatientDetails from "./ChangePatientDetails";
import ResetPassword from "./ResetPassword";
import ArchiveDialog from "./ArchiveDialog";
import ArchivedWarning from "./ArchivedWarning";
import { Link, useHistory, useParams } from "react-router-dom";

import { Switch, Route } from "react-router-dom";
import AddAppointment from "../../../Components/Shared/Appointments/AddAppointment";
import PopOverV2 from "../../../Components/Shared/PopOverV2";
import AppointmentList from "../../../Components/Shared/Appointments/List";
import { Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const Dialogs = observer(() => {
  const { patientProfileStore } = useStores();

  const { t } = useTranslation("translation");

  const history = useHistory();
  const { id: patientId } = useParams();

  if (patientProfileStore.onArchiveWarning)
    return (
      <ArchivedWarning handleClose={patientProfileStore.closeArchiveWarning} />
    );

  const handleClose = () => {
    history.push(`/patients/${patientId}`);
  };

  return (
    <Switch>
      <Route path="/patients/:id/appointments">
        <PopOverV2 open>
          <Link to={`/patients/${patientId}/add-appointment`}>
            {t("appointments.addAppointment")}
          </Link>
          <Box padding="1rem">
            <AppointmentList patientId={patientId} />
          </Box>
        </PopOverV2>
      </Route>
      <Route path="/patients/:id/archive">
        <ArchiveDialog handleClose={handleClose} />
      </Route>
      <Route path="/patients/:id/reset-password">
        <ResetPassword handleClose={handleClose} />
      </Route>
      <Route path="/patients/:id/add-note">
        <AddNote handleClose={handleClose} />
      </Route>
      <Route path="/patients/:id/edit">
        <ChangePatientDetails handleClose={handleClose} />
      </Route>
      <Route path="/patients/:id/add-appointment">
        <PopOverV2 open disableTopBar>
          <AddAppointment patientId={patientId} />
        </PopOverV2>
      </Route>
    </Switch>
  );
});

export default Dialogs;
