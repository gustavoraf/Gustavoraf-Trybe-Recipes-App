import React from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

import './Profile.css';

export default function Profile() {
  const history = useHistory();
  const DONE_PATH = '/receitas-feitas';
  const FAVORITES_PATH = '/receitas-favoritas';
  const LOGIN_PATH = '/';

  // Modelo de função de redirecionamento de:
  // https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
  const handleClick = (path) => {
    if (path === LOGIN_PATH) {
      localStorage.clear();
      history.push(path);
    }
    history.push(path);
  };

  return (
    <div>
      <Header searchRender={ false } titlePage="Perfil" />
      {localStorage.getItem('user') ? (
        <div className="main-profile">
          <h3 data-testid="profile-email">
            {JSON.parse(localStorage.getItem('user')).email}
          </h3>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => handleClick(DONE_PATH) }
          >
            Receitas Feitas

          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => handleClick(FAVORITES_PATH) }
          >
            Receitas Favoritas

          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => handleClick(LOGIN_PATH) }
          >
            Sair

          </button>
        </div>
      ) : (
        <div className="main-profile" />
      )}
      <Footer />
    </div>
  );
}
