import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import SectionTitle from "./SectionTitle";
import SectionLabel from "../../../Components/SectionLabel";

const useStyles = makeStyles({
  card: {
    "&:not(:first-child)": {
      marginTop: ".5em",
    },
  },
});

const Card = ({ children, title }) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.card}
      padding="1em"
      borderRadius="4px"
      bgcolor={"white"}
    >
      {title && (
        <>
          <SectionLabel>{title}</SectionLabel>
          <Box height="8px" />
        </>
      )}
      {children}
    </Box>
  );
};

export default Card;
