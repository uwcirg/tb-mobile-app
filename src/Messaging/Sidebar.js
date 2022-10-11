import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../Basics/UseStores";
import { observer } from "mobx-react";
import Profile from "../Practitioner/Shared/PatientPreview";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    "& > div": {
      marginTop: "4em",
    },
  },
});

const PatientMessageSidebar = observer(() => {
  const classes = useStyles();
  const { messagingStore } = useStores();
  const { t } = useTranslation("translation");

  const id =
    messagingStore.coordinatorSelectedChannel &&
    messagingStore.coordinatorSelectedChannel.userId;

  return (
    <div className={classes.container}>
      {id != 0 ? <Profile id={id} /> : <p>{t("commonWords.loading")}</p>}
    </div>
  );
});

export default PatientMessageSidebar;
