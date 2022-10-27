import React from "react";
import { Grid, Box, Typography, ButtonBase, Paper } from "@material-ui/core";
import useStyles from "./styles";
import capitalizeFirstLetter from "../../../Utility/StringUtils";

const BigConfirmationButton = ({
  icon,
  text,
  onClick,
  primaryColor,
  bgColor,
}) => {
  const classes = useStyles({ bgColor: bgColor, primaryColor: primaryColor });

  return (
    <Paper className={classes.sideBySideArea} elevation={1}>
      <ButtonBase onClick={onClick} className={classes.mainButton}>
        <Grid container alignItems="center" direction="column">
          {React.cloneElement(icon)}
          <Box height="8px" />
          <Typography style={{ lineHeight: "1rem" }} variant="body1">
            {capitalizeFirstLetter(text.toLowerCase())}
          </Typography>
        </Grid>
      </ButtonBase>
    </Paper>
  );
};

export default BigConfirmationButton;
