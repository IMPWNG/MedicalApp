import React, { useState, useEffect } from "react";
import { Avatar, useChatContext } from "stream-chat-react";

import { InviteIcon } from "../assets/icon/InviteIcon";

const ListContainter = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ user }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div className="user-item__wrapper">
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="user-item__name">{user.fullName || user.id}</p>
        {selected ? (
          <InviteIcon />
        ) : (
          <div className="user-item__invite-empty" />
        )}
      </div>
    </div>
  );
};

export default function UserList() {
  const { client } = useChatContext;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userId } },
          { id: 1 },
          { limit: 8 }
        );
        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  return (
    <ListContainter>
      <div>
        {loading ? (
          <div className="user-list__message">Loading users...</div>
        ) : (
          users?.map(({ user} , i) => (
            <UserItem index={i} user={user} key={user.id} />
          ))
        )}
      </div>
    </ListContainter>
  );
}
