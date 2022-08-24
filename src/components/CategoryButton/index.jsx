import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';

export default function CategoryButton({ category }) {
  const { currentFoodFilter, setCurrentFoodFilter,
    currentDrinkFilter, setCurrentDrinkFilter, page,
    setFoodIngredientSituation, setDrinkIngredientSituation } = useContext(AppContext);

  function handleClick(categoryName) {
    if (page === 'Comidas') {
      setFoodIngredientSituation(false);
      if (currentFoodFilter === categoryName) {
        setCurrentFoodFilter('');
      } if (currentFoodFilter !== categoryName) {
        setCurrentFoodFilter(categoryName);
      }
    }
    if (page === 'Bebidas') {
      setDrinkIngredientSituation(false);
      if (currentDrinkFilter === categoryName) {
        setCurrentDrinkFilter('');
      } if (currentDrinkFilter !== categoryName) {
        setCurrentDrinkFilter(categoryName);
      }
    }
  }

  return (
    <button
      type="button"
      data-testid={ `${category.strCategory}-category-filter` }
      key={ category.strCategory }
      onClick={ () => handleClick(category.strCategory) }
    >
      {category.strCategory}
    </button>
  );
}

CategoryButton.propTypes = {
  category: PropTypes.objectOf(PropTypes.string).isRequired,
};
