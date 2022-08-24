import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import './index.css';

export default function IngredientCard({ details, index }) {
  const { setFilteredByIngredient, page,
    setFoodIngredientSituation, setDrinkIngredientSituation } = useContext(AppContext);

  async function handleClick() {
    if (page === 'Comidas') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${details.strIngredient}`).then((res) => res.json());
      setFilteredByIngredient(response.meals);
      setFoodIngredientSituation(true);
    }
    if (page === 'Bebidas') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${details.strIngredient1}`).then((res) => res.json());
      setFilteredByIngredient(response.drinks);
      setDrinkIngredientSituation(true);
    }
  }

  if (page === 'Comidas') {
    return (
      <div className="ingredient-card" data-testid={ `${index}-ingredient-card` }>
        <Link
          onClick={ handleClick }
          to="/comidas"
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${details.strIngredient}-Small.png` }
            alt={ details.strIngredient }
          />
          <h3 data-testid={ `${index}-card-name` }>{details.strIngredient}</h3>
        </Link>
      </div>
    );
  }
  if (page === 'Bebidas') {
    return (
      <Link
        onClick={ handleClick }
        to="/bebidas"
      >
        <div className="ingredient-card" data-testid={ `${index}-ingredient-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${details.strIngredient1}-Small.png` }
            alt={ details.strIngredient1 }
          />
          <h3 data-testid={ `${index}-card-name` }>{details.strIngredient1}</h3>
        </div>
      </Link>
    );
  }
}

IngredientCard.propTypes = {
  route: PropTypes.string.isRequired,
  details: PropTypes.objectOf(PropTypes.string).isRequired,
};
