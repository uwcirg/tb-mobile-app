import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ButtonBase from "@material-ui/core/ButtonBase";
import AspectRatioIcon from "@material-ui/icons/ZoomOutMap";
import useToggle from "../Hooks/useToggle";
import Colors from "../Basics/Colors";

const useStyles = makeStyles({
  expandIcon: {
    fontSize: "1.25em",
    color: "white",
  },
  noPhoto: {
    alignSelf: "center",
    justifySelf: "center",
    color: Colors.warningRed,
    fontSize: "3em",
  },
  skipped: {
    display: "flex",
    backgroundColor: Colors.lightgray,
    minHeight: "75px",
    width: "75px",
    borderRadius: "4px",
    flexShrink: 0,
  },
  photo: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: ".5em",
    backgroundColor: Colors.lightgray,
    height: "75px",
    width: "75px",
    backgroundSize: "cover",
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat",
    border: "none",
    borderRadius: "4px",
    flexShrink: 0,
  },
});

const ExpandablePhoto = ({ url }) => {
  const classes = useStyles();
  const [showFull, toggleShowFull] = useToggle(false);

  return (
    <>
      <Dialog onClose={toggleShowFull} open={showFull}>
        <img src={url} />
      </Dialog>
      {url ? (
        <ButtonBase
          onClick={toggleShowFull}
          style={{ backgroundImage: `url(${url})` }}
          className={classes.photo}
        >
          <AspectRatioIcon className={classes.expandIcon} />
        </ButtonBase>
      ) : (
        <ButtonBase disabled className={classes.skipped}>
          <HighlightOffIcon className={classes.noPhoto} />
        </ButtonBase>
      )}
    </>
  );
};

export default ExpandablePhoto;
