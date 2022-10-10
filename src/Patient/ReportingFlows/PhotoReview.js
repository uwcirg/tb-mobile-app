import React from "react";
import { Button } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Colors from "../../Basics/Colors";

export default function PhotoReview({
  photoString,
  handleRetake,
  translatedString,
}) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.strip}>
        <img src={photoString} alt="test strip" />{" "}
      </div>
      <Button
        onClick={handleRetake}
        className={classes.refresh}
        style={{ color: `${Colors.warningRed}` }}
      >
        <Refresh />
        <Box width=".5em" />
        {translatedString.toLowerCase()}
      </Button>
    </>
  );
}

const useStyles = makeStyles({
  strip: {
    height: "50vh",
    width: "100%",
    "& >img": {
      objectFit: "contain",
      height: "100%",
      width: "100%",
    },
    margin: "auto",
    textAlign: "center",
  },
});
