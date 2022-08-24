import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../RecipeCard';
import './index.css';

export default function RecipesLibrary({ recipes }) {
  return (
    <div className="recipes-lib">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={ index }
          details={ recipe }
          index={ index }
        />
      ))}
    </div>
  );
}

RecipesLibrary.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
