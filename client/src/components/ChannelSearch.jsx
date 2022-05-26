import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";

import { SearchIcon } from "../assets/icon/SearchIcon";

export default function ChannelSearch() {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if(!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query]);

  // Async because we have to wait for the channel list to be fetched
  const getChannels = async (text) => {
    try {
      const channelResponse = client.queryChannels({
        type: 'team',
        name: { autocomplete: text },
        members: { $in: [client.userID]}
      });
      const userResponse = client.queryUsers({
        id: { $in: [client.userID] },
        name : { autocomplete: text }
      });
      
      const [channels, { user }] = await Promise.all([channelResponse, userResponse]);

      if(channels.length) setTeamChannels(channels);
      if(user.length) setDirectChannels(user);
    } catch (error) {
      setQuery("");
    }
  };

  const onSearch = (e) => {
    // If the event does not get explicitly handled, its default action should not be taken as it normally would be.
    e.preventDefault();

    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          className="channel-search__input__text"
          type="text"
          placeholder="Search"
          value={query}
          onChange={onSearch}
        />
      </div>
    </div>
  );
}
