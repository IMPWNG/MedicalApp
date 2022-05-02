import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";

import { CloseCreateChannel } from "../assets/icon/CloseCreateChannel";

// import { userList } from './';
// import { CloseCreateChannel } from './CloseCreateChannel';

const ChannelNameImput = ({ channelName = "", setChannelName }) => {
  const handleChange = (e) => {
    e.preventDefault();

    setChannelName(e.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name"
      />
      <p>Add Members</p>
    </div>
  );
};

export default function CreateChannel({ createType, setIsCreating }) {
  const [channelName, setChannelName] = useState("");

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>{CreateChannel === "team" ? "Create a new Channel" : "Send a DM"}</p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === "team"  && <ChannelNameImput channelName={channelName} setChannelName ={setChannelName} />}
    </div>
  );
}
