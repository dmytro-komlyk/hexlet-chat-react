/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { deleteChannel } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChannel, (state, action) => {
      const channelId = action.payload;
      const allEntities = Object.values(state.entities);
      const restEntities = allEntities.filter((e) => e.id !== channelId);
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const { addMessage, fetchMessages } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
