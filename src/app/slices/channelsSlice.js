/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ selectedChannel: 1 });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    setCurrentChannel: (state, { payload }) => {
      state.selectedChannel = payload;
    },
    deleteChannel: (state, action) => {
      if (state.selectedChannel === action.payload) {
        state.selectedChannel = 1;
      }
      return channelsAdapter.removeOne(state, action);
    },
    сhangeNameChannel: channelsAdapter.updateOne,
  },
});

export const {
  fetchChannels, addChannel, setCurrentChannel, deleteChannel, сhangeNameChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
