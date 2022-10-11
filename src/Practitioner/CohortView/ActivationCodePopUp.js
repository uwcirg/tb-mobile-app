import React from "react";
import PopOver from "../Shared/PopOver";
import { useTranslation } from "react-i18next";
import TextCopy from "../../Utility/Copiable";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  copy: {
    marginTop: "2em",
  },
});

const ActivationCodePopup = ({ activationCode, close }) => {
  const classes = useStyles();
  const { t } = useTranslation("translation");

  if (activationCode)
    return (
      <PopOver
        ignoreClickAway
        title={t("coordinator.addPatientFlow.forPatient")}
        close={close}
      >
        <TextCopy
          className={classes.copy}
          icon={<VpnKeyIcon />}
          text={activationCode}
        />
      </PopOver>
    );
  return "";
};

export default ActivationCodePopup;
