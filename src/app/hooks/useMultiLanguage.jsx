// @ts-check

import { useContext } from 'react';

import I18nContext from '../contexts/i18nContext.jsx';

const useMultiLanguage = () => useContext(I18nContext);

export default useMultiLanguage;
