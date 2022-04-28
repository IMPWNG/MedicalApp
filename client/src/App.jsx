import React from "react";
import { StreamChat } from "stream-chat";
import { ChannelList, Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelContainer, ChannelListContainer, Auth } from "./components";

import "./App.css";	

const cookies = new Cookies;

const apiKey = "v8ae58c3u7zf";
const authToken = cookies.get("token");
const client = StreamChat.getInstance(apiKey);

if(authToken) {
  client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
  }, authToken);
}

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

