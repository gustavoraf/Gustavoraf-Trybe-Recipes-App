import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './header.css';
import perfilIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import AppContext from '../../context/AppContext';

const Header = ({ searchRender, titlePage }) => {
  const { setSearching, searching } = useContext(AppContext);
  function title(mainTitlePage) {
    return (
      <div className="title-header">
        <p data-testid="page-title">{mainTitlePage}</p>
      </div>
    );
  }
  function perfil() {
    return (
      <div className="perfil-icon">
        <Link to="/perfil">
          <img
            src={ perfilIcon }
            alt="Perfil Icon"
            data-testid="profile-top-btn"
          />
        </Link>
      </div>
    );
  }

  function search(render) {
    return render ? (
      <div className="icon-Search">
        <button type="button" onClick={ () => setSearching(!searching) }>
          <img
            src={ searchIcon }
            alt="Search Icon"
            data-testid="search-top-btn"
          />
        </button>
      </div>
    ) : (
      <div className="icon-Search">{}</div>
    );
  }

  return (
    <div className="main-header">
      {perfil()}
      {title(titlePage)}
      {search(searchRender)}
    </div>
  );
};

Header.propTypes = {
  searchRender: PropTypes.bool,
  titlePage: PropTypes.string,
}.isRequired;

export default Header;
