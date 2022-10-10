import { Box, CircularProgress } from "@material-ui/core";
import React from "react";

export default function AsyncLoadingWrapper({ status, children }) {
  switch (status) {
    case "idle":
      <></>;
    case "pending":
      return (
        <Box
          minHeight="300px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress variant="indeterminate" />
        </Box>
      );
    case "success":
      return <>{children}</>;

    case "error":
      return <p>Error with network request, please try again</p>;

    default:
      return <p>Error, unexpected state</p>;
  }
}
