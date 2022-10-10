import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../Basics/UseStores";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import Colors from "../Basics/Colors";
import Message from "./Message";
import { DateTime } from "luxon";

const useStyles = makeStyles({
  dateSeperator: {
    width: "100%",
    textAlign: "center",
    fontSize: ".75em !important",
    color: Colors.textGray,
  },
  newLoadingPlaceholder: {
    width: "100%",
    height: "2px",
    margin: "2px 0",
    borderBottom: "dashed 1px lightgray",
  },
});

const MessagesList = observer((props) => {
  const { messagingStore } = useStores();
  const [date, setDate] = useState("");

  return (
    <>
      {messagingStore.selectedChannelMessages.map((message, index) => {
        return (
          <WrappedMessage
            date={date}
            setDate={setDate}
            isCoordinator={props.isCoordinator}
            isPrivate={props.isPrivate}
            userID={props.userID}
            message={message}
            index={index}
            newestMessageRef={props.newestMessageRef}
          />
        );
      })}
    </>
  );
});

const WrappedMessage = observer(
  ({
    message,
    index,
    newestMessageRef,
    userID,
    isCoordinator,
    isPrivate,
    date,
    setDate,
  }) => {
    const classes = useStyles();
    const { messagingStore } = useStores();
    const { t } = useTranslation("translation");

    let isNewDate = false;

    const isUser = userID === message.userId;
    const previousMessage =
      index > 0 && messagingStore.selectedChannelMessages[index - 1];
    const nextMessage =
      messagingStore.selectedChannelMessages.length > index + 1 &&
      messagingStore.selectedChannelMessages[index + 1];

    const isMiddle =
      previousMessage &&
      previousMessage.userId === message.userId &&
      DateTime.fromISO(previousMessage.createdAt).toISODate() ===
        DateTime.fromISO(message.createdAt).toISODate() &&
      nextMessage &&
      nextMessage.userId === message.userId &&
      DateTime.fromISO(nextMessage.createdAt).toISODate() ===
        DateTime.fromISO(message.createdAt).toISODate();

    if (DateTime.fromISO(message.createdAt).toISODate() !== date) {
      setDate(DateTime.fromISO(message.createdAt).toISODate());
      isNewDate = true;
    }
    return (
      <React.Fragment key={`message-fragment-${index}`}>
        {message.id === messagingStore.selectedChannel.firstMessageId && (
          <p key={`messages-begining`} className={classes.dateSeperator}>
            {t("messaging.begining")}
          </p>
        )}
        {isNewDate && (
          <h2 key={`date-${index}`} className={classes.dateSeperator}>
            {DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)}
          </h2>
        )}
        <Message
          isLast={index === messagingStore.selectedChannelMessages.length - 1}
          hide={() => {
            messagingStore.setMessageHidden(message.id, true);
          }}
          unhide={() => {
            messagingStore.setMessageHidden(message.id, false);
          }}
          isCoordinator={isCoordinator}
          isPrivate={isPrivate}
          isMiddle={isMiddle}
          key={`message-${index}`}
          message={message}
          isUser={isUser}
        />
        {message.id === messagingStore.selectedChannel.firstNewMessageId && (
          <div
            className={classes.newLoadingPlaceholder}
            ref={newestMessageRef}
          ></div>
        )}
      </React.Fragment>
    );
  }
);

export { WrappedMessage, MessagesList };
