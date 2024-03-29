import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Colors from "../../Basics/Colors";
import Grid from "@material-ui/core/Grid";
import { Avatar, Box } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    padding: "1em",
    width: "100%",
    boxSizing: "border-box",
  },
  list: {
    padding: 0,
    margin: 0,
    "& > li": {
      marginTop: "1em",
      listStyleType: "none",
    },
    "& > li > img": {
      width: "100%",
      margin: "auto",
      marginTop: "1em",
      borderRadius: "5px",
    },
  },
  number: {
    borderRadius: "50%",
    color: "white",
    backgroundColor: Colors.accentBlue,
    width: "1.25em",
    height: "1.25em",
    marginBottom: ".5em",
  },
  avatar: {
    backgroundColor: Colors.accentBlue,
  },
});

const NotificationInstructions = () => {
  const { t } = useTranslation("translation");
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ol className={classes.list}>
        <Item
          number={1}
          text={t("notificationInstructions.steps.goToSettings")}
        />
        <Item
          number={2}
          text={t("notificationInstructions.steps.clickNotifications")}
        />
        <Item number={3} text={t("notificationInstructions.steps.clickApp")} />
        <Item
          number={4}
          text={t("notificationInstructions.steps.allowNotifications")}
        />
        {/* <Item number={5} text={t('notificationInstructions.steps.verify')} /> */}
      </ol>
    </div>
  );
};

const Item = ({ number, text }) => {
  const classes = useStyles();
  return (
    <li>
      <Grid alignItems="center" wrap="nowrap" container>
        {/* <Grid container justify="center" alignItems="center" className={classes.number} spacing={1}>
                <span >{number}</span>
            </Grid> */}
        <Avatar className={classes.avatar}>{number}</Avatar>
        <Box width="1rem" />
        <Typography variant="body1" children={text} />
      </Grid>
      <Box width="100%" padding="16px" style={{ boxSizing: "border-box" }}>
        <img
          width="100%"
          src={`/img/es-Ar/notification-instructions/${number}.jpg`}
        />
      </Box>
    </li>
  );
};
export default NotificationInstructions;
