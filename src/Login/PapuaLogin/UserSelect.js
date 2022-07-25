import { Box, ButtonBase, Typography, withStyles } from "@material-ui/core";
import { AccountBox, SupervisorAccount } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Colors from "../../Basics/Colors";

const SelectButton = withStyles({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: Colors.papuaGreen,
    color: "white",
    borderRadius: "18px",
  },
})(ButtonBase);

export default function UserSelect({ isProvider }) {
  const { t } = useTranslation("translation");
  const icon = isProvider ? <SupervisorAccount /> : <AccountBox />;

  return (
    <SelectButton
      component={Link}
      to={isProvider ? "/login/provider" : "/login/patient"}
    >
      <Box padding="1rem">{icon}</Box>
      <Typography variant="body1">
        {isProvider ? t("userTypes.provider") : t("userTypes.patient")}
      </Typography>
    </SelectButton>
  );
}
