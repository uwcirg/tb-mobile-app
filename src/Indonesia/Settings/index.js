import React from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles({
  pageItem: {
    borderRadius: "5px",
    flexBasis: "45%",
    padding: "1em",
    boxSizing: "border-box",
    backgroundColor: "lightgray",
    minHeight: "150px",
  },
  container: {
    padding: "1em",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    rowGap: "1em",
    columnGap: "1em",
  },
});

const IndonesiaSettingsPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <PageItem text="Report" />
      <PageItem text="Report" />
      <PageItem text="Report" />
      <PageItem text="Report" />
      <PageItem text="Report" />
    </div>
  );
};

const PageItem = ({ text }) => {
  const classes = useStyles();
  return (
    <Box className={classes.pageItem}>
      <Typography>{text}</Typography>
    </Box>
  );
};

export default IndonesiaSettingsPage;
