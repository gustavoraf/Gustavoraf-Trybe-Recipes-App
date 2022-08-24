import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import './TabBarButtons.css';

export default function TabBarButtons({ filter }) {
  const SELECTED = 'selected-button';
  const [selectAll, setSelectAll] = useState(false);
  const [selectFood, setSelectFood] = useState(false);
  const [selectDrinks, setSelectDrinks] = useState(false);

  useEffect(() => {
    setSelectAll(true);
  }, []);

  function handleClick({ target }) {
    switch (target.name) {
    case 'food':
      setSelectFood(true);
      setSelectDrinks(false);
      setSelectAll(false);
      filter('comida');
      break;
    case 'drinks':
      setSelectDrinks(true);
      setSelectFood(false);
      setSelectAll(false);
      filter('bebida');
      break;
    default:
      setSelectAll(true);
      setSelectDrinks(false);
      setSelectFood(false);
      filter('tudo');
      break;
    }
  }
  return (
    <div className="tab-buttons">
      <button
        name="all"
        type="button"
        className={ selectAll ? SELECTED : '' }
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
      >
        All
      </button>
      <button
        name="food"
        type="button"
        className={ selectFood ? SELECTED : '' }
        data-testid="filter-by-food-btn"
        onClick={ handleClick }
      >
        Food
      </button>
      <button
        name="drinks"
        type="button"
        className={ selectDrinks ? SELECTED : '' }
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
      >
        Drinks
      </button>
    </div>
  );
}

TabBarButtons.propTypes = {
  filter: PropTypes.func.isRequired,
}.isRequired;
