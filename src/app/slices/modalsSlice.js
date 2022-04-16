/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const modalsAdapter = createEntityAdapter();
const initialState = modalsAdapter.getInitialState({ type: null, show: false, item: null });

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      const { type, item } = payload;
      state.type = type;
      state.show = true;
      state.item = item || null;
    },
    hideModal: (state) => {
      state.type = null;
      state.show = false;
      state.item = null;
    },
  },
});

export const { showModal, hideModal } = modalsSlice.actions;
export default modalsSlice.reducer;
