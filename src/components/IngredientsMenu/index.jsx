import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import Header from '../Header';
import fetchAPI from '../../services';
import IngredientsLibrary from '../IngredientsLibrary';
import AppContext from '../../context/AppContext';

const ELEVEN = 11;
function IngredientsMenu({ route }) {
  const { setPage } = useContext(AppContext);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    setPage(route);
    async function getMealsIngredients() {
      const response = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      setIngredients(response.meals);
    }
    async function getDrinksIngredients() {
      const response = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      setIngredients(response.drinks);
    }
    if (route === 'Comidas') {
      getMealsIngredients();
    } if (route === 'Bebidas') {
      getDrinksIngredients();
    }
  }, [route, setPage]);

  if (ingredients.length > 0) {
    const auxIngredients = [...ingredients];
    const firstIngredients = auxIngredients.filter((_recipe, index) => index <= ELEVEN);
    return (
      <div>
        <Header searchRender={ false } titlePage="Explorar Ingredientes" />
        <IngredientsLibrary ingredients={ firstIngredients } />
        <Footer />
      </div>
    );
  } return (
    <div>
      <Header searchRender={ false } titlePage="Explorar Ingredientes" />
      <h3>Buscando ingredientes</h3>
      <Footer />
    </div>
  );
}

IngredientsMenu.propTypes = {
  route: PropTypes.string.isRequired,
};

export default IngredientsMenu;
