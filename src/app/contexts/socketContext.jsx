// @ts-check
import React, { createContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { addMessage } from '../slices/messagesSlice.js';
import {
  addChannel, deleteChannel, сhangeNameChannel,
} from '../slices/channelsSlice.js';

const SocketContext = createContext({});

function SocketProvider({ children }) {
  const socket = io();
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => dispatch(addMessage(message)));
  socket.on('newChannel', (channel) => dispatch(addChannel(channel)));
  socket.on('removeChannel', ({ id }) => dispatch(deleteChannel(id)));
  socket.on('renameChannel', ({ id, name }) => dispatch(сhangeNameChannel({ id, changes: { name } })));

  const newMessage = (msg, cb) => socket.emit('newMessage', msg, cb);
  const newChannel = (channel, cb) => socket.emit('newChannel', channel, cb);
  const removeChannel = (id, cb) => socket.emit('removeChannel', id, cb);
  const renameChannel = (data, cb) => socket.emit('renameChannel', data, cb);

  const valueProvider = useMemo(() => (
    {
      newMessage, newChannel, removeChannel, renameChannel,
    }
  ), [newMessage, newChannel, removeChannel, renameChannel]);

  return (
    <SocketContext.Provider value={valueProvider}>
      { children }
    </SocketContext.Provider>
  );
}

export { SocketProvider };
export default SocketContext;
