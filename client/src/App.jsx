import React from "react";
import { StreamChat } from "stream-chat";
import { ChannelList, Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelContainer, ChannelListContainer, Auth } from "./components";

import "./App.css";	

const apiKey = "v8ae58c3u7zf";
const client = StreamChat.getInstance(apiKey);

const authToken = false;

export default function App() {

  if(!authToken) return <Auth client={client} />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
          <ChannelListContainer /> 
          <ChannelContainer />
      </Chat>
    </div>
  );
}

