// @ts-check
import React from 'react';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './slices/index.js';

import { AuthProvider } from './contexts/authContext.jsx';
import { SocketProvider } from './contexts/socketContext.jsx';

const init = async () => (
  <Provider store={store}>
    <SocketProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SocketProvider>
  </Provider>
);

export default init;
