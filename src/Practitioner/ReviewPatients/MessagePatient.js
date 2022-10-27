import React, { useContext } from "react";
import PractitionerContext from "../PractitionerContext";
import MessagingPopover from "./MessagingPopover";
import useQuery from "../../Hooks/useQuery";

const MessagePatient = () => {
  const { value: patients } = useContext(PractitionerContext).patientIssues;

  const channelId = useQuery().get("onMessagingChannelId");

  const channelName = patients?.find((each) => {
    return each.channelId === parseInt(channelId);
  })?.fullName;

  return (
    <MessagingPopover
      channelName={channelName}
      channelId={channelId}
      open={!!channelId}
    />
  );
};

export default MessagePatient;
