import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import ForumIcon from "@material-ui/icons/Forum";
import InfoIcon from "@material-ui/icons/Info";
import CalIcon from "@material-ui/icons/EventAvailable";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  item: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    "& > svg": {
      marginRight: "5px",
    },
  },
});

const NavInfo = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation("translation");

  return (
    <div className={classes.container}>
      <p> {t("patient.walkthrough.navigation.text")} </p>
      <Item
        icon={<HomeIcon />}
        text={t("patient.walkthrough.navigation.one")}
      />
      <Item icon={<CalIcon />} text={t("patient.walkthrough.navigation.two")} />
      <Item
        icon={<ForumIcon />}
        text={t("patient.walkthrough.navigation.three")}
      />
      <Item
        icon={<InfoIcon />}
        text={t("patient.walkthrough.navigation.four")}
      />
    </div>
  );
};

const Item = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.item}>
      {props.icon}
      {props.text}
    </div>
  );
};

export default NavInfo;
