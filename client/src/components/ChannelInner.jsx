import React, { useState } from 'react';
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';

import { ChannelInfo } from '../assets/icon/ChannelInfo';

export const GiphyContext = React.createContext({});


export default function ChannelInner({ setIsEditing}) {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {
    let updateMessage = {
      attachemnts: message.attachemnts,
      metionned_users: message.metionned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if(giphyState) {
      updateMessage = { ...updateMessage, text: `/giphy ${message.text}` };
    }

    if(sendMessage) {
      sendMessage(updateMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = ({ setIsEditing }) => {
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();

  const MessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    const additionalMembers = members.length - 3;

    if(channel.type === 'messaging') {
      return (
        <div className="team-channel__name-wrapper">
          {members.map(({ user }, i) => (
            <div key={i} className="team-channel-header__name-multi">
              <Avatar image={user.image} name={user.fullName || user.id} size={32} />
              <p className="team-channel-header__name user">
                {user.fullName || user.id}
              </p>
            </div>
          ))}
          {additionalMembers > 0 && <p className="team-channel-header__name user"> and {additionalMembers} more </p>}
        </div>
      );
    }

    return (
      <div className="team-channel-header__channel-wrapper">
        <p className="team-channel-header__name">
          # {channel.data.name}
        </p>
        <span style={{ display: 'flex'}} onClick={() => setIsEditing(true)}>
          <ChannelInfo />
        </span>
      </div>
    );
  };

  const getWatcherText = (watchers) => {
    if (!watchers) return 'No users Online';	
    if (watchers === 1) return '1 user Online';	
    return `${watchers} users Online`;	
  };

  return (
    <div className="team-channel-header__container">
      <MessagingHeader />
      <div className="team-channel-header__right">
        <p className="team-channel-header__right-text">{getWatcherText(watcher_count)}</p>
      </div>
    </div>
  )
};