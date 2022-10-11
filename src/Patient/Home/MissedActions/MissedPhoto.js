import React from "react";
import PhotoIcon from "@material-ui/icons/CameraAlt";
import useStores from "../../../Basics/UseStores";
import MissedActionCard from "./MissedActionCard";
import { useTranslation } from "react-i18next";
import Colors from "../../../Basics/Colors";
import Buttonlayout from "./ButtonLayout";
import { DateTime } from "luxon";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  subText: {
    color: Colors.textGray,
  },
});

const MissedPhoto = observer(() => {
  const classes = useStyles();
  const { t } = useTranslation("translation");
  const { uiStore, patientStore } = useStores();
  const openMissedPhoto = () => {
    uiStore.push("/missed-photo");
  };
  const formattedDate = DateTime.fromISO(
    patientStore.lastPhotoRequestStatus.dateOfRequest
  ).toLocaleString({ month: "long", day: "numeric" });

  return (
    <MissedActionCard on>
      <Buttonlayout
        text={
          <>
            {t("patient.home.missedDays.missedPhoto")}
            <br />
            <span className={classes.subText}>{formattedDate}</span>
          </>
        }
        icon={<PhotoIcon />}
        color={Colors.warningRed}
        onClick={openMissedPhoto}
      />
    </MissedActionCard>
  );
});

export default MissedPhoto;
