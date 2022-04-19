// @ts-check
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../locales/index.js';

const i18n = createInstance({
  lng: 'ru',
  fallbackLng: 'ru',
  debug: true,
  resources,
});

i18n.use(initReactI18next).init();

export default i18n;
