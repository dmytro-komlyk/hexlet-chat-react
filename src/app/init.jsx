// @ts-check
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider } from '@rollbar/react';

import App from './App.jsx';

import store from './slices/index.js';
import i18n from './contexts/i18nContext.jsx';

import { AuthProvider } from './contexts/authContext.jsx';
import { SocketProvider } from './contexts/socketContext.jsx';

const rollbarConfig = {
  accessToken: 'cfb004f2884d42d7aae180b7d690074b',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const init = async () => (
  <RollbarProvider config={rollbarConfig}>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SocketProvider>
      </I18nextProvider>
    </Provider>
  </RollbarProvider>
);

export default init;
