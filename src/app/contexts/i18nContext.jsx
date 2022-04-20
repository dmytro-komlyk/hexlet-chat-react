// @ts-check
import React, { createContext, useMemo } from 'react';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import profanity from 'leo-profanity';

import resources from '../locales/index.js';

const I18nContext = createContext({});

function I18nProvider({ children }) {
  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      fallbackLng: 'ru',
      // debug: true,
      resources,
    });

  const filter = profanity.add(profanity.getDictionary('ru'));
  filter.add(profanity.getDictionary('en'));

  const isProfanity = (msg) => filter.check(msg);
  const clean = (msg) => filter.clean(msg);

  const valueProvider = useMemo(() => (
    { isProfanity, clean }
  ), [isProfanity, clean]);

  return (
    <I18nContext.Provider value={valueProvider}>
      { children }
    </I18nContext.Provider>
  );
}

export { I18nProvider };
export default I18nContext;
