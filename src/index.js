// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import init from './app/init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = async () => {
  const socket = io();
  const vDom = await init(socket);
  ReactDOM.render(vDom, document.getElementById('chat'));
};

app();
