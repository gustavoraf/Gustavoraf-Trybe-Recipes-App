import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import CategoriesFilterBar from '../CategoriesFilterBar';
import RecipesLibrary from '../RecipesLibrary';
import AppContext from '../../context/AppContext';
import Footer from '../Footer';
import Header from '../Header';
import SearchBar from '../SearchBar';

const ELEVEN = 11;
const FOUR = 4;
export default function RecipesMenu({ route, array, arrayCategories }) {
  const { setPage, searching } = useContext(AppContext);
  useEffect(() => {
    setPage(route);
  }, [setPage, route]);

  if (array.length > 0 && arrayCategories.length > 0) {
    const auxCategories = [...arrayCategories];
    const firstCategories = auxCategories.filter(
      (_category, index) => index <= FOUR,
    );
    const auxArray = [...array];
    const firstArray = auxArray.filter((_recipe, index) => index <= ELEVEN);
    return (
      <div>
        <Header searchRender titlePage={ route } />
        {searching ? (
          <SearchBar option={ route } />
        ) : (
          <CategoriesFilterBar categories={ firstCategories } />
        )}
        <RecipesLibrary recipes={ firstArray } />
        <Footer />
      </div>
    );
  }
  return <h3>Buscando receitas</h3>;
}

RecipesMenu.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object).isRequired,
  arrayCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  route: PropTypes.string.isRequired,
};
