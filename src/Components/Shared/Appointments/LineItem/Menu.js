import React, { useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Colors from "../../../../Basics/Colors";
import { MoreHoriz } from "@material-ui/icons";

const useStyles = makeStyles({
  delete: {
    color: Colors.warningRed,
  },
});

const ReminderMenu = ({ disabled, handleDelete }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation("translation");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = () => {
    handleClose();
    handleDelete();
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
};

export default ReminderMenu;
