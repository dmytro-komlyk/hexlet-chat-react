// @ts-check
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import routes from '../../routes.js';

import { fetchChannels, setCurrentChannel } from '../slices/channelsSlice.js';
import { fetchMessages } from '../slices/messagesSlice.js';

import Channels from './chat/Channels.jsx';
import Messages from './chat/Mesages.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

function Chat() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      const { channels, messages, currentChannelId } = response.data;
      dispatch(fetchChannels(channels));
      dispatch(fetchMessages(messages));
      dispatch(setCurrentChannel(currentChannelId));
    };
    fetchData();
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
}

export default Chat;
