import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../Basics/Colors";
import IconButton from "@material-ui/core/IconButton";
import Clear from "@material-ui/icons/Clear";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  warning: {
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.warningRed,
    color: "white",
    "& > button": {
      display: "block",
      color: "white",
    },
    "& > span": {
      margin: "0 auto",
      textAlign: "center",
      padding: ".5em",
    },
  },
});

const DemoWarning = () => {
  const [isHidden, setIsHidden] = useState(false);
  const isDemo = window && window._env && window._env.DOCKER_TAG === "develop";
  const classes = useStyles();
  const { t } = useTranslation("translation");

  if (!isDemo || isHidden) {
    return <></>;
  }

  return (
    <div className={classes.warning}>
      <span>{t("demoWarning")}</span>
      <IconButton
        onClick={() => {
          setIsHidden(true);
        }}
      >
        <Clear />
      </IconButton>
    </div>
  );
};

export default DemoWarning;
