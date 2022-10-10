import { observer } from "mobx-react";
import React from "react";
import useStores from "../../Basics/UseStores";
import { useTranslation } from "react-i18next";
import NewButton from "../../Basics/NewButton";
import SectionTitle from "./MobileView/SectionTitle";
import {
  Box,
  Button,
  Collapse,
  Grid,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import {
  Event,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Edit,
  Restore as Archive,
  VpnKey as Key,
  AddCircle as Add,
  ChatBubble as Message,
  MoreVert,
} from "@material-ui/icons";
import useToggle from "../../Hooks/useToggle";
import { useLocation } from "react-router-dom";
import FlatButton from "../../Components/FlatButton";
import { Menu, MenuItem } from "@material-ui/core";
import Colors from "../../Basics/Colors";
import isIndonesiaPilot from "../../Utility/check-indonesia-flag";

const useStyles = makeStyles({
  button: {
    padding: ".5em",
  },
  toggle: {
    textTransform: "capitalize",
  },
  desktopButtons: {
    width: "unset",
    "& > *": {
      margin: "3px",
    },
  },
  redButton: {
    backgroundColor: Colors.warningRed,
  },
});

const ButtonList = observer(({ isDesktopView }) => {
  const classes = useStyles();

  const [showActions, toggleShowActions] = useToggle(false);

  const { patientProfileStore } = useStores();
  const { t } = useTranslation("translation");

  const channelId = patientProfileStore.selectedPatient.details.channelId;

  const baseUrl = useLocation().pathname;

  const buttons = [
    {
      to: `/messaging/channels/${channelId}`,
      icon: <Message />,
      text: t("coordinator.patientProfile.options.message"),
    },
    {
      to: `${baseUrl}/add-note`,
      icon: <Add />,
      text: t("coordinator.patientProfile.options.note"),
    },
    {
      to: `${baseUrl}/edit`,
      icon: <Edit />,
      text: t("coordinator.patientProfile.options.edit"),
    },
    {
      to: `${baseUrl}/reset-password`,
      icon: <Key />,
      text: t("coordinator.patientProfile.options.resetPassword"),
    },
    {
      to: `${baseUrl}/add-appointment`,
      icon: <Event />,
      text: t("appointments.addAppointment"),
      hide: !isIndonesiaPilot(),
    },
    {
      to: `${baseUrl}/archive`,
      icon: <Archive />,
      text: t("coordinator.patientProfile.options.archive"),
      hide: patientProfileStore.isArchived,
      red: true,
    },
  ];

  if (isDesktopView) {
    return (
      <Grid
        alignItems="center"
        container
        justify="flex-end"
        className={classes.desktopButtons}
      >
        {buttons.map((each) => {
          if (each.hide) return;
          return (
            <FlatButton
              key={each.text}
              className={each.red ? classes.redButton : ""}
              to={each.to}
            >
              {each.icon}
              {each.text}
            </FlatButton>
          );
        })}
        <MoreOptions />
      </Grid>
    );
  }

  return (
    <>
      <Grid alignItems="center" container>
        <SectionTitle>{t("mobileUpdate.showActions")}</SectionTitle>
        <Box flexGrow={1} />
        <Button className={classes.toggle} onClick={toggleShowActions}>
          {showActions
            ? t("patient.home.helpVideos.hide")
            : t("mobileUpdate.showActions")}
          {showActions ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </Button>
      </Grid>
      <Box height=".5em" aria-hidden />
      <NewButton
        to={buttons[0].to}
        className={classes.button}
        icon={buttons[0].icon}
        text={buttons[0].text}
      />
      <Collapse in={showActions}>
        <div>
          {buttons.splice(1).map((each) => {
            if (each.hide) return;
            return (
              <NewButton
                key={each.text}
                to={each.to}
                onClick={each.onClick}
                className={classes.button}
                icon={each.icon}
                text={each.text}
              />
            );
          })}
        </div>
      </Collapse>
    </>
  );
});

const MoreOptions = () => {
  const { patientProfileStore } = useStores();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTestNotification = () => {
    patientProfileStore.sendTestReminder();
    handleClose();
  };

  return (
    <div>
      <IconButton aria-label="" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleTestNotification}>
          Send a test report reminder
        </MenuItem>
      </Menu>
    </div>
  );
  v;
};

export default ButtonList;
