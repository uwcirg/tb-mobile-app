import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../Basics/UseStores";
import { observer } from "mobx-react";
import ChannelNavigation from "./ChannelNavigation";
import Channel from "./Channel";
import Div100vh from "react-div-100vh";
import OverTopBar from "../Patient/Navigation/OverTopBar";

const useStyles = makeStyles({
  navContainer: {
    width: "100%",
  },
  channel: {
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: "15",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  placeHolder: {
    height: "60px",
  },
});

const MobileMessaging = observer(() => {
  const classes = useStyles();
  const { messagingStore, practitionerStore, uiStore } = useStores();

  // useEffect(() => {
  //     if (uiStore.pathNumber && uiStore.pathNumber > 0) {
  //         messagingStore.selectedChannel.id = uiStore.pathNumber;
  //         messagingStore.updateSelectedChannel();
  //         messagingStore.getInitalMessages()
  //     }

  // }, [uiStore.pathNumber])

  return (
    <div className={classes.navContainer}>
      {messagingStore.selectedChannel &&
      messagingStore.selectedChannel.id !== 0 ? (
        <Div100vh className={classes.channel}>
          <OverTopBar
            title={
              messagingStore.coordinatorSelectedChannel &&
              messagingStore.coordinatorSelectedChannel.title
            }
            handleBack={messagingStore.clearSelection}
            id={
              messagingStore.coordinatorSelectedChannel &&
              messagingStore.channels.find(
                (channel) =>
                  channel.id === messagingStore.coordinatorSelectedChannel.id
              ).userId
            }
          />
          <div className={classes.placeHolder} />
          <Channel
            isCoordinator
            isPrivate={
              messagingStore.coordinatorSelectedChannel &&
              messagingStore.coordinatorSelectedChannel.isPrivate
            }
            userID={practitionerStore.userID}
            selectedChannel={messagingStore.selectedChannel}
          />
        </Div100vh>
      ) : (
        <ChannelNavigation />
      )}
    </div>
  );
});

export default MobileMessaging;
