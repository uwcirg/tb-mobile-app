import React from "react";
import { ReactComponent as DoctorIcon } from "../../Basics/Icons/DoctorGroup.svg";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  landing: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1em",
    textAlign: "center",
    "& > svg": {
      height: "150px",
    },
  },
});

const Landing = observer(() => {
  const { patientStore } = useStores();
  const classes = useStyles();
  const { t } = useTranslation("translation");

  return (
    <div className={classes.landing}>
      <DoctorIcon />
      <h2>
        {t("patient.onboarding.landing.welcome")} {patientStore.givenName}
      </h2>
      <p>{t("patient.onboarding.landing.message")}</p>
    </div>
  );
});

export default Landing;
