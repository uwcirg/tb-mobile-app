import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../../Basics/Colors";
import { ChevronLeft } from "@material-ui/icons";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: Colors.buttonBlue,
    textTransform: "capitalize",
  },
});

export default function BackButton({ hidden }) {
  const { t } = useTranslation("translation");
  const classes = useStyles();
  return (
    <Box minHeight="2rem">
      <Link className={classes.link} hidden={hidden} to="/login">
        <Grid container alignItems="center">
          <ChevronLeft />
          {t("commonWords.back")}
        </Grid>
      </Link>
    </Box>
  );
}
