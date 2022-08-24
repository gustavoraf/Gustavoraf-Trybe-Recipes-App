import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';

const Footer = () => {
  const renderIcon = (link, datatestid, icon, alt) => (
    <Link to={ link }>
      <button
        className="btn-footer"
        type="button"
      >
        <img
          src={ icon }
          data-testid={ datatestid }
          alt={ alt }
        />
      </button>
    </Link>
  );

  return (
    <div data-testid="footer" className="main-footer">
      { renderIcon('/bebidas', 'drinks-bottom-btn', drinkIcon, 'ícone para bebida') }
      { renderIcon('/explorar', 'explore-bottom-btn', exploreIcon, 'ícone para explore') }
      { renderIcon('/comidas', 'food-bottom-btn', mealIcon, 'ícone de comida') }
    </div>
  );
};

export default Footer;
