// @ts-check
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import App from './App.jsx';

import store from './slices/index.js';
import i18n from './contexts/i18nContext.jsx';

import { AuthProvider } from './contexts/authContext.jsx';
import { SocketProvider } from './contexts/socketContext.jsx';

const init = async () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <SocketProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SocketProvider>
    </I18nextProvider>
  </Provider>
);

export default init;
