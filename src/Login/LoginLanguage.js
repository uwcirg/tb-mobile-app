import React from "react";
import LanguageQuestion from "../Components/Shared/LanguageQuestion";
import { Box, Grid, Typography } from "@material-ui/core";
import { Language } from "@material-ui/icons";

const LoginLanguage = () => {
  return (
    <Box width="75%" maxWidth="400px" margin="0 auto">
      <Grid
        style={{ color: "white", padding: ".5em 0" }}
        container
        alignItems="center"
      >
        <Language />
        <Box width=".25em" />
        <Typography variant="body1">Idioma / Bahasa / Language:</Typography>
      </Grid>
      <LanguageQuestion />
    </Box>
  );
};

export default LoginLanguage;
