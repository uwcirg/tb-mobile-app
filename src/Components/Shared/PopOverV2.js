import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";
import TopPageLabel from "./TopPageLabel";

const useStyles = makeStyles({
  modalContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
  },
  scrollableArea: {
    flexGrow: 1,
    overflow: "scroll",
  },
});

const PopOverV2 = ({
  open,
  children,
  disableTopBar,
  topBarTitle,
  handleExit,
}) => {
  const classes = useStyles();

  return (
    <Modal BackdropProps={{ style: { backgroundColor: "white" } }} open={open}>
      <div className={classes.modalContainer}>
        {!disableTopBar && (
          <TopPageLabel sticky title={topBarTitle} handleExit={handleExit} />
        )}
        <div className={classes.scrollableArea}>{children}</div>
      </div>
    </Modal>
  );
};

export default PopOverV2;
