import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import TabBarButtons from '../../components/TabBarButtons';

// import './DoneRecipes.css';
import CardRenderRecipes from '../../components/CardRenderRecipes';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copyDoneRecipes, setCopyDoneRecipes] = useState([]);

  useEffect(() => {
    const getDoneFromStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(getDoneFromStorage);
    setCopyDoneRecipes(getDoneFromStorage);
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
      <Header searchRender={ false } titlePage="Receitas Feitas" />
      { doneRecipes ? (
        <>
          <TabBarButtons filter={ toFilter } />
          <CardRenderRecipes recipes={ doneRecipes } favoriteButton={ false } />
        </>
      ) : '' }
    </div>
  );
}
