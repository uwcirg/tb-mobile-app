import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import Colors from "../../../../Basics/Colors";
import useStores from "../../../../Basics/UseStores";
import { MoreHoriz } from "@material-ui/icons";
import useAsyncWithParams from "../../../../Hooks/useAsyncWithParams";
import SharedAPI from "../../../../API/SharedAPI";

const useStyles = makeStyles({
  delete: {
    color: Colors.warningRed,
  },
});

const ReminderMenu = observer(({ reminderID, disabled }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const patientID = useStores().patientStore.userID;
  const { reminderStore } = useStores();
  const { t } = useTranslation("translation");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { execute, status } = useAsyncWithParams({
    asyncFunc: SharedAPI.deleteAppointment,
    immediate: false,
    funcParams: [reminderID],
    initialData: [],
  });

  const handleItemClick = () => {
    handleClose();
    execute();
  };

  return (
    <>
      <IconButton
        disabled={disabled}
        style={{ padding: 0 }}
        onClick={handleClick}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.delete} onClick={handleItemClick}>
          {t("commonWords.delete")}
        </MenuItem>
      </Menu>
    </>
  );
});

export default ReminderMenu;
