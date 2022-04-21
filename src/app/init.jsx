// @ts-check
import React from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider } from '@rollbar/react';
import filter from 'leo-profanity';

import resources from './locales/index.js';

import store from './slices/index.js';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, deleteChannel, сhangeNameChannel } from './slices/channelsSlice.js';

import { AuthProvider } from './contexts/auth.jsx';
import SocketContext from './contexts/socket.jsx';

import App from './App.jsx';

const rollbarConfig = {
  accessToken: 'cfb004f2884d42d7aae180b7d690074b',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const init = async (socket) => {
  await i18n
    .init({
      lng: 'ru',
      fallbackLng: 'ru',
      debug: true,
      resources,
    });

  filter.loadDictionary();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  socket.on('newMessage', (message) => store.dispatch(addMessage(message)));
  socket.on('newChannel', (channel) => store.dispatch(addChannel(channel)));
  socket.on('removeChannel', ({ id }) => store.dispatch(deleteChannel(id)));
  socket.on('renameChannel', ({ id, name }) => store.dispatch(сhangeNameChannel({ id, changes: { name } })));

  return (
    <RollbarProvider config={rollbarConfig}>
      <SocketContext.Provider value={socket}>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </Provider>
        </I18nextProvider>
      </SocketContext.Provider>
    </RollbarProvider>
  );
};

export default init;
