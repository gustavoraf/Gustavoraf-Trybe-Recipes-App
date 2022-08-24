import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import TabBarButtons from '../../components/TabBarButtons';

import CardRenderRecipes from '../../components/CardRenderRecipes';

export default function FavoriteRecipes() {
  // objeto principal
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copyDoneRecipes, setCopyDoneRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem) {
      const getItems = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setDoneRecipes(getItems);
      setCopyDoneRecipes(getItems);
      console.log(getItems);
    }
  }, []);

  function toFilter(filterItems) {
    let filteredRecipes;
    switch (filterItems) {
    case 'comida':
      filteredRecipes = copyDoneRecipes.filter((item) => item.type === filterItems);
      break;
    case 'bebida':
      filteredRecipes = copyDoneRecipes.filter((item) => item.type === filterItems);
      break;
    default:
      filteredRecipes = copyDoneRecipes;
      break;
    }
    setDoneRecipes(filteredRecipes);
  }

  return (
    <div>
      <Header searchRender={ false } titlePage="Receitas Favoritas" />
      { doneRecipes ? (
        <>
          <TabBarButtons filter={ toFilter } />
          <CardRenderRecipes recipes={ doneRecipes } favoriteButton />
        </>
      ) : '' }
    </div>
  );
}
