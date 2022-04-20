// @ts-check
import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider } from '@rollbar/react';

import App from './App.jsx';

import store from './slices/index.js';

import { I18nProvider } from './contexts/i18nContext.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import { SocketProvider } from './contexts/socketContext.jsx';

const init = async () => {
  const rollbarConfig = {
    accessToken: 'cfb004f2884d42d7aae180b7d690074b',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <Provider store={store}>
        <SocketProvider>
          <I18nProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </I18nProvider>
        </SocketProvider>
      </Provider>
    </RollbarProvider>
  );
};

export default init;
