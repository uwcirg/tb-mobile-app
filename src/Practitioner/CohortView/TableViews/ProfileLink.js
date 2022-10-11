import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../../../Basics/Colors";
import useStores from "../../../Basics/UseStores";

const useStyles = makeStyles({
  profileLink: {
    "&, &:visited": {
      color: Colors.buttonBlue,
      textDecoration: "none",
    },
  },
});

const ProfileLink = ({ fullName, id }) => {
  const classes = useStyles();
  const { push } = useStores().routingStore;
  //Handle Patient Link
  const handlePatientClick = (event) => {
    event.preventDefault();
    push(`/patients/${id}`);
  };
  return (
    <a
      className={classes.profileLink}
      href={`/patients/${id}`}
      onClick={handlePatientClick}
    >
      {fullName}
    </a>
  );
};

export default ProfileLink;
