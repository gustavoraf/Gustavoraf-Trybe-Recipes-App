import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [login, setLogin] = useState({
    user: '',
    password: '',
  });
  const [currentFoodFilter, setCurrentFoodFilter] = useState('');
  const [currentDrinkFilter, setCurrentDrinkFilter] = useState('');
  const [page, setPage] = useState('Comidas');
  const [searching, setSearching] = useState(false);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [filteredByIngredient, setFilteredByIngredient] = useState([]);
  const [foodIngredientSituation, setFoodIngredientSituation] = useState(false);
  const [drinkIngredientSituation, setDrinkIngredientSituation] = useState(false);

  const contextValue = {
    login,
    setLogin,
    currentFoodFilter,
    setCurrentFoodFilter,
    currentDrinkFilter,
    setCurrentDrinkFilter,
    page,
    setPage,
    searching,
    setSearching,
    meals,
    setMeals,
    drinks,
    setDrinks,
    filteredByIngredient,
    setFilteredByIngredient,
    foodIngredientSituation,
    setFoodIngredientSituation,
    drinkIngredientSituation,
    setDrinkIngredientSituation,
  };

  return (
    <AppContext.Provider value={ contextValue }>{children}</AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
