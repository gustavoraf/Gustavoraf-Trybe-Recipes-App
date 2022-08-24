import React from 'react';
import PropTypes from 'prop-types';
import IngredientCard from '../IngredientCard';
import './index.css';

function IngredientsLibrary({ ingredients }) {
  return (
    <div className="ingredients-lib">
      {ingredients.map((ingredient, index) => (
        <IngredientCard
          key={ index }
          details={ ingredient }
          index={ index }
        />
      ))}
    </div>
  );
}

IngredientsLibrary.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IngredientsLibrary;
