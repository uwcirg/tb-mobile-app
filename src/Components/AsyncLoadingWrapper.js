import { Box } from "@material-ui/core";
import React from "react";
import Loading from "../Practitioner/Shared/Loading";

export default function AsyncLoadingWrapper({ status, children }) {
  switch (status) {
    case "pending":
      return (
        <Box
          minHeight="100px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Loading />
        </Box>
      );
    case "success":
        return <>{children}</>
    
    case "error":
        return <p>Error with network request, please try again</p>

    default:
      return <p>Error, unexpected state</p>
  }
}
