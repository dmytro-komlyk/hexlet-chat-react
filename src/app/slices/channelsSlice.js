/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ selectedChannel: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    setCurrentChannel: (state, { payload }) => {
      state.selectedChannel = payload;
    },
    deleteChannel: channelsAdapter.removeOne,
    сhangeNameChannel: channelsAdapter.updateOne,
  },
});

export const {
  fetchChannels, addChannel, setCurrentChannel, deleteChannel, сhangeNameChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
