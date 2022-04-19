// @ts-check
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

import noMatchImage from '../assets/404.png';

function NoMatch() {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image alt={t('img.noMatch')} src={noMatchImage} width={500} height={400} fluid />
      <h1 className="h4 text-muted">{t('noMatch.title')}</h1>
      <p className="text-muted">
        {t('noMatch.text')}
        <Link to="/">{t('noMatch.link')}</Link>
      </p>
    </div>
  );
}

export default NoMatch;
