import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, removeFromHistory } from '../store/userSlice';
import { RootState } from '../store/store';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.searchHistory);

  const handleRemoveUser = (id: string) => {
    dispatch(removeFromHistory(id));
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <span>{user.name}</span>
          <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
          <button onClick={() => dispatch(setCurrentUser(user))}>
            Select User
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserList; 