import React from 'react';
import { Link } from 'react-router-dom';
import noMatchImage from '../../assets/404.png';

function NoMatchPage() {
  return (
    <div className="text-center">
      <img alt="Страница не найдена" сlassName="img-fluid" src={noMatchImage} width={500} height={400} />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        Но вы можете перейти
        <Link to="/">на главную страницу</Link>
      </p>
    </div>
  );
}

export default NoMatchPage;
