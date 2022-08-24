import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

import './RecipeCard.css';

export default function RecipeCard({ details, index }) {
  const { page } = useContext(AppContext);
  if (page === 'Comidas') {
    return (
      <Link to={ `/comidas/${details.idMeal}` }>
        <div data-testid={ `${index}-recipe-card` } className="card">
          <img
            data-testid={ `${index}-card-img` }
            src={ details.strMealThumb }
            alt={ details.strMeal }
          />
          <h3 data-testid={ `${index}-card-name` }>{details.strMeal}</h3>
        </div>
      </Link>
    );
  }
  if (page === 'Bebidas') {
    return (
      <Link to={ `/bebidas/${details.idDrink}` }>
        <div data-testid={ `${index}-recipe-card` } className="card">
          <img
            data-testid={ `${index}-card-img` }
            src={ details.strDrinkThumb }
            alt={ details.strDrink }
          />
          <h3 data-testid={ `${index}-card-name` }>{details.strDrink}</h3>
        </div>
      </Link>
    );
  }
}

RecipeCard.propTypes = {
  details: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};
