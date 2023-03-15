import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    inlineSize: "100%",
  },
});

const StickyTopBar = (props) => {
  const classes = useStyles();
  return <Box {...props} className={`${props.className} ${classes.root}`} />;
};

export default StickyTopBar;
